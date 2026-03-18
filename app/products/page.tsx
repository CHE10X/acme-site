import type { Metadata } from "next";
import Link from "next/link";
import InlineReliabilityStackSvg from "@/app/components/docs/InlineReliabilityStackSvg";

export const metadata: Metadata = {
  title: "Products — ACME Agent Supply Co.",
  description: "Reliability and diagnostic tools for AI agent operators.",
};

const PRODUCTS = [
  // Diagnostics
  { name: "Triage",          bundle: "Diagnostics",     tier: "Free",    command: "triage",                href: "/docs/triage",           desc: "Read-only stack diagnostics. No gateway required." },
  { name: "RadCheck",        bundle: "Diagnostics",     tier: "Free",    command: "radcheck",              href: "/docs/radcheck/score-explained", desc: "0–100 reliability score. Surfaces hidden risk." },
  // Operator Bundle — one resilience layer, sold as a unit
  { name: "Operator Bundle", bundle: "Operator Bundle", tier: "$29/mo",  command: "—",                     href: "/docs/operator-bundle",  desc: "The complete resilience layer. Detection → readiness → recovery, fully wired." },
  // Standalone resilience products (entry points into the bundle)
  { name: "Sentinel",        bundle: "Resilience",      tier: "$5/mo",   command: "sentinel",              href: "/docs/sentinel",         desc: "Always-on silent failure detection." },
  { name: "Watchdog",        bundle: "Resilience",      tier: "$5/mo",   command: "watchdog",              href: "/docs/watchdog",         desc: "Heartbeat and liveness monitoring." },
  { name: "Lazarus",         bundle: "Resilience",      tier: "$19/mo",  command: "lazarus --simulate",    href: "/docs/lazarus",          desc: "Readiness scan. Confirms recovery is possible before it runs." },
  { name: "Agent911",        bundle: "Resilience",      tier: "$19/mo",  command: "agent911",              href: "/docs/agent911/snapshot-explained", desc: "Recovery cockpit. Open this at 2am." },
  { name: "Recall",          bundle: "Resilience",      tier: "$19/mo",  command: "recall status --watch", href: "/docs/recall",           desc: "Manual fleet intervention. Ambient presence awareness." },
  // Access Control — separate from resilience layer
  { name: "SphinxGate",      bundle: "Access Control",  tier: "—",       command: "sphinxgate",            href: "/docs/sphinxgate",       desc: "Policy enforcement. Governs what can run." },
  // Coming soon
  { name: "Transmission",    bundle: "Coming Soon",     tier: "—",       command: "—",                     href: "/docs/transmission",     desc: "Task-aware model routing. Fix the economics." },
];

const BUNDLE_COLOR: Record<string, string> = {
  "Diagnostics":    "#4A9E6B",
  "Operator Bundle":"#7B68EE",
  "Resilience":     "#7B68EE",
  "Access Control": "#4A9E6B",
  "Coming Soon":    "#3A4048",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#1A2028] text-[#E6E6E6]">
      <main>

        {/* ── Full-width diagram hero ── */}
        <div className="w-full border-b border-[#2E3640]">
          <InlineReliabilityStackSvg />
        </div>

        {/* ── Breadcrumb nav strip ── */}
        <div className="border-b border-[#2E3640] bg-[#151C24] px-6 py-3">
          <div className="flex flex-wrap items-center gap-y-2 text-[12px]">
            {/* Root breadcrumb */}
            <Link href="/" className="text-[#4A5E70] hover:text-[#9AA3AD] transition mr-1">Home</Link>
            <span className="text-[#2E3640] mr-1">›</span>
            <span className="text-[#9AA3AD] font-medium mr-3">Products</span>

            {/* Diagnostics group */}
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4A9E6B] mr-2">Diagnostics</span>
            {PRODUCTS.filter(p => p.bundle === "Diagnostics").map((p) => (
              <Link key={p.name} href={p.href} className="text-[#6A7A88] hover:text-[#E6E6E6] transition mr-3">{p.name}</Link>
            ))}

            {/* Separator */}
            <span className="text-[#2A3440] mr-3">|</span>

            {/* Resilience group */}
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D98A2B] mr-2">Resilience</span>
            {PRODUCTS.filter(p => p.bundle === "Operator Bundle" || p.bundle === "Resilience").map((p) => (
              <Link key={p.name} href={p.href} className="text-[#6A7A88] hover:text-[#E6E6E6] transition mr-3">{p.name}</Link>
            ))}

            {/* Separator */}
            <span className="text-[#2A3440] mr-3">|</span>

            {/* Access control */}
            {PRODUCTS.filter(p => p.bundle === "Access Control").map((p) => (
              <Link key={p.name} href={p.href} className="text-[#6A7A88] hover:text-[#E6E6E6] transition mr-3">{p.name}</Link>
            ))}

            {/* Separator */}
            <span className="text-[#2A3440] mr-3">|</span>
            <Link href="/pricing" className="text-[#D98A2B] hover:text-[#C47A22] transition">Pricing</Link>
          </div>
        </div>

        {/* ── Tight product table ── */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">Product Reference</div>
              <h1 className="mt-1 text-[22px] font-semibold text-[#E6E6E6]">All Products</h1>
            </div>
          </div>

          <div className="overflow-hidden rounded-[6px] border border-[#2E3640]">
            {/* Table header */}
            <div className="grid grid-cols-[160px_140px_100px_200px_1fr] gap-0 border-b border-[#2E3640] bg-[#151C24] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#4A5E70]">
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
                className={`grid grid-cols-[160px_140px_100px_200px_1fr] gap-0 border-b border-[#232B34] px-4 py-3 text-[13px] transition last:border-0 ${p.bundle === "Coming Soon" ? "opacity-50" : "hover:bg-[#1E2630]"}`}
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
              { name: "Diagnostics",     price: "Free",    tools: "Triage + RadCheck",                                          color: "#4A9E6B" },
              { name: "Operator Bundle", price: "$29/mo",  tools: "Sentinel + InfraWatch + Watchdog + Lazarus + Agent911 + Recall", color: "#7B68EE" },
              { name: "Access Control",  price: "TBD",     tools: "SphinxGate",                                                 color: "#4A9E6B" },
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
            Operator Bundle — the complete resilience layer — $29/mo. Individual resilience products also available standalone.
          </div>
        </div>
      </main>
    </div>
  );
}
