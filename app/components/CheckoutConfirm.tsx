"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  SUPPORT_EMAIL,
  type CheckoutProductKey,
} from "../lib/stripeProducts";

type CheckoutConfirmProps = {
  productKey: CheckoutProductKey;
  label: string;
  priceLabel?: string;
  fallbackUrl?: string;
  onClose: () => void;
};

const TRUST_BULLETS = [
  "You stay in control — runs locally in your environment",
  "No telemetry by default - evidence only when you choose to share",
  "Observational posture - no autonomous changes",
  "Cancel anytime - manage billing in Stripe's secure portal",
];

export default function CheckoutConfirm({
  productKey,
  label,
  priceLabel,
  fallbackUrl,
  onClose,
}: CheckoutConfirmProps) {
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Purchase request: ${productKey}`);
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}`;
  }, [productKey]);

  const handleContinue = async () => {
    setIsLoading(true);
    setFallbackMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productKey }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;

      if (!response.ok || !payload?.url) {
        if (fallbackUrl) {
          window.location.href = fallbackUrl;
          return;
        }
        throw new Error(payload?.error || "Checkout is unavailable in this build.");
      }

      window.location.href = payload.url;
    } catch (error) {
      if (fallbackUrl) {
        window.location.href = fallbackUrl;
        return;
      }
      setFallbackMessage(
        error instanceof Error
          ? error.message
          : "Checkout is unavailable in this build."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6">
      <div className="w-full max-w-lg rounded-t-2xl border border-white/10 bg-zinc-950 px-5 py-5 shadow-2xl sm:rounded-2xl">
        <div className="text-[10px] uppercase tracking-[0.32em] text-amber-300">
          Confirm &amp; Continue
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-zinc-100">
          Confirm &amp; Continue
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          Secure checkout for operators. No surprises.
        </p>
        <p className="mt-2 text-sm text-zinc-500">Selected: {label}</p>
        {priceLabel ? (
          <p className="mt-1 text-sm text-zinc-400">
            {priceLabel} · billed monthly · runtime = one active OpenClaw agent host
          </p>
        ) : null}
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
          <div className="font-medium text-zinc-100">
            Operator purchase - runs in your environment
          </div>
          <div className="mt-1 text-zinc-400">
            You remain in full control. No hosted lock-in. No hidden telemetry.
          </div>
        </div>

        <ul className="mt-5 space-y-2 text-sm text-zinc-300">
          {TRUST_BULLETS.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>

        <label className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-zinc-950 text-amber-400"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/legal/terms-of-service"
              className="text-amber-200 underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy-policy"
              className="text-amber-200 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {fallbackMessage ? (
          <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            <div>{fallbackMessage}</div>
            <div className="mt-2">
              Checkout is unavailable in this build. Email support to purchase:{" "}
              <a href={mailtoHref} className="underline underline-offset-4">
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-zinc-100"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={() => void handleContinue()}
            disabled={!accepted || isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {isLoading ? "Preparing checkout..." : "Continue to secure checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
