import type { FulfillmentType } from "./fulfillmentStore";

type ProductCatalogEntry = {
  sku: string;
  name: string;
  fulfillment: keyof typeof FULFILLMENT_ACTIONS;
};

const FULFILLMENT_ACTIONS = {
  deliver_radcheck: "deliver_radcheck",
  deliver_sentinel: "deliver_sentinel",
  deliver_sphinxgate: "deliver_sphinxgate",
  deliver_infrawatch: "deliver_infrawatch", // renamed from deliver_driftguard 2026-03-18
  deliver_operator_bundle: "deliver_operator_bundle",
  deliver_watchdog: "deliver_watchdog",
  deliver_transmission: "deliver_transmission",
  deliver_lazarus: "deliver_lazarus",
  // deliver_findmyagent: DEPRECATED 2026-03-18 — folded into Recall watch mode
  deliver_agent911: "deliver_agent911",
  deliver_unknown: "deliver_unknown",
};

export const PRODUCT_CATALOG: Record<string, ProductCatalogEntry> = {
  prod_U56o242tOR07Rh: {
    sku: "radcheck",
    name: "RadCheck",
    fulfillment: "deliver_radcheck",
  },
  prod_U56iC7N5IX0Dn1: {
    sku: "sentinel",
    name: "Sentinel",
    fulfillment: "deliver_sentinel",
  },
  prod_U56j9B8PvmTAT7: {
    sku: "sphinxgate",
    name: "SphinxGate",
    fulfillment: "deliver_sphinxgate",
  },
  // prod_U56nqUJd9LlJqQ — InfraWatch standalone SKU retired 2026-03-18
  // InfraWatch is a bundled component of the Operator Bundle. Not sold standalone.
  // SKU archived in Stripe. Existing subscribers grandfathered into Operator Bundle.
  // prod_U56nqUJd9LlJqQ: { sku: "infrawatch", ... }
  prod_U56ukpVLBM5p89: {
    sku: "operator_bundle",
    name: "Operator Bundle",
    fulfillment: "deliver_operator_bundle",
  },
  // prod_U58SANlEPHonBS — Watchdog RETIRED 2026-03-18
  // Folds into Sentinel / Operator Bundle. Not sold standalone.
  // Stripe SKU archived (active: false).
  prod_U56w3PAVw4bT6Y: {
    sku: "transmission",
    name: "Transmission",
    fulfillment: "deliver_transmission",
  },
  // prod_U56pnIIsyz4nxl — Lazarus standalone RETIRED 2026-03-18
  // Free, included with Agent911. Not sold standalone.
  // Stripe SKU archived (active: false).
  // prod_U56qHeY8Q5fKAy: DEPRECATED 2026-03-18 — FindMyAgent folded into Recall watch mode
  // Stripe SKU retired. Features: live presence, stalled/blocked signals, needs-attention flags
  // now live in recall status --watch. See ACME_MASTER_DEPENDENCY_MAP.md.
  prod_U56lL9ZkNuz22d: {
    sku: "agent911",
    name: "Agent911",
    fulfillment: "deliver_agent911",
  },
};

export type ProductCatalogRecord = (typeof PRODUCT_CATALOG)[string] & {
  stripeProductId: string;
};

export type FulfillmentActionName =
  | (typeof FULFILLMENT_ACTIONS)[keyof typeof FULFILLMENT_ACTIONS]
  | "deliver_unknown";

export function getCatalogProductById(
  productId: string
): ProductCatalogRecord | null {
  const entry = PRODUCT_CATALOG[productId];
  if (!entry) {
    return null;
  }

  return {
    ...entry,
    stripeProductId: productId,
  };
}

export function buildUnknownProductCatalogEntry(productId: string): ProductCatalogRecord {
  return {
    stripeProductId: productId,
    sku: "unknown",
    name: "Unknown Product",
    fulfillment: "deliver_unknown",
  };
}

export function getFallbackFulfillmentTypeByTier(tier?: string | null): FulfillmentType {
  switch (tier) {
    case "console":
    case "advanced":
    case "foundation":
    case "bundle":
    case "standard":
    case "free":
      return "instant_download";
    default:
      return "manual";
  }
}
