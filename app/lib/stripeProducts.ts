export type CheckoutSku =
  | "sentinel"
  | "operator_kit"
  | "agent911"
  | "sphinxgate"
  | "driftguard"
  | "transmission";

export type StripeProductConfig = {
  sku: CheckoutSku;
  displayName: string;
  priceEnvKey:
    | "STRIPE_PRICE_SENTINEL"
    | "STRIPE_PRICE_OPERATOR_KIT"
    | "STRIPE_PRICE_AGENT911"
    | "STRIPE_PRICE_MODULE_GENERIC";
  moduleSku?: "sphinxgate" | "driftguard" | "transmission";
};

export const SUPPORT_EMAIL = "support@acmeagentsupply.co";

export const STRIPE_PRODUCTS: Record<CheckoutSku, StripeProductConfig> = {
  sentinel: {
    sku: "sentinel",
    displayName: "Sentinel",
    priceEnvKey: "STRIPE_PRICE_SENTINEL",
  },
  operator_kit: {
    sku: "operator_kit",
    displayName: "Operator Kit",
    priceEnvKey: "STRIPE_PRICE_OPERATOR_KIT",
  },
  agent911: {
    sku: "agent911",
    displayName: "Agent911",
    priceEnvKey: "STRIPE_PRICE_AGENT911",
  },
  sphinxgate: {
    sku: "sphinxgate",
    displayName: "SphinxGate",
    priceEnvKey: "STRIPE_PRICE_MODULE_GENERIC",
    moduleSku: "sphinxgate",
  },
  driftguard: {
    sku: "driftguard",
    displayName: "DriftGuard",
    priceEnvKey: "STRIPE_PRICE_MODULE_GENERIC",
    moduleSku: "driftguard",
  },
  transmission: {
    sku: "transmission",
    displayName: "Transmission",
    priceEnvKey: "STRIPE_PRICE_MODULE_GENERIC",
    moduleSku: "transmission",
  },
};

export function isCheckoutSku(value: unknown): value is CheckoutSku {
  return typeof value === "string" && value in STRIPE_PRODUCTS;
}

export function getCheckoutProduct(sku: CheckoutSku) {
  return STRIPE_PRODUCTS[sku];
}

export function getCheckoutPriceId(sku: CheckoutSku) {
  const product = getCheckoutProduct(sku);
  return process.env[product.priceEnvKey];
}

export function getSuccessHref(sku: string | null) {
  switch (sku) {
    case "sentinel":
      return "/docs/sentinel/overview";
    default:
      return "/docs/quickstart/5-minute";
  }
}
