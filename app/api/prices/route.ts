import { NextResponse } from "next/server";
import { fetchPrices, PRICE_FALLBACKS } from "../../lib/fetchPrices";

// Cache 5 minutes
export const revalidate = 300;

export async function GET() {
  const prices = await fetchPrices();

  return NextResponse.json({
    prices,
    fallbacks: PRICE_FALLBACKS,
    fetchedAt: new Date().toISOString(),
  });
}
