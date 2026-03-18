import type { Metadata } from "next";
import Link from "next/link";
import InlineReliabilityStackSvg from "@/app/components/docs/InlineReliabilityStackSvg";

export const metadata: Metadata = {
  title: "Products — ACME Agent Supply Co.",
  description: "Reliability and diagnostic tools for AI agent operators.",
};

const PRODUCTS = [
  // Diagnostics bundle
  { name: "Triage",        bundle: "Diagnostics",        tier: "Free",    command: "triage",             href: "/docs/octriage/overview",                  desc: "Read-only stack diagnostics. No gateway required." },
  { name: "RadCheck",      bundle: "Diagnostics",        tier: "Free",    command: "radcheck",           href: "/docs/radcheck/score-explained",            desc: "0–100 reliability score. Surfaces hidden risk." },
  // Runtime bundle
  { name: "Sentinel",      bundle: "Runtime",            tier: "$5/mo",   command: "sentinel",           href: "/docs/sentinel/overview",                  desc: "Always-on silent failure detection." },
  { name: "Watchdog",      bundle: "Runtime",            tier: "$5/mo",   command: "watchdog",           href: "/docs/watchdog/overview",                  desc: "Heartbeat and liveness monitoring." },
  // Incident Response bundle
  { name: "Agent911",      bundle: "Incident Response",  tier: "$19/mo",  command: "agent911",           href: "/docs/agent911/snapshot-explained",         desc: "Recovery cockpit. Open this at 2am." },
  { name: "Recall",        bundle: "Incident Response",  tier: "$19/mo",  command: "recall",             href: "/docs/recall/overview",                    desc: "Manual fleet intervention surface." },
  { name: "FindMyAgent",   bundle: "Incident Response",  tier: "$19/mo",  command: "findmyagent --list", href: "/docs/findmyagent/overview",                desc: "Live agent presence and heartbeat." },
  { name: "Lazarus",       bundle: "Incident Response",  tier: "$19/mo",  command: "lazarus --simulate", href: "/docs/lazarus/overview",                   desc: "Verify backup readiness before you need it." },
  // Coming soon
  { name: "Transmission",  bundle: "Coming Soon",        tier: "—",       command: "—",                  href: "/docs/transmission/overview",              desc: "Task-aware model routing. Fix the economics." },
  { name: "SphinxGate",    bundle: "Coming Soon",        tier: "—",       command: "sphinxgate",         href: "/docs/sphinxgate/overview",                desc: "Policy enforcement and routing audit." },
  { name: "DriftGuard",    bundle: "Coming Soon",        tier: "—",       command: "driftguard",         href: "/docs/driftguard/overview",                desc: "Behavior drift detection across runs." },
];

const BUNDLE_COLOR: Record<string, string> = {
  "Diagnostics":        "#4A9E6B",
  "Runtime":            "#D98A2B",
  "Incident Response":  "#C0392B",
  "Coming Soon":        "#3A4048",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#1A2028] text-[#E6E6E6]">
      <main>

        {/* ── Full-width diagram hero ── */}
        <div className="w-full border-b border-[#2E3640]">
          <InlineReliabilityStackSvg />
        </div>

        {/* ── Product nav strip ── */}
        <div className="border-b border-[#2E3640] bg-[#151C24] px-6 py-4">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
              {PRODUCTS.filter(p => p.bundle !== "Coming Soon").map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className="text-[#9AA3AD] underline underline-offset-4 hover:text-[#E6E6E6] transition"
                >
                  {p.name}
                </Link>
              ))}
              <Link href="/pricing" className="text-[#D98A2B] underline underline-offset-4 hover:text-[#C47A22] transition">
                Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* ── Tight product table ── */}
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">Product Reference</div>
              <h1 className="mt-1 text-[22px] font-semibold text-[#E6E6E6]">All Products</h1>
            </div>
          </div>

          <div className="overflow-hidden rounded-[6px] border border-[#2E3640]">
            {/* Table header */}
            <div className="grid grid-cols-[140px_120px_80px_160px_1fr] gap-0 border-b border-[#2E3640] bg-[#151C24] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#4A5E70]">
              <div>Product</div>
              <div>Bundle</div>
              <div>Price</div>
              <div>Command</div>
              <div>What it does</div>
            </div>

            {/* Rows */}
            {PRODUCTS.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-[140px_120px_80px_160px_1fr] gap-0 border-b border-[#232B34] px-4 py-3 text-[13px] transition last:border-0 ${p.bundle === "Coming Soon" ? "opacity-50" : "hover:bg-[#1E2630]"}`}
              >
                <div className="flex items-center">
                  {p.bundle !== "Coming Soon" ? (
                    <Link href={p.href} className="font-medium text-[#E6E6E6] hover:text-[#D98A2B] transition">
                      {p.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-[#5A6E80]">{p.name}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: BUNDLE_COLOR[p.bundle] ?? "#9AA3AD" }}
                  >
                    {p.bundle}
                  </span>
                </div>
                <div className="flex items-center text-[#9AA3AD]">{p.tier}</div>
                <div className="flex items-center font-mono text-[11px] text-[#D98A2B]">{p.command}</div>
                <div className="flex items-center text-[#9AA3AD]">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Bundle quick-reference */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { name: "Diagnostics", price: "Free", tools: "Triage + RadCheck", color: "#4A9E6B" },
              { name: "Runtime",     price: "$5/mo", tools: "Sentinel + Watchdog", color: "#D98A2B" },
              { name: "Incident Response", price: "$19/mo", tools: "Agent911 + Recall + FindMyAgent + Lazarus", color: "#C0392B" },
            ].map((b) => (
              <div key={b.name} className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-4 py-3"
                style={{ borderTopColor: b.color, borderTopWidth: "2px" }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: b.color }}>{b.name}</div>
                <div className="mt-1 text-[13px] font-medium text-[#E6E6E6]">{b.price}</div>
                <div className="mt-1 text-[11px] text-[#5A6E80]">{b.tools}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-[12px] text-[#3A4E60]">
            Operator Bundle — everything above — $29/mo (pricing being finalized)
          </div>
        </div>
      </main>
    </div>
  );
}
