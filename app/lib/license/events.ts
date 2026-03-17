import {
  generateLicense,
  resolveIssuedReason,
  inferPlanFromInvoice,
} from "./generator"
import type { LicenseRecord, LicenseStatus } from "./store"
import { upsertLicenseRecord, getLicenseBySubscriptionId } from "./store"
import { deliverLicense } from "./delivery"
import { sendLicenseAlert } from "./alerts"
import { inferPlanFromSubscription, getPlanRank, type Plan } from "./plans"
import { toStringOrNull, toNumberOrNull, toRecord } from "../stripe/normalize"

/**
 * License event handlers.
 * Handles: invoice.paid, customer.subscription.deleted, customer.subscription.updated
 *
 * Arch/Ops rule: delivery failure MUST NOT affect entitlement state.
 */

export type EventHandlerResult = {
  status: "handled" | "ignored" | "failed"
  licenseId?: string
  reason?: string
}

function getGraceMs(): number {
  const days = parseInt(process.env.LICENSE_GRACE_DAYS ?? "7", 10)
  return days * 24 * 60 * 60 * 1000
}

// ---------------------------------------------------------------------------
// invoice.paid
// ---------------------------------------------------------------------------

export async function handleInvoicePaid(
  event: { id: string },
  invoiceObject: Record<string, unknown>
): Promise<EventHandlerResult> {
  const subscriptionId = toStringOrNull(invoiceObject.subscription)
  if (!subscriptionId) {
    return { status: "ignored", reason: "no subscription on invoice" }
  }

  const customerId = toStringOrNull(invoiceObject.customer)
  const customerEmail =
    toStringOrNull(invoiceObject.customer_email) ??
    toStringOrNull(
      (toRecord(invoiceObject.customer_details) as { email?: unknown } | null)
        ?.email
    ) ??
    null

  if (!customerEmail) {
    return { status: "ignored", reason: "no customer_email on invoice" }
  }

  // Billing period from invoice line items
  const lines = invoiceObject.lines as
    | { data?: Array<{ period?: { start?: number; end?: number } }> }
    | undefined
  const firstLine = lines?.data?.[0]
  const periodStart =
    toNumberOrNull(firstLine?.period?.start) ?? Math.floor(Date.now() / 1000)
  const periodEnd = toNumberOrNull(firstLine?.period?.end)

  const validFrom = new Date(periodStart * 1000)
  const baseValidUntil = periodEnd
    ? new Date(periodEnd * 1000)
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  // Plan inference — check invoice metadata, fall back to subscription
  const subscriptionObj = toRecord(invoiceObject.subscription_details) ?? {}
  const plan: Plan = inferPlanFromInvoice(invoiceObject, subscriptionObj)

  // Existing record?
  const existing = await getLicenseBySubscriptionId(subscriptionId)
  const issuedReason = resolveIssuedReason(plan, existing)

  // Generate signed license + entitlement record
  const { record, file } = generateLicense({
    licenseId: existing?.license_id ?? null,
    customerEmail,
    customerName: null,
    stripeCustomerId: customerId ?? "",
    subscriptionId,
    plan,
    validFrom,
    periodEnd: baseValidUntil,
    issuedReason,
    stripeEventId: event.id,
  })

  await upsertLicenseRecord(record)

  // Deliver — failure is non-fatal
  let deliverySentAt: string | null = null
  const delivery = await deliverLicense(customerEmail, file, plan)
  if (delivery.success) {
    deliverySentAt = new Date().toISOString()
  } else {
    console.warn("[license/events] invoice.paid delivery failed:", delivery.error)
  }

  if (deliverySentAt) {
    const withDelivery: LicenseRecord = { ...record, delivery_sent_at: deliverySentAt }
    await upsertLicenseRecord(withDelivery)
  }

  await sendLicenseAlertSafe({
    customer_email: customerEmail,
    plan,
    license_id: record.license_id,
    subscription_id: subscriptionId,
    entitlement_status: "active",
    event_id: event.id,
    timestamp: new Date().toISOString(),
  })

  return { status: "handled", licenseId: record.license_id }
}

// ---------------------------------------------------------------------------
// customer.subscription.deleted
// ---------------------------------------------------------------------------

