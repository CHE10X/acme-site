"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  enablePulseAccent?: boolean;
};

export default function SiteHeader({
  enablePulseAccent = false,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
    { href: "/support", label: "Support" },
    { href: "/bot-shop", label: "Bot Shop" },
    { href: "/operators-tale", label: "Operator's Tale" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:text-white"
        >
          ACME
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link href="/pricing" className="text-sm text-zinc-400 transition-colors hover:text-zinc-200">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm text-zinc-400 transition-colors hover:text-zinc-200">
            Docs
          </Link>
          <Link href="/support" className="text-sm text-zinc-400 transition-colors hover:text-zinc-200">
            Support
          </Link>
          <Link href="/bot-shop" className="text-sm text-zinc-400 transition-colors hover:text-zinc-200">
            Bot Shop
          </Link>
          <Link href="/operators-tale" className="text-sm text-zinc-400 transition-colors hover:text-zinc-200">
            Operator&apos;s Tale
          </Link>
        </nav>

        <div className="relative sm:hidden">
          {enablePulseAccent ? (
            <span className="pointer-events-none absolute inset-0 rounded-full border border-amber-400/30 animate-ping [animation-duration:3.5s]" />
          ) : null}
          <button
            ref={buttonRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/80 text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            <span className="sr-only">Menu</span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>
          </button>

          {open ? (
            <div
              ref={panelRef}
              className="absolute right-0 mt-2 w-72 rounded-xl border border-zinc-700 bg-zinc-900/98 p-2 shadow-2xl"
              role="menu"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
