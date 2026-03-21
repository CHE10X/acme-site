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
  sentinel: "$5",           // ✅ confirmed — Stripe price_1T6wUr2YB5gO0VSavbJuWJfu
  "operator-kit": "$29",    // updated to match Operator Bundle
  agent911: "$19",          // ✅ confirmed
  sphinxgate: "$5",         // ✅ updated 2026-03-20 — price bumped $1→$5 (Chip/Heike, 2026-03-19)
  infrawatch: "Bundle",     // included in Operator Bundle only — SKU retired 2026-03-18
  // driftguard: REMOVED — renamed InfraWatch
  transmission: "",         // coming soon — no price
  // watchdog: RETIRED 2026-03-18 — folds into Sentinel bundle; SKU prod_U58SANlEPHonBS archived
  // lazarus: RETIRED standalone 2026-03-18 — free, included with Agent911; SKU prod_U56pnIIsyz4nxl archived
  // findmyagent: REMOVED 2026-03-18 — deprecated
  "operator-bundle": "$29", // ✅ confirmed — new price_1TCVKY2YB5gO0VSac5Hseo29
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
