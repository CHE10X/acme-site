import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type FulfillmentStatus =
  | "received"
  | "queued"
  | "completed"
  | "pending"
  | "failed";

export type FulfillmentType = "instant_download" | "private_access" | "manual";

export type FulfillmentOrderRecord = {
  order_id: string;
  stripe_event_id: string;
  stripe_session_id: string;
  stripe_product_id: string;
  stripe_payment_id: string | null;
  stripe_customer_id: string | null;
  customer_email: string | null;
  product_sku: string;
  product_name: string;
  purchase_timestamp: string;
  fulfillment_version: "v1";
  fulfillment_status: FulfillmentStatus;
  fulfillment_type: FulfillmentType;
  support_tier: string | null;
  install_token: string;
  delivery_timestamp: string | null;
  failure_reason: string | null;
  payment_status: string | null;
  created_at: string;
  updated_at: string;
};

const DEFAULT_ORDER_PATH = path.resolve(
  process.env.ACME_FULFILLMENT_ORDERS_PATH ??
    "/Users/AGENT/.openclaw/workspace/acme-site/.data/acme_fulfillment_orders.ndjson"
);

function getOrderStorePath() {
  return DEFAULT_ORDER_PATH;
}

async function ensureStoreDir() {
  await mkdir(path.dirname(getOrderStorePath()), { recursive: true });
}

async function readOrderStore(): Promise<FulfillmentOrderRecord[]> {
  try {
    const raw = await readFile(getOrderStorePath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          const parsed = JSON.parse(line) as Partial<FulfillmentOrderRecord>;
          return parsed as FulfillmentOrderRecord;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is FulfillmentOrderRecord => Boolean(entry))
      .filter((entry): entry is FulfillmentOrderRecord => Boolean(entry?.stripe_session_id));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function appendOrderRecord(record: FulfillmentOrderRecord) {
  await ensureStoreDir();
  await appendFile(
    getOrderStorePath(),
    `${JSON.stringify(record)}\n`,
    "utf8"
  );
}

export async function getLatestOrderBySessionId(sessionId: string) {
  const records = await readOrderStore();
  for (let i = records.length - 1; i >= 0; i -= 1) {
    if (records[i]?.stripe_session_id === sessionId) {
      return records[i];
    }
  }

  return null;
}

export async function getLatestOrderByEventId(eventId: string) {
  const records = await readOrderStore();
  for (let i = records.length - 1; i >= 0; i -= 1) {
    if (records[i]?.stripe_event_id === eventId) {
      return records[i];
    }
  }
  return null;
}

export function buildOrderRecordSeed(input: {
  orderId: string;
  eventId: string;
  stripeSessionId: string;
  stripeProductId: string;
  stripePaymentId: string | null;
  stripeCustomerId: string | null;
  customerEmail: string | null;
  productSku: string;
  productName: string;
  fulfillmentType: FulfillmentType;
  supportTier: string | null;
  installToken: string;
  purchaseTimestamp: string;
  paymentStatus: string | null;
}): FulfillmentOrderRecord {
  const now = new Date().toISOString();
  return {
    order_id: input.orderId,
    stripe_event_id: input.eventId,
    stripe_session_id: input.stripeSessionId,
    stripe_product_id: input.stripeProductId,
    stripe_payment_id: input.stripePaymentId,
    stripe_customer_id: input.stripeCustomerId,
    customer_email: input.customerEmail,
    product_sku: input.productSku,
    product_name: input.productName,
    purchase_timestamp: input.purchaseTimestamp,
    fulfillment_version: "v1",
    fulfillment_status: "received",
    fulfillment_type: input.fulfillmentType,
    support_tier: input.supportTier,
    install_token: input.installToken,
    delivery_timestamp: null,
    failure_reason: null,
    payment_status: input.paymentStatus,
    created_at: now,
    updated_at: now,
  };
}

export function transitionOrderStatus(
  current: FulfillmentOrderRecord,
  status: FulfillmentStatus,
  failureReason: string | null,
  deliveryTimestamp: string | null = null
): FulfillmentOrderRecord {
  return {
    ...current,
    fulfillment_status: status,
    failure_reason: failureReason,
    delivery_timestamp: deliveryTimestamp,
    updated_at: new Date().toISOString(),
  };
}

export function getStorePathDebug() {
  return getOrderStorePath();
}
