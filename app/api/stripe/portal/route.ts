import { NextResponse } from "next/server";
import {
  getEntitlementByCustomerId,
  getEntitlementByEmail,
} from "../../../lib/entitlementsStore";

export const dynamic = "force-dynamic";

type PortalRequestBody = {
  email?: string;
  customerId?: string;
};

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
      { error: "Billing portal is unavailable because Stripe is not configured." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as PortalRequestBody | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const customerId = body?.customerId?.trim() ?? "";

  const record = customerId
    ? await getEntitlementByCustomerId(customerId)
    : email
      ? await getEntitlementByEmail(email)
      : null;

  if (!record) {
    return NextResponse.json(
      { error: "No subscription record was found for that operator." },
      { status: 404 }
    );
  }

  const origin = process.env.SITE_URL ?? new URL(request.url).origin;
  const response = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formEncode({
      customer: record.stripe_customer_id,
      return_url: `${origin}/pricing`,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { url?: string; error?: { message?: string } }
    | null;

  if (!response.ok || !payload?.url) {
    return NextResponse.json(
      {
        error:
          payload?.error?.message ||
          "Stripe billing portal could not be created.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: payload.url });
}
