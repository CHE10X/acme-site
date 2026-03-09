import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — ACME Agent Supply Co.",
  description: "Reliability and diagnostic tools for AI agent operators.",
};

const products = [
  // Free Entry Points
  {
    href: "/products/radcheck",
    name: "RadCheck",
    tag: "Free — Detection",
    description:
      "Read-only reliability scan. Get a 0–100 score that surfaces stall risk, silence gaps, compaction pressure, and hygiene issues. Nothing changes on your system.",
  },
  {
    href: "/products/octriageunit",
    name: "OCTriage",
    tag: "Free — Triage",
    description:
      "Entry-point triage terminal for incident assessment. Collect evidence, classify failures, and generate proof bundles without touching live state.",
  },
  {
    href: "/products/lazarus",
    name: "Lazarus Lite",
    tag: "Free — Recovery Readiness",
    description:
      "Maps backup coverage and validates restore assumptions before incidents force the test. Know your recovery posture before you need it.",
  },
  // Core Paid Products
  {
    href: "/products/sentinel",
    name: "Sentinel",
    tag: "Core — Runtime Protection",
    description:
      "Always-on runtime guardrails. Detects stalls and silent failures during live operation — the problems that don't crash but quietly break your workflows.",
  },
  {
    href: "/products/sphinxgate",
    name: "SphinxGate",
    tag: "Core — Policy Enforcement",
    description:
      "Enforces allow/deny routing policy across multi-model teams. Deterministic, inspectable routing decisions with full audit trail.",
  },
  // Strategic / Expansion
  {
    href: "/products/agent911",
    name: "Agent911",
    tag: "Strategic — Control Plane",
    description:
      "Unified control surface for multi-agent operations. Health signals, anomaly detection, recovery guidance, and proof bundles. The 2am cockpit.",
  },
  {
    href: "/products/findmyagent",
    name: "FindMyAgent",
    tag: "Included with Agent911",
    description:
      "Live agent presence and heartbeat visibility. Know which agents are up, which are degraded, and which went silent.",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#e8a317]">
            Product Catalog
          </div>
          <h1 className="mt-3 text-3xl font-bold text-[#E6E6E6] md:text-4xl">
            ACME Agent Supply Tools
          </h1>
          <p className="mt-4 text-[#9AA3AD] max-w-xl">
            Reliability, diagnostics, and recovery infrastructure for operators running AI agent systems.
          </p>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group block rounded-xl border border-[#3A4048] bg-[#242A30] p-6 transition-colors hover:border-[#e8a317]/40 hover:bg-[#2C3238]"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#e8a317]">
                {product.tag}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-[#E6E6E6] group-hover:text-white">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-[#9AA3AD]">{product.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
