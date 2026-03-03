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
    href: "/docs/sentinel/overview",
    title: "Sentinel — Continuous Guardrails",
    desc: "Always-on detection for silent failures, stalls, and runtime drift.",
    tag: "Sentinel",
  },
  {
    href: "/docs/sphinxgate/overview",
    title: "SphinxGate — Policy Enforcement",
    desc: "Routing guardrails with inspectable policy decisions.",
    tag: "SphinxGate",
  },
  {
    href: "/docs/agent911/snapshot-explained",
    title: "Agent911 Snapshot — What It Reads, What It Doesn't Touch",
    desc: "Read-only telemetry cockpit: zero config mutations, operator playbooks only.",
    tag: "Agent911",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="max-w-2xl">
              <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-amber-400">
                ACME Agent Supply Co.
              </div>
              <h1 className="max-w-[18ch] text-3xl font-semibold tracking-[-0.02em] text-zinc-100 mb-3">
                Documentation
              </h1>
              <p className="max-w-[60ch] text-zinc-400">
                Platform documentation for reliability-minded operators.
              </p>
            </div>

            <div className="flex justify-start md:justify-end">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-4 py-3">
                <img
                  src="/brand/agent911-support-badge.png"
                  alt="Agent911 Support Badge"
                  className="h-28 w-auto opacity-85 md:h-32"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded">
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
                href="/docs/findmyagent/overview"
                className="group flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                <span className="text-amber-400/50 group-hover:text-amber-400 transition-colors">
                  →
                </span>
                FindMyAgent — Agent Presence &amp; Operator Awareness
              </Link>
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
