import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "First Response — ACME Agent Supply Co.",
  description: "Operator-first guidance when something feels off.",
};

export default function FirstResponsePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <h1 className="text-3xl font-bold text-zinc-100">First Response</h1>
          <p className="mt-2 text-zinc-400">
            Start here when something feels off.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <p className="max-w-2xl text-base leading-7 text-zinc-300">
            When systems behave unpredictably, the first step is to observe -
            not change. OpenClaw Triage Unit is a read-only diagnostic designed
            to safely surface what&apos;s happening inside your environment.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">
            Recommended action
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-100">
            OpenClaw Triage Unit
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            Read-only diagnostics. No telemetry. No config changes.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/products/octriageunit"
              className="inline-flex items-center rounded-lg border border-amber-400 bg-amber-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-300"
            >
              Run triage
            </Link>
          </div>
        </section>

        <section className="mt-6 px-1">
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>• Read-only execution</li>
            <li>• Deterministic proof bundle</li>
            <li>• Safe under degraded conditions</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
