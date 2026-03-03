"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSuccessHref } from "../lib/stripeProducts";

type CheckoutStatusProps = {
  type: "success" | "cancel";
};

export default function CheckoutStatus({ type }: CheckoutStatusProps) {
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const successHref = getSuccessHref(sku);

  if (type === "cancel") {
    return (
      <>
        <h1 className="text-3xl font-semibold text-zinc-100">Checkout canceled</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
          No changes were made. Return to pricing when you are ready to continue.
        </p>
        <div className="mt-6">
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
          >
            Back to pricing
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-semibold text-zinc-100">Purchase confirmed</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
        Next: enable {sku || "your selected module"} in your runtime.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={successHref}
          className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
        >
          Continue to next steps
        </Link>
        <Link
          href="/support"
          className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
        >
          Support
        </Link>
      </div>
    </>
  );
}
