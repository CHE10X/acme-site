import { NextResponse } from "next/server";
import {
  getCheckoutPriceId,
  isCheckoutSku,
  type CheckoutSku,
} from "../../lib/stripeProducts";

type CheckoutBody = {
  sku?: CheckoutSku;
  quantity?: number;
};

function clampQuantity(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.min(10, Math.max(1, Math.floor(value)));
}

function formEncode(values: Record<string, string>) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params;
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is unavailable because Stripe is not configured." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as CheckoutBody | null;
  if (!body || !isCheckoutSku(body.sku)) {
    return NextResponse.json({ error: "Invalid sku." }, { status: 400 });
  }

  const sku = body.sku;
  const quantity = clampQuantity(body.quantity);
  const priceId = getCheckoutPriceId(sku);

  if (!priceId) {
    return NextResponse.json(
      { error: `Checkout is unavailable for ${sku}.` },
      { status: 503 }
    );
  }

  const origin = new URL(request.url).origin;
  const params = formEncode({
    mode: "subscription",
    success_url: `${origin}/checkout/success?sku=${sku}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel?sku=${sku}`,
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": String(quantity),
    "metadata[sku]": sku,
    "metadata[moduleSku]":
      sku === "sphinxgate" || sku === "driftguard" || sku === "transmission"
        ? sku
        : "",
    "metadata[source]": "acme-site",
    "metadata[build]": process.env.VERCEL_GIT_COMMIT_SHA || "local",
  });

  console.info("[checkout]", {
    sku,
    timestamp: new Date().toISOString(),
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const payload = (await response.json().catch(() => null)) as
    | { url?: string; error?: { message?: string } }
    | null;

  if (!response.ok || !payload?.url) {
    return NextResponse.json(
      {
        error:
          payload?.error?.message || "Stripe Checkout Session could not be created.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: payload.url });
}
