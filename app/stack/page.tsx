import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Stack — ACME Agent Supply Co.",
  description: "The ACME reliability stack — v1 launch products, v2 expansion, and the full vision. See what's live, what's coming, and how it all connects.",
};

export default function StackPage() {
  return (
    <main className="bg-[#1A2028] min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#5A6E80] mb-2">
          ACME Agent Supply Co.
        </p>
        <h1 className="text-[32px] font-semibold text-[#E0E8F0] tracking-tight">
          The Product Stack
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] text-[#9AA3AD] leading-7">
          What&apos;s live in v1. What&apos;s coming in v2. How the full reliability layer connects.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#v1"
            className="inline-flex items-center rounded-md bg-[#D98A2B] px-5 py-2.5 text-[14px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
          >
            v1 Launch ↓
          </a>
          <a
            href="/products"
            className="inline-flex items-center rounded-md border border-[#3A4048] px-5 py-2.5 text-[14px] text-[#E6E6E6] transition hover:border-[#D98A2B]"
          >
            Browse Products →
          </a>
        </div>
      </div>

      {/* Diagram — full width */}
      <div id="v1" className="w-full">
        <iframe
          src="/diagrams/operator-system-view-v6.html"
          title="ACME Product Stack — v1 Launch"
          className="w-full border-0"
          style={{ height: "820px", display: "block" }}
          loading="lazy"
        />
      </div>

      {/* What's in v1 */}
      <div className="mx-auto max-w-5xl px-6 py-12 border-t border-[#2E363E]">
        <h2 className="text-[20px] font-semibold text-[#C8D4E0] mb-6">v1 — Live now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Triage", desc: "First-response diagnostics. Free. Works when OpenClaw doesn't.", href: "/docs/octriage/overview", badge: "free" },
            { name: "RadCheck", desc: "Reliability scoring 0–100. Read-only.", href: "/docs/radcheck/score-explained", badge: "free" },
            { name: "Sentinel", desc: "Continuous silent failure detection.", href: "/docs/sentinel/overview", badge: "$5/mo" },
            { name: "Watchdog", desc: "Heartbeat and liveness monitoring.", href: "/docs/watchdog/overview", badge: "$5/mo" },
            { name: "Lazarus", desc: "Recovery readiness verification. Included with Agent911.", href: "/docs/lazarus/overview", badge: "included" },
            { name: "Agent911", desc: "Recovery cockpit. The 2am tool.", href: "/docs/agent911/snapshot-explained", badge: "$19/mo" },
            { name: "Recall", desc: "Manual fleet intervention surface.", href: "/docs/recall/overview", badge: "$19/mo" },
            { name: "SphinxGate", desc: "Access control for model routing.", href: "/docs/sphinxgate/overview", badge: "TBD" },
            { name: "Operator Bundle", desc: "The full wired resilience layer. Detection → Readiness → Recovery.", href: "/docs/operator-bundle/overview", badge: "$29/mo" },
          ].map((p) => (
            <a
              key={p.name}
              href={p.href}
              className="group block rounded-lg border border-[#3A4048] bg-[#1E2630] p-4 transition hover:border-[#D98A2B]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[15px] font-medium text-[#E6E6E6] group-hover:text-[#D98A2B] transition">{p.name}</span>
                <span className="shrink-0 rounded px-2 py-0.5 text-[11px] font-medium bg-[#252C32] text-[#9AA3AD]">{p.badge}</span>
              </div>
              <p className="mt-2 text-[13px] text-[#7A8EA0] leading-5">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Coming soon */}
      <div className="mx-auto max-w-5xl px-6 py-8 border-t border-[#2E363E]">
        <h2 className="text-[20px] font-semibold text-[#C8D4E0] mb-2">Coming in v2</h2>
        <p className="text-[14px] text-[#9AA3AD] mb-6">
          Callsign, Transmission, Quartermaster, Commander, and the Briefing Room.
          The intelligence layer that runs on top of the reliability foundation.
        </p>
        <a
          href="/docs/transmission/overview"
          className="inline-flex items-center text-[14px] text-[#D98A2B] hover:underline"
        >
          Transmission — patent-pending model routing → learn more
        </a>
      </div>

    </main>
  );
}
