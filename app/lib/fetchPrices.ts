/**
 * fetchPrices — shared server-side Stripe price fetcher
 *
 * Used by:
 *   - app/pricing/page.tsx  (server component, direct call)
 *   - app/api/prices/route.ts  (API route, for client-side consumers)
 *
 * Always falls back to hardcoded defaults if Stripe is unavailable.
 */

import { STRIPE_PRODUCTS, type CheckoutProductKey } from "./stripeProducts";

export type PriceMap = Record<string, string>; // productKey → display string e.g. "$5"

/** Hardcoded fallback — used when Stripe is unconfigured or unreachable */
export const PRICE_FALLBACKS: PriceMap = {
  sentinel: "$5",
  "operator-kit": "$5",
  agent911: "$19",
  sphinxgate: "TBD",       // No confirmed price — access control layer, sold separately
  infrawatch: "Bundle",    // Included in Operator Bundle only — not sold standalone
  // driftguard: REMOVED 2026-03-18 — renamed InfraWatch, bundled with Operator Bundle
  transmission: "",             // Coming soon — no price displayed
  watchdog: "$5",          // Confirmed core tier alongside Sentinel
  // findmyagent: REMOVED 2026-03-18 — deprecated, folded into recall status --watch
  lazarus: "$0",           // Included with Agent911
  free: "$0",
};

type StripePriceData = {
  id: string;
  unit_amount: number | null;
  currency: string;
  active: boolean;
};

function formatAmount(cents: number): string {
  const dollars = cents / 100;
  return dollars === Math.floor(dollars) ? `$${dollars}` : `$${(dollars).toFixed(2)}`;
}

/**
 * Fetch live prices from Stripe.
 * Returns a map of productKey → display price string.
 * Falls back gracefully to PRICE_FALLBACKS on any error.
 */
export async function fetchPrices(): Promise<PriceMap> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { ...PRICE_FALLBACKS };

  const productsWithPrices = Object.values(STRIPE_PRODUCTS).filter(
    (p) => p.priceEnvKey
  );

  const fetches = productsWithPrices.map(async (product) => {
    if (!product.priceEnvKey) return null;
    const priceId = process.env[product.priceEnvKey];
    if (!priceId) return null;

    try {
      const res = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
        headers: { Authorization: `Bearer ${secretKey}` },
        next: { revalidate: 300 }, // cache 5 minutes
      });

      if (!res.ok) return null;
      const data = (await res.json()) as StripePriceData;

      if (!data.active || data.unit_amount == null) return null;

      return [product.productKey, formatAmount(data.unit_amount)] as const;
    } catch {
      return null;
    }
  });

  const results = await Promise.all(fetches);
  const prices: PriceMap = { ...PRICE_FALLBACKS };

  for (const result of results) {
    if (result) prices[result[0]] = result[1];
  }

  return prices;
}
