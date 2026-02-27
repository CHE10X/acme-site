import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs — ACME Agent Supply Co.",
  description:
    "Documentation for the ACME Agent Supply reliability platform.",
};

const LAUNCH_DOCS = [
  {
    href: "/docs/radcheck/score-explained",
    title: "How RadCheck Scores Your Stack",
    desc: "The 5-domain scoring model, risk bands, guardrails, and what each check catches.",
    tag: "RadCheck",
  },
  {
    href: "/docs/agent911/snapshot-explained",
    title: "Agent911 Snapshot — What It Reads, What It Doesn't Touch",
    desc: "Read-only telemetry cockpit: 7 sources, zero config mutations, no autonomous recovery.",
    tag: "Agent911",
  },
  {
    href: "/docs/quickstart/5-minute",
    title: "5-Minute Quickstart",
    desc: "Run your first scan and get a stack health snapshot in under 5 minutes.",
    tag: "Quickstart",
  },
  {
    href: "/docs/architecture/reliability-stack",
    title: "Reliability Stack Architecture",
    desc: "How Watchdog, Sentinel, SphinxGate, Lazarus, RadCheck, and Agent911 layer together.",
    tag: "Architecture",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400 mb-2">
            ACME Agent Supply Co.
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-3">
            Documentation
          </h1>
          <p className="text-zinc-400">
            Platform documentation for reliability-minded operators.
          </p>
          <div className="mt-5 overflow-hidden rounded">
            <span className="hazard-shimmer block h-1 w-full bg-[repeating-linear-gradient(135deg,rgba(251,191,36,0.85)_0,rgba(251,191,36,0.85)_10px,rgba(0,0,0,0.85)_10px,rgba(0,0,0,0.85)_20px)] bg-[length:24px_24px]" />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.05)]">
          <div className="mb-3 text-[11px] uppercase tracking-[0.4em] text-zinc-500">
            Launch Docs
          </div>
          <div className="space-y-3">
            {LAUNCH_DOCS.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group block rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {doc.title}
                    </div>
                    <div className="mt-1 text-sm text-zinc-400">
                      {doc.desc}
                    </div>
                  </div>
                  <div className="shrink-0 text-[10px] uppercase tracking-widest text-zinc-500 bg-zinc-800 px-2 py-1 rounded mt-0.5">
                    {doc.tag}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-800/60">
            <div className="mb-3 text-[11px] uppercase tracking-[0.4em] text-zinc-500">
              Additional Docs
            </div>
            <div className="space-y-2">
              <Link
                href="/docs/lazarus/overview"
                className="group flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                <span className="text-amber-400/50 group-hover:text-amber-400 transition-colors">
                  →
                </span>
                Lazarus — Backup Readiness
              </Link>
              <Link
                href="/docs/architecture/reliability-stack"
                className="group flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                <span className="text-amber-400/50 group-hover:text-amber-400 transition-colors">
                  →
                </span>
                Full Architecture Reference
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
