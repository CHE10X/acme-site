import { NextResponse } from "next/server";
import { verifyStripeSignature } from "../../../lib/stripe/verify";
import {
  toStringOrNull,
  toNumberOrNull,
  toRecord,
  getPriceIdsFromSubscription,
} from "../../../lib/stripe/normalize";
import {
  hasProcessedEvent,
  markEventProcessed,
  markSubscriptionPastDue,
  recordCheckoutSession,
  upsertSubscriptionRecord,
} from "../../../lib/entitlementsStore";
import {
  appendOrderRecord,
  buildOrderRecordSeed,
  getStorePathDebug,
  getLatestOrderByEventId,
  getLatestOrderBySessionId,
  transitionOrderStatus,
  type FulfillmentOrderRecord,
} from "../../../lib/fulfillment/fulfillmentStore";
import {
  decideFulfillmentFromSession,
  runFulfillment,
} from "../../../lib/fulfillment/fulfillmentDispatcher";
import { generateInstallToken } from "../../../lib/fulfillment/installTokens";
import { writeOperatorLog } from "../../../lib/fulfillment/operatorLog";
import { sendInternalAlert } from "../../../lib/fulfillment/fulfillmentNotifier";

export const dynamic = "force-dynamic";

type StripeEventEnvelope = {
  id: string;
  type: string;
  data?: {
    object?: Record<string, unknown>;
  };
};

type CheckoutObject = {
  id?: unknown;
  customer?: unknown;
  payment_intent?: unknown;
  payment_status?: unknown;
  customer_email?: unknown;
  customer_details?: {
    email?: unknown;
  };
  metadata?: Record<string, unknown> | null;
  created?: unknown;
  line_items?: {
    data?: unknown[] | null;
    [key: string]: unknown;
  } | null;
};

type CheckoutLineItem = {
  priceId: string; // always non-null — null priceIds are filtered out during extraction
  productId: string | null;
  name: string | null;
  quantity: number;
};

type FulfillmentProcessResult = {
  status: "fulfilled" | "queued" | "failed" | "duplicate" | "ignored";
  duplicate?: boolean;
  ignored?: boolean;
};

// verifyStripeSignature, toStringOrNull, toNumberOrNull, toRecord, getPriceIdsFromSubscription
// are now imported from shared lib/stripe/* utilities above.

function getLineItemsFromSession(session: CheckoutObject): CheckoutLineItem[] {
  const lineItemsObj = toRecord(session.line_items);
  const rawLineItems = Array.isArray(lineItemsObj?.data) ? lineItemsObj.data : [];

  return rawLineItems
    .map((entry) => {
      const record = toRecord(entry);
      if (!record) {
        return null;
      }
      const priceObj = toRecord(record.price);
      const priceId = toStringOrNull(priceObj?.id) ?? toStringOrNull(record.price);
      const productRecord = toRecord(priceObj?.product);
      const productId =
        toStringOrNull(productRecord?.id) ??
        toStringOrNull(record.product_id) ??
        toStringOrNull(productRecord?.product) ??
        toStringOrNull(record.product) ??
        null;
      const description = toStringOrNull(record.description);
      const productName = toStringOrNull(productRecord?.name);
      const rawQuantity = typeof record.quantity === "number" ? record.quantity : null;

      if (!priceId) {
        return null;
      }
      return {
        priceId: priceId as string,
        productId,
        name: description || productName || null,
        quantity: rawQuantity ?? 1,
      };
    })
    .filter((lineItem): lineItem is CheckoutLineItem => lineItem !== null);
}

async function fetchCheckoutSessionById(sessionId: string, stripeSecret: string) {
  const encodedSessionId = encodeURIComponent(sessionId);
  const url = `https://api.stripe.com/v1/checkout/sessions/${encodedSessionId}?expand[]=line_items.data.price.product`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${stripeSecret}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json().catch(() => null)) as
    | CheckoutObject
    | { error?: string }
    | null;
  if (!payload || ("error" in payload && payload.error)) {
    return null;
  }
  return payload as CheckoutObject;
}

