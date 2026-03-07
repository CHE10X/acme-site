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
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 shadow-[0_0_0_1px_rgba(217,138,43,0.06)]">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="max-w-2xl">
              <Link
                href="/"
                className="mb-2 inline-flex text-[13px] uppercase tracking-[0.32em] text-[#D98A2B] transition hover:text-[#C47A22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E2226]"
              >
                ACME Agent Supply Co.
              </Link>
              <h1 className="mb-3 max-w-[18ch] text-[40px] font-semibold tracking-[-0.02em] text-[#E6E6E6]">
                Documentation
              </h1>
              <p className="max-w-[60ch] text-[18px] text-[#9AA3AD]">
                Platform documentation for reliability-minded operators.
              </p>
            </div>

            <div className="flex justify-start md:justify-end">
              <div className="rounded-2xl border border-[#3A4048] bg-[#2C3238] px-4 py-3">
                <img
                  src="/brand/agent911-support-badge.png"
                  alt="Agent911 Support Badge"
                  className="h-28 w-auto opacity-85 md:h-32"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="overflow-hidden rounded">
              <span className="hazard-shimmer block h-1 w-full bg-[repeating-linear-gradient(135deg,rgba(217,138,43,0.8)_0,rgba(217,138,43,0.8)_10px,rgba(30,34,38,0.8)_10px,rgba(30,34,38,0.8)_20px)] bg-[length:24px_24px]" />
            </div>
            <div className="hidden rounded bg-[#2C3238] md:block" />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6">
          <h2 className="text-[30px] font-semibold text-[#E6E6E6]">
            OpenClaw Reliability Stack
          </h2>
          <p className="mt-2 text-[18px] text-[#9AA3AD]">
            How OpenClaw observes, protects, and recovers AI agent systems.
          </p>
          <div className="mt-6">
            <div className="overflow-hidden rounded-xl border border-[#3A4048]">
              <iframe
                src="/diagrams/operator-system-view-v4.html"
                className="h-[600px] w-full border-0 sm:h-[700px]"
                title="OpenClaw Operator System View — interactive reliability stack"
              />
            </div>
            <p className="mt-4 text-[13px] text-[#9AA3AD]">
              Hover any node to inspect. Interactive reliability stack — signal topology across all layers.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 shadow-[0_0_0_1px_rgba(217,138,43,0.05)]">
          <div className="mb-3 text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
            Launch Docs
          </div>
          <div className="space-y-3">
            {LAUNCH_DOCS.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group block rounded-md border border-[#3A4048] bg-[#2C3238] px-5 py-4 transition-colors hover:border-[#9AA3AD] hover:bg-[#2C3238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[22px] font-medium text-[#E6E6E6] transition-colors group-hover:text-[#D98A2B]">
                      {doc.title}
                    </div>
                    <div className="mt-1 text-[18px] text-[#E6E6E6]">
                      {doc.desc}
                    </div>
                  </div>
                  <div className="mt-0.5 shrink-0 rounded bg-[#1E2226] px-2 py-1 text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD]">
                    {doc.tag}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 border-t border-[#3A4048] pt-8">
            <div className="mb-3 text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
              Additional Docs
            </div>
            <div className="space-y-2">
              <Link
                href="/docs/findmyagent/overview"
                className="group flex items-center gap-3 text-[18px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60"
              >
                <span className="text-[#D98A2B]/60 transition-colors group-hover:text-[#D98A2B]">
                  →
                </span>
                FindMyAgent — Agent Presence &amp; Operator Awareness
              </Link>
              <Link
                href="/docs/lazarus/overview"
                className="group flex items-center gap-3 text-[18px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60"
              >
                <span className="text-[#D98A2B]/60 transition-colors group-hover:text-[#D98A2B]">
                  →
                </span>
                Lazarus — Backup Readiness
              </Link>
              <Link
                href="/docs/architecture/reliability-stack"
                className="group flex items-center gap-3 text-[18px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60"
              >
                <span className="text-[#D98A2B]/60 transition-colors group-hover:text-[#D98A2B]">
                  →
                </span>
                Full Architecture Reference
              </Link>
              <Link
                href="/products/octriageunit"
                className="group flex items-center gap-3 text-[18px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D98A2B]/60"
              >
                <span className="text-[#D98A2B]/60 transition-colors group-hover:text-[#D98A2B]">
                  →
                </span>
                OpenClaw Triage Unit (read-only triage)
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
