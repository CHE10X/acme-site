"use client";

import Image from "next/image";
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
    { href: "/quartermaster", label: "QuarterMaster" },
    { href: "/docs", label: "Docs" },
    { href: "/contact", label: "Contact" },
    { href: "/products/quartermaster", label: "Legacy QM" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(26,24,20,0.12)] bg-[#f5f2ec]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          aria-label="Council10 home"
        >
          <Image
            src="/site-brand/council10-logo-light-480-transparent.png"
            alt="Council10"
            width={1532}
            height={336}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 sm:flex">
          <Link
            href="/quartermaster"
            className="text-[13px] uppercase tracking-[0.12em] text-[#3d3a34] transition-colors hover:text-[#1a1814]"
          >
            QuarterMaster
          </Link>
          <Link
            href="/docs"
            className="text-[13px] uppercase tracking-[0.12em] text-[#3d3a34] transition-colors hover:text-[#1a1814]"
          >
            Docs
          </Link>
          <Link
            href="/contact"
            className="text-[13px] uppercase tracking-[0.12em] text-[#3d3a34] transition-colors hover:text-[#1a1814]"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-[2px] border border-[rgba(26,24,20,0.14)] px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-[#1a1814] transition hover:border-[rgba(26,24,20,0.28)]"
          >
            Talk to us
          </Link>
        </nav>

        <div className="relative sm:hidden">
          {enablePulseAccent ? (
            <span className="pointer-events-none absolute inset-0 rounded-full border border-[#1d9e75]/25 animate-ping [animation-duration:3.5s]" />
          ) : null}
          <button
            ref={buttonRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-[rgba(26,24,20,0.14)] bg-[#ede9e0] text-[#1a1814] transition-colors hover:border-[rgba(26,24,20,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d9e75]/45"
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
              className="absolute right-0 mt-2 w-72 rounded-[2px] border border-[rgba(26,24,20,0.14)] bg-[#f5f2ec] p-2 shadow-[0_24px_60px_rgba(26,24,20,0.12)]"
              role="menu"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-[2px] px-3 py-2.5 text-[13px] uppercase tracking-[0.1em] text-[#1a1814] transition-colors hover:bg-[#ede9e0] hover:text-[#1d9e75]"
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
