/**
 * Shared normalization helpers for Stripe event payloads.
 * Extracted from webhook route for reuse across handlers.
 */

export function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null
}

export function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }
  return null
}

export function toRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null
}

export function getPriceIdsFromSubscription(
  subscription: Record<string, unknown>
): string[] {
  const items = subscription.items as
    | { data?: Array<{ price?: { id?: string | null } | null }> }
    | undefined

  return (
    items?.data
      ?.map((item) => item.price?.id)
      .filter((priceId): priceId is string => Boolean(priceId)) ?? []
  )
}

/**
 * Extracts current_period_end from a Stripe subscription object.
 * Returns Unix timestamp in seconds, or null if unavailable.
 */
export function getPeriodEnd(subscription: Record<string, unknown>): number | null {
  const val = subscription.current_period_end
  return typeof val === "number" && Number.isFinite(val) ? val : null
}

/**
 * Extracts current_period_start from a Stripe subscription object.
 * Returns Unix timestamp in seconds, or null if unavailable.
 */
export function getPeriodStart(subscription: Record<string, unknown>): number | null {
  const val = subscription.current_period_start
  return typeof val === "number" && Number.isFinite(val) ? val : null
}
