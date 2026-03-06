import crypto from "node:crypto";
import { NextResponse } from "next/server";
import {
  hasProcessedEvent,
  markEventProcessed,
  markSubscriptionPastDue,
  recordCheckoutSession,
  upsertSubscriptionRecord,
} from "../../../lib/entitlementsStore";

export const dynamic = "force-dynamic";

type StripeEventEnvelope = {
  id: string;
  type: string;
  data?: {
    object?: Record<string, unknown>;
  };
};

function verifyStripeSignature(payload: string, signatureHeader: string, secret: string) {
  const pairs = signatureHeader.split(",").map((part) => part.split("=", 2));
  const timestamp = pairs.find(([key]) => key === "t")?.[1];
  const signatures = pairs
    .filter(([key]) => key === "v1")
    .map(([, value]) => value);

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");

  return signatures.some((signature) => {
    const expectedBuffer = Buffer.from(expected, "utf8");
    const providedBuffer = Buffer.from(signature, "utf8");
    return (
      expectedBuffer.length === providedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, providedBuffer)
    );
  });
}

function getPriceIdsFromSubscription(subscription: Record<string, unknown>) {
  const items = subscription.items as
    | { data?: Array<{ price?: { id?: string | null } | null }> }
    | undefined;

  return (
    items?.data
      ?.map((item) => item.price?.id)
      .filter((priceId): priceId is string => Boolean(priceId)) ?? []
  );
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const body = await request.text();
  if (!verifyStripeSignature(body, signature, process.env.STRIPE_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  const event = JSON.parse(body) as StripeEventEnvelope;
  if (!event.id || !event.type) {
    return NextResponse.json({ error: "Invalid Stripe event payload." }, { status: 400 });
  }

  if (await hasProcessedEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const object = event.data?.object ?? {};

  switch (event.type) {
    case "checkout.session.completed": {
      await recordCheckoutSession({
        checkoutSessionId: String(object.id ?? ""),
        stripeCustomerId: typeof object.customer === "string" ? object.customer : null,
        stripeSubscriptionId:
          typeof object.subscription === "string" ? object.subscription : null,
        customerEmail:
          typeof object.customer_email === "string"
            ? object.customer_email
            : typeof (object.customer_details as { email?: string } | undefined)?.email ===
                "string"
              ? (object.customer_details as { email?: string }).email ?? null
              : null,
      });
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = object;
      const customerId =
        typeof subscription.customer === "string" ? subscription.customer : null;
      if (!customerId) {
        break;
      }

      await upsertSubscriptionRecord({
        stripeCustomerId: customerId,
        stripeSubscriptionId:
          typeof subscription.id === "string" ? subscription.id : null,
        stripePriceIds: getPriceIdsFromSubscription(subscription),
        status:
          event.type === "customer.subscription.deleted"
            ? "canceled"
            : (subscription.status as
                | "active"
                | "trialing"
                | "past_due"
                | "canceled"),
        currentPeriodEnd:
          typeof subscription.current_period_end === "number"
            ? subscription.current_period_end
            : null,
        customerEmail:
          typeof subscription.customer_email === "string"
            ? subscription.customer_email
            : null,
      });
      break;
    }
    case "invoice.payment_failed": {
      await markSubscriptionPastDue({
        stripeSubscriptionId:
          typeof object.subscription === "string" ? object.subscription : null,
        stripeCustomerId: typeof object.customer === "string" ? object.customer : null,
      });
      break;
    }
    default:
      break;
  }

  await markEventProcessed(event.id);
  return NextResponse.json({ received: true });
}
