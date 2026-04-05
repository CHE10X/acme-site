import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — ACME Agent Supply Co.",
  description: "Reliability and diagnostic software for AI agent operators.",
};

const PRODUCTS = [
  // Diagnostics
  { name: "Triage",          bundle: "Diagnostics",     tier: "Free",    command: "triage",                href: "/docs/triage/overview",           desc: "Read-only stack diagnostics. No gateway required." },
  { name: "RadCheck",        bundle: "Diagnostics",     tier: "Free",    command: "radcheck",              href: "/docs/radcheck/score-explained", desc: "0–100 reliability score. Surfaces hidden risk." },
  // Operator Bundle — one resilience layer, sold as a unit
  { name: "Operator Bundle", bundle: "Operator Bundle", tier: "$29/mo",  command: "—",                     href: "/docs/operator-bundle/overview",  desc: "The complete resilience layer. Detection → readiness → recovery, fully wired." },
  // Observability backbone (part of Operator Bundle)
  { name: "Bonfire",         bundle: "Observability",   tier: "Bundle",  command: "bonfire status",        href: "/products/bonfire",               desc: "Watches the thing you forgot to watch." },
  // Standalone resilience products (entry points into the bundle)
  { name: "Sentinel",        bundle: "Resilience",      tier: "$5/mo",   command: "sentinel",              href: "/docs/sentinel/overview",         desc: "Always-on silent failure detection." },
  { name: "Watchdog",        bundle: "Resilience",      tier: "$5/mo",   command: "watchdog",              href: "/docs/watchdog/overview",         desc: "Heartbeat and liveness monitoring." },
  { name: "Lazarus",         bundle: "Resilience",      tier: "$19/mo",  command: "lazarus --simulate",    href: "/docs/lazarus/overview",          desc: "Readiness scan. Confirms recovery is possible before it runs." },
  { name: "Agent911",        bundle: "Resilience",      tier: "$19/mo",  command: "agent911",              href: "/docs/agent911/snapshot-explained", desc: "Recovery cockpit. Open this at 2am." },
  { name: "Recall",          bundle: "Resilience",      tier: "$19/mo",  command: "recall status --watch", href: "/docs/recall/overview",           desc: "Manual fleet intervention. Ambient presence awareness." },
  // Access Control — separate from resilience layer
  { name: "SphinxGate",      bundle: "Access Control",  tier: "—",       command: "—",                     href: "/docs/sphinxgate/overview",       desc: "Access control for model routing. Governs which models run on which workloads." },
  // Routing & Economics
  { name: "Transmission",    bundle: "Routing",         tier: "$29/mo",  command: "pip install acme-transmission", href: "/docs/transmission/overview", desc: "Task-aware model routing. Right model, right cost, every time. Beta." },
];

// Muted palette — matches topology hex marker colors at ~88% opacity over dark bg
const BUNDLE_COLOR: Record<string, string> = {
  "Diagnostics":    "#3D8A5C",
  "Operator Bundle":"#B8782A",
  "Resilience":     "#B8782A",
  "Observability":  "#4A6E8A",
  "Access Control": "#5A7080",
  "Routing":        "#5A7A9E",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#1A2028] text-[#E6E6E6]">
      <main>

        {/* ── ACME Stack diagram hero ── */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-4 pb-0">
          <div className="border border-[#2E3640] rounded-[6px] bg-[#1A2028] overflow-hidden relative" style={{ aspectRatio: "1400/776" }}>
            <iframe
              src="/diagrams/acme-stack-v7.html"
              title="ACME Reliability Stack — product family"
              scrolling="no"
              style={{ width: "100%", height: "100%", border: "none", display: "block", overflow: "hidden", position: "absolute", top: 0, left: 0 }}
              loading="eager"
            />
          </div>
        </div>

        {/* ── Separator between diagram and product table ── */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 mt-2">
          <span className="hazard-shimmer block h-[4px] w-full bg-[repeating-linear-gradient(135deg,rgba(217,138,43,0.5)_0,rgba(217,138,43,0.5)_10px,rgba(21,28,36,0.5)_10px,rgba(21,28,36,0.5)_20px)] bg-[length:24px_24px]" />
        </div>

        {/* ── Product table ── */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-6">
          <div className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] p-5">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">Product Reference</div>
              <h1 className="mt-1 text-[22px] font-semibold text-[#E6E6E6]">All Products</h1>
            </div>
          </div>

          <div className="overflow-hidden rounded-[6px] border border-[#2E3640]">
            {/* Table header */}
            <div className="grid grid-cols-[200px_160px_220px_1fr] gap-0 border-b border-[#2E3640] bg-[#151C24] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#4A5E70]">
              <div>Product</div>
              <div>Layer</div>
              <div>Command</div>
              <div>What it does</div>
            </div>

            {/* Rows */}
            {PRODUCTS.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-[200px_160px_220px_1fr] gap-0 border-b border-[#232B34] px-4 py-3 text-[13px] transition last:border-0 hover:bg-[#1E2630]`}
              >
                <div className="flex items-center">
                  <Link href={p.href} className="font-medium text-[#E6E6E6] hover:text-[#D98A2B] transition">
                    {p.name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-[11px] font-medium" style={{ color: BUNDLE_COLOR[p.bundle] ?? "#9AA3AD" }}>
                    {p.bundle}
                  </span>
                </div>
                <div className="flex items-center font-mono text-[11px] text-[#D98A2B]">{p.command}</div>
                <div className="flex items-center text-[#9AA3AD]">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-[12px] text-[#3A4E60]">
            Pricing → <Link href="/pricing" className="text-[#B8782A] hover:text-[#D98A2B] transition">acmeagentsupply.com/pricing</Link>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
