import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PRICE_ENV_KEYS = [
  "SENTINEL_PRICE_ID",
  "OPERATOR_KIT_PRICE_ID",
  "AGENT911_PRICE_ID",
  "SPHINXGATE_PRICE_ID",
  "DRIFTGUARD_PRICE_ID",
  "TRANSMISSION_PRICE_ID",
  "WATCHDOG_PRICE_ID",
  "LAZARUS_PRICE_ID",
  "FINDMYAGENT_PRICE_ID",
] as const;

function inferStripeMode(secretKey: string | undefined) {
  if (!secretKey) return "missing";
  if (secretKey.startsWith("sk_live")) return "live";
  if (secretKey.startsWith("sk_test")) return "test";
  return "unknown";
}

function maskPriceId(value: string | undefined) {
  if (!value) return null;
  const suffix = value.slice(-6);
  return `***${suffix}`;
}

export async function GET() {
  const stripeMode = inferStripeMode(process.env.STRIPE_SECRET_KEY);

  return NextResponse.json({
    stripeMode,
    priceIds: PRICE_ENV_KEYS.map((key) => ({
      key,
      value: maskPriceId(process.env[key]),
    })),
  });
}