export async function handleSubscriptionDeleted(
  event: { id: string },
  subscriptionObject: Record<string, unknown>
): Promise<EventHandlerResult> {
  const subscriptionId = toStringOrNull(subscriptionObject.id)
  if (!subscriptionId) {
    return { status: "ignored", reason: "no subscription_id" }
  }

  const existing = await getLicenseBySubscriptionId(subscriptionId)
  if (!existing) {
    return { status: "ignored", reason: "no existing license record" }
  }

  const canceledAt = toNumberOrNull(subscriptionObject.canceled_at)
  const isInGrace = canceledAt
    ? Date.now() - canceledAt * 1000 < getGraceMs()
    : false

  const newStatus: LicenseStatus = isInGrace ? "grace" : "expired"
  const updatedRecord: LicenseRecord = {
    ...existing,
    entitlement_status: newStatus,
    last_stripe_event_id: event.id,
  }
  await upsertLicenseRecord(updatedRecord)

  await sendLicenseAlertSafe({
    customer_email: existing.customer_email,
    plan: existing.plan,
    license_id: existing.license_id,
    subscription_id: subscriptionId,
    entitlement_status: newStatus,
    event_id: event.id,
    timestamp: new Date().toISOString(),
  })

  return { status: "handled", licenseId: existing.license_id }
}

// ---------------------------------------------------------------------------
// customer.subscription.updated
// ---------------------------------------------------------------------------

export async function handleSubscriptionUpdated(
  event: { id: string },
  subscriptionObject: Record<string, unknown>
): Promise<EventHandlerResult> {
  const subscriptionId = toStringOrNull(subscriptionObject.id)
  if (!subscriptionId) {
    return { status: "ignored", reason: "no subscription_id" }
  }

  // Only process active/trialing subscriptions
  const status = toStringOrNull(subscriptionObject.status)
  if (status && !["active", "trialing"].includes(status)) {
    return { status: "ignored", reason: `status "${status}" not entitlement-relevant` }
  }

  const currentPeriodEnd = toNumberOrNull(subscriptionObject.current_period_end)
  if (!currentPeriodEnd) {
    return { status: "ignored", reason: "no current_period_end" }
  }

  const existing = await getLicenseBySubscriptionId(subscriptionId)
  if (!existing) {
    return { status: "ignored", reason: "no existing license for subscription" }
  }

  const newPlan: Plan = inferPlanFromSubscription(subscriptionObject)
  const oldRank = getPlanRank(existing.plan)
  const newRank = getPlanRank(newPlan)
  const issuedReason = resolveIssuedReason(newPlan, existing)
  const planChanged = newRank !== oldRank

  const newValidUntil = new Date(currentPeriodEnd * 1000 + getGraceMs())
  const updatedRecord: LicenseRecord = {
    ...existing,
    plan: newPlan,
    valid_until: newValidUntil.toISOString(),
    entitlement_status: "active",
    last_stripe_event_id: event.id,
    issued_reason: issuedReason,
  }
  await upsertLicenseRecord(updatedRecord)

  // Re-issue and deliver signed license if plan changed
  if (planChanged) {
    try {
      const { file } = generateLicense({
        licenseId: existing.license_id,
        customerEmail: existing.customer_email,
        customerName: existing.customer_name,
        stripeCustomerId: existing.stripe_customer_id,
        subscriptionId,
        plan: newPlan,
        validFrom: new Date(updatedRecord.valid_from),
        periodEnd: new Date(currentPeriodEnd * 1000),
        issuedReason,
        stripeEventId: event.id,
      })
      const delivery = await deliverLicense(existing.customer_email, file, newPlan)
      if (delivery.success) {
        const withDelivery: LicenseRecord = {
          ...updatedRecord,
          delivery_sent_at: new Date().toISOString(),
        }
        await upsertLicenseRecord(withDelivery)
      }
    } catch (err) {
      console.warn(
        "[license/events] subscription.updated re-issue error:",
        err instanceof Error ? err.message : err
      )
    }
  }

  await sendLicenseAlertSafe({
    customer_email: existing.customer_email,
    plan: newPlan,
    license_id: existing.license_id,
    subscription_id: subscriptionId,
    entitlement_status: "active",
    event_id: event.id,
    timestamp: new Date().toISOString(),
  })

  return { status: "handled", licenseId: existing.license_id }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function sendLicenseAlertSafe(
  payload: Parameters<typeof sendLicenseAlert>[0]
): Promise<void> {
  try {
    await sendLicenseAlert(payload)
  } catch {
    // alerts are non-fatal
  }
}
