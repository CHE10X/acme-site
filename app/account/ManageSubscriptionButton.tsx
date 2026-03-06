"use client";

import { useState } from "react";

type ManageSubscriptionButtonProps = {
  customerId: string;
  email: string | null;
};

export default function ManageSubscriptionButton({
  customerId,
  email,
}: ManageSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          email,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;

      if (!response.ok || !payload?.url) {
        setErrorMessage(
          payload?.error || "Billing portal is unavailable right now."
        );
        return;
      }

      window.location.href = payload.url;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Opening billing portal..." : "Manage subscription"}
      </button>
      {errorMessage ? (
        <p className="mt-3 text-sm text-amber-200">{errorMessage}</p>
      ) : null}
    </div>
  );
}
