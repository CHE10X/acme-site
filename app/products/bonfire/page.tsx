import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bonfire — ACME Agent Supply Co.",
  description:
    "The failure that brings your agent stack down won't be the one you were monitoring. Bonfire watches the rest.",
};

const CAPABILITIES = [
  {
    heading: "Token event streams",
    detail:
      "Bonfire writes real-time telemetry to bonfire_tokens.jsonl as every model call completes — counts, efficiency ratios, model used, latency. No dollar values. What you actually know, not an approximation.",
  },
  {
    heading: "Health snapshots",
    detail:
      "bonfire_health.json is updated continuously. Agent911 reads it directly. Transmission's governor checks it before every model dispatch. The rest of your reliability stack reads Bonfire — not the other way around.",
  },
  {
    heading: "Alert history",
    detail:
      "bonfire_alerts.log records threshold crossings with timestamps. Not a dashboard. A file. Grep it, tail it, pipe it. Works in any environment.",
  },
  {
    heading: "Governor preflight (live)",
    detail:
      "Since 2026-03-18, Transmission's router calls Bonfire's token_governor.py before every model dispatch. Budget and lane policy enforcement is real-time, not retrospective. Bonfire stops the expensive call before it happens.",
  },
  {
    heading: "REB consumer",
    detail:
      "Bonfire receives events from the Resilience Event Bus and routes them to Commander and Quartermaster. Your governance layer sees what happened without you relaying it manually.",
  },
];

export default function BonfireProductPage() {
  return (
    <div className="min-h-screen bg-[#1A2028] text-[#E6E6E6]">
      <main className="mx-auto max-w-4xl px-6 py-12 space-y-6">

        {/* Hero */}
        <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-7">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B] mb-2">
            Observability
          </div>
          <h1 className="text-[28px] font-semibold text-[#E6E6E6] tracking-tight">
            Bonfire
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#C8D4E0] font-medium">
            The failure that brings your agent stack down won't be the one you were monitoring.
            Bonfire watches the rest.
          </p>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#9AA3AD]">
            Your dashboards say green. Bonfire is already watching the thing you haven't checked —
            the silent accumulation, the single-provider dependency, the agent that hasn't emitted
            a token event in three hours. Bonfire is the telemetry layer the rest of your reliability
            stack reads. It runs without your attention so you can focus yours.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/docs/bonfire/overview"
              className="inline-flex items-center rounded bg-[#D98A2B] px-4 py-2 text-[13px] font-medium text-[#1A2028] hover:bg-[#C47A22] transition"
            >
              Docs →
            </Link>
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
              <div key={c.heading} className="grid grid-cols-[220px_1fr] gap-6 py-4">
                <div className="text-[13px] font-medium text-[#C8D4E0]">{c.heading}</div>
                <div className="text-[13px] text-[#7A8EA0] leading-5">{c.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What Bonfire is NOT */}
        <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-6">
          <h2 className="text-[14px] uppercase tracking-[0.3em] text-[#5A7080] mb-4">What Bonfire is not</h2>
          <ul className="space-y-2 text-[13px] text-[#7A8EA0] leading-6">
            <li>
              <span className="text-[#C8D4E0] font-medium">Not a cost estimator.</span>{" "}
              Bonfire reports token counts and efficiency ratios. Dollar values depend on your actual
              per-token rate, which varies by contract. Use <code className="text-[#D98A2B] bg-[#151C24] px-1 rounded text-[11px]">operator_rates</code> to configure your own cost view.
            </li>
            <li>
              <span className="text-[#C8D4E0] font-medium">Not a dashboard.</span>{" "}
              Bonfire is a file-based telemetry system. The outputs are structured JSONL and log files
              that other tools read. Agent911, Transmission, and Quartermaster read Bonfire. Not the
              other way around.
            </li>
            <li>
              <span className="text-[#C8D4E0] font-medium">Not a standalone product.</span>{" "}
              Bonfire ships as part of the Operator Bundle. It's the telemetry backbone that makes the
              rest of the resilience layer intelligent.
            </li>
          </ul>
        </section>

        {/* Bundled with */}
        <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-6">
          <h2 className="text-[14px] uppercase tracking-[0.3em] text-[#5A7080] mb-4">Included in</h2>
          <p className="text-[13px] text-[#7A8EA0] mb-4">
            Bonfire is part of the{" "}
            <Link href="/products/operator-bundle" className="text-[#D98A2B] hover:underline">
              Operator Bundle
            </Link>{" "}
            — the complete resilience layer. Detection → Readiness → Recovery, fully wired.
          </p>
          <pre className="overflow-x-auto rounded border border-[#2A3240] bg-[#151C24] px-4 py-3 text-[12px] text-[#D98A2B] font-mono">
            <code>bonfire status</code>
          </pre>
          <p className="mt-3 text-[12px] text-[#4A5E70]">
            Confirm REB events are flowing. Run this after bundle install.
          </p>
        </section>

        {/* Footer links */}
        <div className="flex flex-wrap items-center gap-5 pt-1 text-[12px]">
          <Link href="/trust" className="text-[#5A7080] hover:text-[#D98A2B] transition">
            Trust &amp; Transparency →
          </Link>
          <Link href="/products" className="text-[#5A7080] hover:text-[#D98A2B] transition">
            ← All Products
          </Link>
        </div>

      </main>
    </div>
  );
}
