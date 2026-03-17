import { NextResponse } from "next/server"
import { verifyStripeSignature } from "../../../lib/stripe/verify"
import { toRecord, toStringOrNull } from "../../../lib/stripe/normalize"
import {
  hasProcessedLicenseEvent,
  markLicenseEventProcessed,
} from "../../../lib/stripe/idempotency"
import {
  handleInvoicePaid,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
} from "../../../lib/license/events"

export const dynamic = "force-dynamic"

type StripeEventEnvelope = {
  id: string
  type: string
  data?: {
    object?: Record<string, unknown>
    previous_attributes?: Record<string, unknown>
  }
}

export async function POST(request: Request): Promise<Response> {
  // Prefer the license-specific secret; fall back to the shared webhook secret
  const webhookSecret =
    process.env.STRIPE_LICENSE_WEBHOOK_SECRET ?? process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured." },
      { status: 503 }
    )
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 })
  }

  const body = await request.text()

  if (!verifyStripeSignature(body, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 })
  }

  let event: StripeEventEnvelope
  try {
    event = JSON.parse(body) as StripeEventEnvelope
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  if (!event.id || !event.type) {
    return NextResponse.json({ error: "Invalid Stripe event payload." }, { status: 400 })
  }

  // Idempotency — keyed on event.id (not subscription_id)
  if (await hasProcessedLicenseEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true, eventType: event.type })
  }

  const object = event.data?.object ?? {}

  // Attach previous_attributes to event for subscription.updated handler
  const enrichedEvent = {
    id: event.id,
    data: {
      previous_attributes: event.data?.previous_attributes ?? {},
    },
  }

  try {
    switch (event.type) {
      case "invoice.paid": {
        const result = await handleInvoicePaid(event, object)

        if (result.status === "failed") {
          // Return 500 so Stripe retries
          console.error(`[license-webhook] invoice.paid failed: ${result.reason ?? "unknown"}`)
          return NextResponse.json(
            { error: result.reason ?? "License processing failed." },
            { status: 500 }
          )
        }

        await markLicenseEventProcessed(event.id, result.status)
        return NextResponse.json({ received: true, status: result.status, eventType: event.type })
      }

      case "customer.subscription.deleted": {
        const result = await handleSubscriptionDeleted(event, object)
        await markLicenseEventProcessed(event.id, result.status)
        return NextResponse.json({ received: true, status: result.status, eventType: event.type })
      }

      case "customer.subscription.updated": {
        const result = await handleSubscriptionUpdated(enrichedEvent as typeof event, object)

        if (result.status === "failed") {
          console.error(
            `[license-webhook] subscription.updated failed: ${result.reason ?? "unknown"}`
          )
          return NextResponse.json(
            { error: result.reason ?? "License processing failed." },
            { status: 500 }
          )
        }

        await markLicenseEventProcessed(event.id, result.status)
        return NextResponse.json({ received: true, status: result.status, eventType: event.type })
      }

      default:
        // Ignore all other events — return 200 so Stripe doesn't retry
        await markLicenseEventProcessed(event.id, "ignored")
        return NextResponse.json({ received: true, status: "ignored", eventType: event.type })
    }
  } catch (err) {
    // Unexpected error — return 500 to allow Stripe retry
    const message = err instanceof Error ? err.message : "Internal server error"
    console.error(`[license-webhook] Unhandled error for ${event.type}:`, message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
