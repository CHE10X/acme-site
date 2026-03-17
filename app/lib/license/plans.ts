import { STRIPE_PRODUCTS } from "../stripeProducts"

export type Plan = "community" | "operator" | "enterprise"

export const PLAN_FEATURES: Record<Plan, string[]> = {
  community: [
    "watch",
    "radcheck:basic",
    "telemetry:basic",
  ],
  operator: [
    "watch",
    "radcheck:basic",
    "telemetry:basic",
    "agent911",
    "fleet_control",
  ],
  enterprise: [
    "watch",
    "radcheck:basic",
    "telemetry:basic",
    "agent911",
    "fleet_control",
    "sentinel",
    "driftguard",
    "radcheck:predictive",
  ],
}

export function getFeaturesForPlan(plan: Plan): string[] {
  return PLAN_FEATURES[plan] ?? PLAN_FEATURES.community
}

export function getPlanRank(plan: Plan): number {
  switch (plan) {
    case "community": return 0
    case "operator": return 1
    case "enterprise": return 2
  }
}

/**
 * Infer plan from a product key string (e.g. "operator-kit", "agent911").
 */
export function inferPlanFromProductKey(productKey: string): Plan {
  const key = productKey.toLowerCase().trim()

  if (key.includes("enterprise")) return "enterprise"

  const product = STRIPE_PRODUCTS[key as keyof typeof STRIPE_PRODUCTS]
  if (!product) return "community"

  const tier = product.tier
  switch (tier) {
    case "bundle":
    case "advanced":
    case "console":
      return "operator"
    case "foundation":
    case "standard":
      return "community"
    default:
      return "community"
  }
}

/**
 * Infer plan from a Stripe subscription object.
 * Looks at line items / price metadata or falls back to product key inference.
 */
export function inferPlanFromSubscription(
  subscription: Record<string, unknown>
): Plan {
  // Try metadata.plan first (explicit override)
  const metadata = subscription.metadata as Record<string, unknown> | null
  if (metadata) {
    const explicit = (metadata.plan ?? metadata.productKey ?? metadata.product_key) as
      | string
      | undefined
    if (explicit) {
      const lower = explicit.toLowerCase()
      if (lower === "enterprise") return "enterprise"
      if (lower === "operator" || lower === "operator-kit" || lower === "bundle")
        return "operator"
      if (lower === "community") return "community"
      return inferPlanFromProductKey(explicit)
    }
  }

  // Try line item product key
  const items = subscription.items as
    | { data?: Array<{ price?: { product?: string | null } | null; metadata?: Record<string, unknown> }> }
    | undefined

  const firstItem = items?.data?.[0]
  const priceMetadata = firstItem?.metadata
  if (priceMetadata?.plan) {
    return inferPlanFromSubscription({ metadata: priceMetadata })
  }

  const productId = firstItem?.price?.product
  if (productId && typeof productId === "string") {
    // Check STRIPE_PRODUCTS for matching product key
    for (const [key, config] of Object.entries(STRIPE_PRODUCTS)) {
      if (key === productId || config.productKey === productId) {
        return inferPlanFromProductKey(config.productKey)
      }
    }
  }

  return "community"
}
