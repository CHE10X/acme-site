import type { Metadata } from "next";
import Link from "next/link";
import QMUnderTheHood from "@/app/components/QMUnderTheHood";

export const metadata: Metadata = {
  title: "Quartermaster — ACME Agent Supply Co.",
  description:
    "Quartermaster keeps your agent fleet moving. Automated task coordination, DONE-loop enforcement, and stall detection — without babysitting.",
};

const CAPABILITIES = [
  {
    heading: "Automated task coordination",
    detail:
      "QM reads your mission manifest every 30 minutes and routes tasks to the right agents via INBOX. No manual dispatch needed.",
  },
  {
    heading: "DONE-loop enforcement",
    detail:
      "Agents must acknowledge assignments and file DONE_REPORT on completion. QM tracks the loop. Nothing goes missing silently.",
  },
  {
    heading: "Stall detection + escalation",
    detail:
      "When a task stops moving, QM diagnoses the cause and escalates with a structured report — not a vague alert.",
  },
  {
    heading: "Authorized remediation",
    detail:
      "QM can fix known issues in-scope (missing INBOX, missing DONE protocol) when you say so. Every change is labeled, logged, reversible.",
  },
];

export default function QuartermasterProductPage() {
  return (
    <div className="min-h-screen bg-[#1A2028] text-[#E6E6E6]">
      <main className="mx-auto max-w-4xl px-6 py-12 space-y-6">

        {/* Hero */}
        <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-7">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B] mb-2">
            Fleet Operations
          </div>
          <h1 className="text-[28px] font-semibold text-[#E6E6E6] tracking-tight">
            Quartermaster
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#9AA3AD]">
            QM keeps your agent fleet moving. It dispatches work, tracks completion, and catches stalls —
            so you get a report instead of a mystery.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://docs.acmeagentsupply.com/qm/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded bg-[#D98A2B] px-4 py-2 text-[13px] font-medium text-[#1A2028] hover:bg-[#C47A22] transition"
            >
              Quick Start →
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded border border-[#3A4048] px-4 py-2 text-[13px] text-[#E6E6E6] hover:border-[#D98A2B] transition"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* Capabilities */}
        <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-6">
          <h2 className="text-[14px] uppercase tracking-[0.3em] text-[#5A7080] mb-5">What it does</h2>
          <div className="space-y-0 divide-y divide-[#252C38]">
            {CAPABILITIES.map((c) => (
              <div key={c.heading} className="grid grid-cols-[200px_1fr] gap-6 py-4">
                <div className="text-[13px] font-medium text-[#C8D4E0]">{c.heading}</div>
                <div className="text-[13px] text-[#7A8EA0] leading-5">{c.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Under the Hood callout — t12 */}
        <QMUnderTheHood />

        {/* Install */}
        <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-6">
          <h2 className="text-[14px] uppercase tracking-[0.3em] text-[#5A7080] mb-4">Install</h2>
          <pre className="overflow-x-auto rounded border border-[#2A3240] bg-[#151C24] px-4 py-3 text-[12px] text-[#D98A2B] font-mono">
            <code>openclaw install quartermaster</code>
          </pre>
          <p className="mt-3 text-[12px] text-[#4A5E70]">
            Runs a setup wizard on first install. Provisions INBOXes, pulse crons, and a seed mission.
            You see it work before you close the tab.
          </p>
        </section>

        {/* Footer links */}
        <div className="flex flex-wrap items-center gap-5 pt-1 text-[12px]">
          <Link href="/trust" className="text-[#5A7080] hover:text-[#D98A2B] transition">
            Trust &amp; Transparency →
          </Link>
          <a
            href="https://docs.acmeagentsupply.com/qm/reference-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A7080] hover:text-[#D98A2B] transition"
          >
            Reference Stack →
          </a>
          <Link href="/products" className="text-[#5A7080] hover:text-[#D98A2B] transition">
            ← All Products
          </Link>
        </div>

      </main>
    </div>
  );
}
