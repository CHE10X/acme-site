"use client";

import Image from "next/image";
import Link from "next/link";

export default function OCTriageUnitHero() {
  return (
    <section className="relative overflow-hidden border-b border-black/15 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.3),transparent_38%),linear-gradient(180deg,#171717_0%,#0a0a0a_52%,#151515_100%)] text-white">
      <div className="absolute inset-0 opacity-15 hazard-shimmer hazard-stripe" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-16">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-amber-200">
            Canonical Hero
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            triage-unit
          </p>
          <h1 className="max-w-xl text-5xl uppercase leading-none tracking-[0.08em] md:text-7xl">
            OCTriageUnit
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-7 text-white/78 md:text-xl">
            Read-only control-plane triage with proof bundles, pattern verdicts,
            and an operator-safe workflow built to stay usable when systems are
            already degraded.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-white/72">
            <span className="border border-white/20 px-3 py-2">Read-only</span>
            <span className="border border-white/20 px-3 py-2">Proof bundle</span>
            <span className="border border-white/20 px-3 py-2">No restarts</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/install"
              className="border border-amber-300 bg-amber-300 px-5 py-3 text-sm uppercase tracking-[0.24em] text-black transition hover:bg-amber-200"
            >
              Install OCTriageUnit
            </Link>
            <a
              href="/images/triage-unit/triage-unit-source.html"
              className="border border-white/30 px-5 py-3 text-sm uppercase tracking-[0.24em] text-white transition hover:border-white/60 hover:bg-white/8"
            >
              View Source Hero
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-auto h-72 w-72 rounded-full bg-amber-400/16 blur-3xl md:h-96 md:w-96" />
          <div className="relative overflow-hidden border border-white/15 bg-black/35 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur">
            <Image
              src="/images/triage-unit/triage-unit-hero-1000.png"
              alt="OCTriageUnit canonical triage-unit hero"
              width={500}
              height={500}
              priority
              className="h-auto w-full max-w-[460px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
