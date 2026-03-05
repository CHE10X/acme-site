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

export type EntitlementKey =
  | "sentinel"
  | "agent911"
  | "sphinxgate"
  | "driftguard"
  | "transmission"
  | "watchdog";

export type SubscriptionTier =
  | "standard"
  | "bundle"
  | "console"
  | "advanced"
  | "foundation"
  | "free";

export type StripeProductConfig = {
  productKey: CheckoutProductKey;
  displayName: string;
  priceEnvKey?:
    | "SENTINEL_PRICE_ID"
    | "OPERATOR_KIT_PRICE_ID"
    | "AGENT911_PRICE_ID"
    | "SPHINXGATE_PRICE_ID"
    | "DRIFTGUARD_PRICE_ID"
    | "TRANSMISSION_PRICE_ID";
  tier: SubscriptionTier;
  entitlements: EntitlementKey[];
};

export const SUPPORT_EMAIL = "support@acmeagentsupply.co";

export const STRIPE_PRODUCTS: Record<CheckoutProductKey, StripeProductConfig> = {
  sentinel: {
    productKey: "sentinel",
    displayName: "Sentinel",
    priceEnvKey: "SENTINEL_PRICE_ID",
    tier: "standard",
    entitlements: ["sentinel"],
  },
  "operator-kit": {
    productKey: "operator-kit",
    displayName: "Operator Kit",
    priceEnvKey: "OPERATOR_KIT_PRICE_ID",
    tier: "bundle",
    entitlements: [
      "sentinel",
      "watchdog",
      "sphinxgate",
      "driftguard",
      "transmission",
    ],
  },
  agent911: {
    productKey: "agent911",
    displayName: "Agent911",
    priceEnvKey: "AGENT911_PRICE_ID",
    tier: "console",
    entitlements: ["agent911"],
  },
  sphinxgate: {
    productKey: "sphinxgate",
    displayName: "SphinxGate",
    priceEnvKey: "SPHINXGATE_PRICE_ID",
    tier: "standard",
    entitlements: ["sphinxgate"],
  },
  driftguard: {
    productKey: "driftguard",
    displayName: "DriftGuard",
    priceEnvKey: "DRIFTGUARD_PRICE_ID",
    tier: "advanced",
    entitlements: ["driftguard"],
  },
  transmission: {
    productKey: "transmission",
    displayName: "Transmission",
    priceEnvKey: "TRANSMISSION_PRICE_ID",
    tier: "advanced",
    entitlements: ["transmission"],
  },
  watchdog: {
    productKey: "watchdog",
    displayName: "Watchdog",
    tier: "foundation",
    entitlements: ["watchdog"],
  },
  lazarus: {
    productKey: "lazarus",
    displayName: "Lazarus",
    tier: "free",
    entitlements: [],
  },
  findmyagent: {
    productKey: "findmyagent",
    displayName: "FindMyAgent",
    tier: "free",
    entitlements: [],
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
  if (!product.priceEnvKey) {
    return undefined;
  }
  return process.env[product.priceEnvKey];
}

export function getCheckoutPaymentLink(productKey: CheckoutProductKey) {
  const links: Partial<Record<CheckoutProductKey, string | undefined>> = {
    sentinel: process.env.NEXT_PUBLIC_STRIPE_LINK_SENTINEL,
    "operator-kit": process.env.NEXT_PUBLIC_STRIPE_LINK_OPERATOR_KIT,
    agent911: process.env.NEXT_PUBLIC_STRIPE_LINK_AGENT911,
    sphinxgate: process.env.NEXT_PUBLIC_STRIPE_LINK_SPHINXGATE,
    driftguard: process.env.NEXT_PUBLIC_STRIPE_LINK_DRIFTGUARD,
    transmission: process.env.NEXT_PUBLIC_STRIPE_LINK_TRANSMISSION,
  };

  return links[productKey];
}

export type StripePriceEntitlement = {
  productKey: CheckoutProductKey;
  entitlements: EntitlementKey[];
  tier: SubscriptionTier;
  displayName: string;
};

export function getConfiguredPriceEntitlementMap() {
  const entries = Object.values(STRIPE_PRODUCTS)
    .map((product) => {
      if (!product.priceEnvKey) {
        return null;
      }

      const priceId = process.env[product.priceEnvKey];
      if (!priceId) {
        return null;
      }

      return [
        priceId,
        {
          productKey: product.productKey,
          entitlements: product.entitlements,
          tier: product.tier,
          displayName: product.displayName,
        } satisfies StripePriceEntitlement,
      ] as const;
    })
    .filter((entry): entry is readonly [string, StripePriceEntitlement] => entry !== null);

  return Object.fromEntries(entries) as Record<string, StripePriceEntitlement>;
}

export function getEntitlementsForPriceIds(priceIds: string[]) {
  const configuredMap = getConfiguredPriceEntitlementMap();
  const entitlements = new Set<EntitlementKey>();

  for (const priceId of priceIds) {
    const entry = configuredMap[priceId];
    if (!entry) {
      continue;
    }

    entry.entitlements.forEach((entitlement) => entitlements.add(entitlement));
  }

  return Array.from(entitlements);
}

export function getTierForPriceIds(priceIds: string[]) {
  const configuredMap = getConfiguredPriceEntitlementMap();
  const matched = priceIds
    .map((priceId) => configuredMap[priceId])
    .filter((entry): entry is StripePriceEntitlement => Boolean(entry));

  return matched[0]?.tier ?? null;
}

export function getSuccessHref(productKey: string | null) {
  switch (productKey) {
    case "sentinel":
      return "/docs/sentinel/overview";
    default:
      return "/docs/quickstart/5-minute";
  }
}
