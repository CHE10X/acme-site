import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  getEntitlementsForPriceIds,
  getTierForPriceIds,
  type EntitlementKey,
  type SubscriptionTier,
} from "./stripeProducts";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled";

export type EntitlementRecord = {
  user_id: string | null;
  customer_email: string | null;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  status: SubscriptionStatus;
  entitlements_json: string;
  current_period_end: string | null;
  updated_at: string;
  tier: SubscriptionTier | null;
};

type CheckoutLinkRecord = {
  checkout_session_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  customer_email: string | null;
  updated_at: string;
};

type EntitlementStoreShape = {
  records: EntitlementRecord[];
  processedEventIds: string[];
  checkoutSessions: CheckoutLinkRecord[];
};

const DEFAULT_STORE: EntitlementStoreShape = {
  records: [],
  processedEventIds: [],
  checkoutSessions: [],
};

function getStorePath() {
  return process.env.ENTITLEMENTS_STORE_PATH
    ? path.resolve(process.env.ENTITLEMENTS_STORE_PATH)
    : path.join(process.cwd(), ".data", "stripe-entitlements.json");
}

async function ensureStoreDir() {
  await mkdir(path.dirname(getStorePath()), { recursive: true });
}

async function readStore(): Promise<EntitlementStoreShape> {
  try {
    const raw = await readFile(getStorePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<EntitlementStoreShape>;
    return {
      records: Array.isArray(parsed.records) ? parsed.records : [],
      processedEventIds: Array.isArray(parsed.processedEventIds)
        ? parsed.processedEventIds
        : [],
      checkoutSessions: Array.isArray(parsed.checkoutSessions)
        ? parsed.checkoutSessions
        : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return DEFAULT_STORE;
    }
    throw error;
  }
}

async function writeStore(store: EntitlementStoreShape) {
  await ensureStoreDir();
  await writeFile(getStorePath(), JSON.stringify(store, null, 2));
}

function getExistingRecordIndex(
  records: EntitlementRecord[],
  params: {
    stripeSubscriptionId?: string | null;
    stripeCustomerId?: string | null;
    customerEmail?: string | null;
  }
) {
  if (params.stripeSubscriptionId) {
    const bySubscription = records.findIndex(
      (record) => record.stripe_subscription_id === params.stripeSubscriptionId
    );
    if (bySubscription >= 0) {
      return bySubscription;
    }
  }

  if (params.stripeCustomerId) {
    const byCustomer = records.findIndex(
      (record) => record.stripe_customer_id === params.stripeCustomerId
    );
    if (byCustomer >= 0) {
      return byCustomer;
    }
  }

  if (params.customerEmail) {
    return records.findIndex(
      (record) => record.customer_email?.toLowerCase() === params.customerEmail?.toLowerCase()
    );
  }

  return -1;
}

function normalizeTimestamp(unixSeconds?: number | null) {
  return unixSeconds ? new Date(unixSeconds * 1000).toISOString() : null;
}

export async function recordCheckoutSession(params: {
  checkoutSessionId: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  customerEmail?: string | null;
}) {
  const store = await readStore();
  const now = new Date().toISOString();
  const sessionIndex = store.checkoutSessions.findIndex(
    (entry) => entry.checkout_session_id === params.checkoutSessionId
  );

  const nextRecord: CheckoutLinkRecord = {
    checkout_session_id: params.checkoutSessionId,
    stripe_customer_id: params.stripeCustomerId ?? null,
    stripe_subscription_id: params.stripeSubscriptionId ?? null,
    customer_email: params.customerEmail ?? null,
    updated_at: now,
  };

  if (sessionIndex >= 0) {
    store.checkoutSessions[sessionIndex] = nextRecord;
  } else {
    store.checkoutSessions.push(nextRecord);
  }

  await writeStore(store);
}

export async function upsertSubscriptionRecord(params: {
  stripeCustomerId: string;
  stripeSubscriptionId?: string | null;
  stripePriceIds: string[];
  status: SubscriptionStatus;
  currentPeriodEnd?: number | null;
  customerEmail?: string | null;
}) {
  const store = await readStore();
  const now = new Date().toISOString();
  const stripePriceId = params.stripePriceIds[0] ?? null;
  const entitlements = getEntitlementsForPriceIds(params.stripePriceIds);
  const tier = getTierForPriceIds(params.stripePriceIds);
  const recordIndex = getExistingRecordIndex(store.records, {
    stripeSubscriptionId: params.stripeSubscriptionId,
    stripeCustomerId: params.stripeCustomerId,
    customerEmail: params.customerEmail,
  });

  const nextRecord: EntitlementRecord = {
    user_id: null,
    customer_email: params.customerEmail ?? (recordIndex >= 0 ? store.records[recordIndex].customer_email : null),
    stripe_customer_id: params.stripeCustomerId,
    stripe_subscription_id: params.stripeSubscriptionId ?? null,
    stripe_price_id: stripePriceId,
    status: params.status,
    entitlements_json: JSON.stringify(entitlements),
    current_period_end: normalizeTimestamp(params.currentPeriodEnd),
    updated_at: now,
    tier,
  };

  if (recordIndex >= 0) {
    store.records[recordIndex] = {
      ...store.records[recordIndex],
      ...nextRecord,
    };
  } else {
    store.records.push(nextRecord);
  }

  await writeStore(store);
  return nextRecord;
}

export async function markSubscriptionPastDue(params: {
  stripeSubscriptionId?: string | null;
  stripeCustomerId?: string | null;
}) {
  const store = await readStore();
  const recordIndex = getExistingRecordIndex(store.records, {
    stripeSubscriptionId: params.stripeSubscriptionId,
    stripeCustomerId: params.stripeCustomerId,
  });

  if (recordIndex < 0) {
    return null;
  }

  store.records[recordIndex] = {
    ...store.records[recordIndex],
    status: "past_due",
    updated_at: new Date().toISOString(),
  };
  await writeStore(store);
  return store.records[recordIndex];
}

export async function getEntitlementByEmail(email: string) {
  const store = await readStore();
  return (
    store.records.find(
      (record) => record.customer_email?.toLowerCase() === email.toLowerCase()
    ) ?? null
  );
}

export async function getEntitlementByCustomerId(customerId: string) {
  const store = await readStore();
  return (
    store.records.find(
      (record) => record.stripe_customer_id === customerId
    ) ?? null
  );
}

export async function markEventProcessed(eventId: string) {
  const store = await readStore();
  if (!store.processedEventIds.includes(eventId)) {
    store.processedEventIds.push(eventId);
    await writeStore(store);
  }
}

export async function hasProcessedEvent(eventId: string) {
  const store = await readStore();
  return store.processedEventIds.includes(eventId);
}

export function parseEntitlements(entitlementsJson: string): EntitlementKey[] {
  try {
    const parsed = JSON.parse(entitlementsJson) as unknown;
    return Array.isArray(parsed) ? (parsed as EntitlementKey[]) : [];
  } catch {
    return [];
  }
}
