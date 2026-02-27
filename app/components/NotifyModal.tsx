"use client";

import { useEffect, useRef, useState } from "react";

export default function NotifyModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
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
    setVisible(true);
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[10060]">
      <button
        aria-label="Close modal"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
        <div
          role="dialog"
          aria-modal="true"
          className={`relative w-full md:max-w-md md:w-[92vw] rounded-t-2xl md:rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition duration-200 ease-out ${
            visible
              ? "translate-y-0 md:scale-100 opacity-100"
              : "translate-y-4 md:translate-y-2 md:scale-[0.98] opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/10 md:hidden" />
          <div className="px-6 pb-6 pt-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-zinc-100">
                Get notified when this unit comes online
              </h2>
              <button
                onClick={handleClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
              We’ll notify you when this capability exits field testing. No
              noise. No marketing blasts.
            </p>
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Email
                </label>
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="operator@acme.dev"
                  className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sm text-zinc-400 hover:text-zinc-200 transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
                >
                  Notify Me
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
