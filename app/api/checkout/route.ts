import { NextResponse } from "next/server";
import {
  getCheckoutPriceId,
  isCheckoutProductKey,
  type CheckoutProductKey,
} from "../../lib/stripeProducts";
import { getCatalogPriceId } from "../../lib/stripeCatalog";

type CheckoutBody = {
  productKey?: CheckoutProductKey;
};

function formEncode(values: Record<string, string>) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params;
}

type StripePriceResponse = {
  id: string;
  active: boolean;
  currency: string | null;
  recurring?: object | null;
};

type StripeApiError = {
  error?: {
    type?: string;
    message?: string;
  };
};

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is unavailable because Stripe is not configured." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as CheckoutBody | null;
  if (!body || !isCheckoutProductKey(body.productKey)) {
    return NextResponse.json({ error: "Invalid productKey." }, { status: 400 });
  }

  const productKey = body.productKey;
  const priceId = getCatalogPriceId(productKey) ?? getCheckoutPriceId(productKey);

  if (!priceId) {
    return NextResponse.json(
      { error: `Checkout is unavailable for ${productKey}.` },
      { status: 503 }
    );
  }

  if (priceId.includes("prod_")) {
    return NextResponse.json(
      { error: "Invalid Stripe Price ID configured" },
      { status: 500 }
    );
  }

  const origin = process.env.SITE_URL ?? new URL(request.url).origin;
  const priceResponse = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
  });

  const pricePayload = (await priceResponse.json().catch(() => null)) as
    | StripePriceResponse
    | StripeApiError
    | null;

  if (!priceResponse.ok || !pricePayload || !("id" in pricePayload)) {
    const stripeErrorType =
      pricePayload && "error" in pricePayload ? pricePayload.error?.type : null;
    const stripeError =
      pricePayload && "error" in pricePayload ? pricePayload.error?.message : null;

    return NextResponse.json(
      {
        error:
          stripeErrorType === "invalid_request_error"
            ? "Stripe mode mismatch. Confirm you are using a live API key with live Price IDs (or test with test Price IDs)."
            : stripeError || "Stripe price lookup failed.",
      },
      { status: 502 }
    );
  }

  if (!pricePayload.active || !pricePayload.currency) {
    return NextResponse.json(
      { error: "Configured Stripe price is not active." },
      { status: 503 }
    );
  }

  const params = formEncode({
    mode: pricePayload.recurring ? "subscription" : "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&productKey=${productKey}`,
    cancel_url: `${origin}/pricing`,
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    "metadata[productKey]": productKey,
  });

  console.info("[checkout]", {
    productKey,
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
    | { url?: string; error?: { type?: string; message?: string } }
    | null;

  if (!response.ok || !payload?.url) {
    return NextResponse.json(
      {
        error:
          payload?.error?.type === "invalid_request_error"
            ? "Stripe mode mismatch. Confirm you are using a live API key with live Price IDs (or test with test Price IDs)."
            : payload?.error?.message ||
              "Stripe Checkout Session could not be created.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: payload.url });
}
