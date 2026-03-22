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
  // -------------------------------------------------------------------------
  // LIVE MODE product IDs (created 2026-03-22 via create_live_products.py)
  // -------------------------------------------------------------------------
  prod_UCBVIRy2OziiiV: {
    sku: "radcheck",
    name: "RadCheck",
    fulfillment: "deliver_radcheck",
  },
  prod_UCBVKBPaII9cPK: {
    sku: "sentinel",
    name: "Sentinel",
    fulfillment: "deliver_sentinel",
  },
  prod_UCBVDpWZ7La0hh: {
    sku: "sphinxgate",
    name: "SphinxGate",
    fulfillment: "deliver_sphinxgate",
  },
  prod_UCBVdk6jyGIiT9: {
    sku: "operator_bundle",
    name: "Operator Bundle",
    fulfillment: "deliver_operator_bundle",
  },
  prod_UCBV3xb9ySJr2Z: {
    sku: "transmission",
    name: "Transmission",
    fulfillment: "deliver_transmission",
  },
  prod_UCBVzGGs3kxS5J: {
    sku: "agent911",
    name: "Agent911",
    fulfillment: "deliver_agent911",
  },
  // -------------------------------------------------------------------------
  // TEST MODE product IDs (sandbox only — kept for reference, not active in live)
  // prod_U56o242tOR07Rh — radcheck (test)
  // prod_U56iC7N5IX0Dn1 — sentinel (test)
  // prod_U56j9B8PvmTAT7 — sphinxgate (test)
  // prod_U56ukpVLBM5p89 — operator_bundle (test)
  // prod_U56w3PAVw4bT6Y — transmission (test)
  // prod_U56lL9ZkNuz22d — agent911 (test)
  // -------------------------------------------------------------------------
  // RETIRED SKUs (test mode, never in live):
  // prod_U56nqUJd9LlJqQ — InfraWatch standalone — retired 2026-03-18, bundled
  // prod_U58SANlEPHonBS — Watchdog standalone — retired 2026-03-18, bundled
  // prod_U56pnIIsyz4nxl — Lazarus standalone — retired 2026-03-18, included with Agent911
  // prod_U56qHeY8Q5fKAy — FindMyAgent — deprecated 2026-03-18, folded into recall watch
  // -------------------------------------------------------------------------
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
