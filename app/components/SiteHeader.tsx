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
    { href: "/legal/terms-of-service", label: "Legal: Terms of Service" },
    { href: "/legal/privacy-policy", label: "Legal: Privacy Policy" },
    { href: "/legal/refund-policy", label: "Refund Policy" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#3A4048] bg-[#1E2226]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]"
        >
          ACME
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link href="/pricing" className="text-[14px] text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]">
            Pricing
          </Link>
          <Link href="/docs" className="text-[14px] text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]">
            Docs
          </Link>
          <Link href="/support" className="text-[14px] text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]">
            Support
          </Link>
          <Link href="/bot-shop" className="text-[14px] text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]">
            Bot Shop
          </Link>
          <Link href="/operators-tale" className="text-[14px] text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]">
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#3A4048] bg-[#242A30] text-[#E6E6E6] transition-colors hover:border-[#9AA3AD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60"
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
              className="absolute right-0 mt-2 w-72 rounded-xl border border-[#3A4048] bg-[#242A30] p-2 shadow-2xl"
              role="menu"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-[14px] text-[#E6E6E6] transition-colors hover:bg-[#2C3238] hover:text-[#D98A2B]"
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