async function processCheckoutCompleted(
  event: { id: string },
  eventSession: CheckoutObject
): Promise<FulfillmentProcessResult> {
  const sessionId = toStringOrNull(eventSession.id);
  if (!sessionId) {
    return { status: "ignored", ignored: true };
  }

  const existingSessionOrder = await getLatestOrderBySessionId(sessionId);
  const existingEventOrder = await getLatestOrderByEventId(event.id);
  const duplicateCandidateOrder = existingSessionOrder ?? existingEventOrder;

  if (existingSessionOrder?.fulfillment_status === "completed") {
    if (duplicateCandidateOrder) {
      await writeOperatorLog(duplicateCandidateOrder, "duplicate");
    }
    return { status: "duplicate", duplicate: true, ignored: true };
  }

  if (
    existingSessionOrder?.fulfillment_status === "queued" ||
    existingSessionOrder?.fulfillment_status === "received"
  ) {
    if (duplicateCandidateOrder) {
      await writeOperatorLog(duplicateCandidateOrder, "duplicate");
    }
    return { status: "queued", duplicate: true, ignored: true };
  }

  if (
    existingEventOrder?.fulfillment_status === "completed" ||
    existingEventOrder?.fulfillment_status === "queued"
  ) {
    if (duplicateCandidateOrder) {
      await writeOperatorLog(duplicateCandidateOrder, "duplicate");
    }
    return { status: "duplicate", duplicate: true, ignored: true };
  }

  const canHydrateFromStripe = !!process.env.STRIPE_SECRET_KEY;
  let lineItems = getLineItemsFromSession(eventSession);
  if (lineItems.length === 0 && canHydrateFromStripe) {
    const sessionFromApi = await fetchCheckoutSessionById(sessionId, process.env.STRIPE_SECRET_KEY as string);
    if (sessionFromApi) {
      lineItems = getLineItemsFromSession(sessionFromApi);
      if (!eventSession.created && sessionFromApi.created) {
        eventSession.created = sessionFromApi.created;
      }
      if (!eventSession.payment_status && sessionFromApi.payment_status) {
        eventSession.payment_status = sessionFromApi.payment_status;
      }
      if (!toStringOrNull(eventSession.payment_intent)) {
        eventSession.payment_intent = sessionFromApi.payment_intent;
      }
    }
  }

  const firstLineItem = lineItems[0];
  const metadata = toRecord(eventSession.metadata);
  const metadataProductKey =
    toStringOrNull(metadata?.productId) ??
    toStringOrNull(metadata?.product_id) ??
    toStringOrNull(metadata?.sku) ??
    toStringOrNull(metadata?.productKey);
  const supportTier =
    toStringOrNull(metadata?.support_tier) ??
    toStringOrNull(metadata?.supportTier) ??
    toStringOrNull(metadata?.tier);

  const sessionDecision = decideFulfillmentFromSession({
    productId: firstLineItem?.productId,
    productFallbackId: metadataProductKey,
    supportTier,
  });

  const installToken = generateInstallToken();
  const productId =
    firstLineItem?.productId || metadataProductKey || sessionDecision.catalog.stripeProductId || "unknown";

  const paymentCreatedAt = toNumberOrNull(eventSession.created) ?? Math.floor(Date.now() / 1000);
  const customerId = toStringOrNull(eventSession.customer);
  const paymentIntentId = toStringOrNull(eventSession.payment_intent);
  const paymentStatus = toStringOrNull(eventSession.payment_status);
  const customerEmail =
    toStringOrNull(eventSession.customer_email) ??
    toStringOrNull((toRecord(eventSession.customer_details) as { email?: unknown } | null)?.email);
  const orderId = existingSessionOrder?.order_id ?? existingEventOrder?.order_id ?? crypto.randomUUID();

  let order: FulfillmentOrderRecord = buildOrderRecordSeed({
    orderId,
    eventId: event.id,
    stripeSessionId: sessionId,
    stripeProductId: productId,
    stripePaymentId: paymentIntentId,
    stripeCustomerId: customerId,
    customerEmail,
    productSku: sessionDecision.catalog.sku,
    productName: sessionDecision.catalog.name,
    installToken,
    fulfillmentType: sessionDecision.fulfillmentType,
    supportTier,
    purchaseTimestamp: new Date(paymentCreatedAt * 1000).toISOString(),
    paymentStatus: paymentStatus,
  });

  order = {
    ...order,
    fulfillment_status: "queued",
  };
  await appendOrderRecord(order);

  try {
    await runFulfillment(sessionDecision.fulfillmentAction, order);
  } catch (error) {
    const failureReason = error instanceof Error ? error.message : "fulfillment failed";
    order = transitionOrderStatus(
      order,
      "failed",
      `fulfillment failed: ${failureReason}`
    );
    await appendOrderRecord(order);
    await sendInternalAlert({
      eventId: event.id,
      sessionId,
      orderId,
      customerEmail,
      product: sessionDecision.catalog.name,
      timestamp: new Date().toISOString(),
      result: "failed",
      failureReason: order.failure_reason,
    });
    return { status: "failed" };
  }

  order = transitionOrderStatus(order, "completed", null, new Date().toISOString());
  await appendOrderRecord(order);
  await recordCheckoutSession({
    checkoutSessionId: sessionId,
    stripeCustomerId: customerId,
    stripeSubscriptionId: null,
    customerEmail,
  });

  try {
    await sendInternalAlert({
      eventId: event.id,
      sessionId,
      orderId,
      customerEmail,
      product: sessionDecision.catalog.name,
      timestamp: new Date().toISOString(),
      result: "completed",
      failureReason: null,
    });
  } catch {
    // alert dispatch is intentionally non-fatal
  }

  return { status: "fulfilled" };
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

  const debugOrderLogPath =
    request.headers.get("x-acme-debug-order-log") === "1" ||
    new URL(request.url).searchParams.get("debug-order-log") === "1";

  if (debugOrderLogPath) {
    return NextResponse.json({
      eventType: event.type,
      eventId: event.id,
      orderLogPath: getStorePathDebug(),
      resolved: true,
    });
  }

  const object = event.data?.object ?? {};

  if (
    event.type === "checkout.session.completed" &&
    await hasProcessedEvent(event.id)
  ) {
    const sessionId = toStringOrNull((object as CheckoutObject).id);
    const duplicateSessionOrder = sessionId
      ? await getLatestOrderBySessionId(sessionId)
      : null;
    const duplicateEventOrder = await getLatestOrderByEventId(event.id);
    const duplicateOrder = duplicateSessionOrder ?? duplicateEventOrder;

    if (duplicateOrder) {
      await writeOperatorLog(duplicateOrder, "duplicate");
    }

    return NextResponse.json({ received: true, duplicate: true });
  }

  if (await hasProcessedEvent(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const result = await processCheckoutCompleted(event, object as CheckoutObject);
        if (!result.ignored) {
          await markEventProcessed(event.id);
        }
        return NextResponse.json({ ...result, eventType: event.type });
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = object as Record<string, unknown>;
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
            typeof (subscription as { customer_email?: unknown }).customer_email ===
            "string"
              ? (subscription as { customer_email?: string }).customer_email ?? null
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
  } catch {
    return NextResponse.json({ error: "Failed to process Stripe webhook." }, { status: 500 });
  }

  await markEventProcessed(event.id);
  return NextResponse.json({ received: true, eventType: event.type });
}
