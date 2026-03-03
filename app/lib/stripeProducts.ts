export type CheckoutProductKey =
  | "sentinel"
  | "operator-kit"
  | "agent911"
  | "sphinxgate"
  | "driftguard"
  | "transmission"
  | "watchdog"
  | "lazarus"
  | "findmyagent";

export type StripeProductConfig = {
  productKey: CheckoutProductKey;
  displayName: string;
  priceEnvKey:
    | "SENTINEL_PRICE_ID"
    | "OPERATOR_KIT_PRICE_ID"
    | "AGENT911_PRICE_ID"
    | "SPHINXGATE_PRICE_ID"
    | "DRIFTGUARD_PRICE_ID"
    | "TRANSMISSION_PRICE_ID"
    | "WATCHDOG_PRICE_ID"
    | "LAZARUS_PRICE_ID"
    | "FINDMYAGENT_PRICE_ID";
};

export const SUPPORT_EMAIL = "support@acmeagentsupply.co";

export const STRIPE_PRODUCTS: Record<CheckoutProductKey, StripeProductConfig> = {
  sentinel: {
    productKey: "sentinel",
    displayName: "Sentinel",
    priceEnvKey: "SENTINEL_PRICE_ID",
  },
  "operator-kit": {
    productKey: "operator-kit",
    displayName: "Operator Kit",
    priceEnvKey: "OPERATOR_KIT_PRICE_ID",
  },
  agent911: {
    productKey: "agent911",
    displayName: "Agent911",
    priceEnvKey: "AGENT911_PRICE_ID",
  },
  sphinxgate: {
    productKey: "sphinxgate",
    displayName: "SphinxGate",
    priceEnvKey: "SPHINXGATE_PRICE_ID",
  },
  driftguard: {
    productKey: "driftguard",
    displayName: "DriftGuard",
    priceEnvKey: "DRIFTGUARD_PRICE_ID",
  },
  transmission: {
    productKey: "transmission",
    displayName: "Transmission",
    priceEnvKey: "TRANSMISSION_PRICE_ID",
  },
  watchdog: {
    productKey: "watchdog",
    displayName: "Watchdog",
    priceEnvKey: "WATCHDOG_PRICE_ID",
  },
  lazarus: {
    productKey: "lazarus",
    displayName: "Lazarus",
    priceEnvKey: "LAZARUS_PRICE_ID",
  },
  findmyagent: {
    productKey: "findmyagent",
    displayName: "FindMyAgent",
    priceEnvKey: "FINDMYAGENT_PRICE_ID",
  },
};

export function isCheckoutProductKey(
  value: unknown
): value is CheckoutProductKey {
  return typeof value === "string" && value in STRIPE_PRODUCTS;
}

export function getCheckoutProduct(productKey: CheckoutProductKey) {
  return STRIPE_PRODUCTS[productKey];
}

export function getCheckoutPriceId(productKey: CheckoutProductKey) {
  const product = getCheckoutProduct(productKey);
  return process.env[product.priceEnvKey];
}

export function getSuccessHref(productKey: string | null) {
  switch (productKey) {
    case "sentinel":
      return "/docs/sentinel/overview";
    default:
      return "/docs/quickstart/5-minute";
  }
}
