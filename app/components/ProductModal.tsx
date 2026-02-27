"use client";

import { useEffect, useRef, useState } from "react";
import TierBadge from "./TierBadge";

type Product = {
  id: string;
  title: string;
  unitLabel: string;
  tier: "FREE" | "CORE" | "ADVANCED" | "RECOVERY";
  subtitle: string;
  positioning: string;
  bullets: string[];
  optionalOutputs?: string;
  bestFor: string;
  ctaLabel: string;
  docsHref?: string;
  installSnippet?: string;
};

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setVisible(false);
    window.setTimeout(() => {
      onClose();
    }, 160);
  };

  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="fixed inset-0 z-[10050]">
      <button
        aria-label="Close modal"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`product-${product.id}-title`}
          className={`relative w-full md:max-w-2xl md:w-[92vw] rounded-t-2xl md:rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition duration-200 ease-out ${
            visible
              ? "translate-y-0 md:scale-100 opacity-100"
              : "translate-y-4 md:translate-y-2 md:scale-[0.98] opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/10 md:hidden" />
          <div className="px-6 pb-6 pt-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id={`product-${product.id}-title`}
                  className="text-2xl font-semibold text-zinc-100"
                >
                  {product.title}
                </h2>
                <div className="mt-1 text-xs uppercase tracking-[0.32em] text-zinc-500">
                  {product.unitLabel}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TierBadge tier={product.tier} />
                <button
                  ref={closeRef}
                  onClick={handleClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition"
                >
                  ×
                </button>
              </div>
            </div>

            <p className="mt-3 text-[17px] leading-relaxed text-zinc-200">
              {product.subtitle}
            </p>
            <div className="mt-4 h-px w-full bg-zinc-800" />

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  What it does
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">
                  {product.positioning}
                </p>
              </div>

              <ul className="space-y-2 text-[15px] leading-relaxed text-zinc-200">
                {product.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {product.optionalOutputs ? (
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Outputs
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">
                    {product.optionalOutputs}
                  </p>
                </div>
              ) : null}

              <div className="text-[15px] leading-relaxed text-zinc-300">
                <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs">
                  Best for
                </span>
                <span className="ml-2 text-zinc-200">{product.bestFor}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400">
                {product.ctaLabel}
              </button>
              {product.docsHref ? (
                <a
                  href={product.docsHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                >
                  Docs
                </a>
              ) : (
                <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white">
                  Docs
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
