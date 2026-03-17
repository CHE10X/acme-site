import Link from "next/link";

export default function PlatformPage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
            The Problem
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            AI agent systems often fail silently: stalled agents, corrupted
            memory, invisible failures, and cascading instability can emerge
            before obvious alarms.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            The OpenClaw Reliability Model
          </h2>
          <p className="mt-3 text-zinc-300">
            The canonical architecture diagram is maintained in docs and serves
            as the single reference for layered reliability flow.
          </p>
          <Link
            href="/docs"
            className="mt-4 inline-flex items-center text-sm text-amber-300 transition hover:text-amber-200"
          >
            View the OpenClaw Reliability Stack →
          </Link>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Memory Integrity
          </h2>
          <p className="mt-3 text-zinc-300">
            <span className="font-mono text-amber-300">Elixir</span> and{" "}
            <span className="font-mono text-amber-300">DriftGuard</span> keep
            memory state coherent across compaction pressure and runtime churn,
            reducing drift and rehydration instability.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Runtime Hygiene
          </h2>
          <p className="mt-3 text-zinc-300">
            <span className="font-mono text-amber-300">Watchdog</span> and{" "}
            <span className="font-mono text-amber-300">Sentinel</span> monitor
            runtime health continuously, detecting stalls and anomalies before
            they propagate.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Observe Layer
          </h2>
          <p className="mt-3 text-zinc-300">
            <span className="font-mono text-amber-300">FindMyAgent</span>,{" "}
            <span className="font-mono text-amber-300">RadCheck</span>, and the
            Observe aggregator expose reliability scoring and system signals for
            rapid operator classification.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Recovery Layer
          </h2>
          <p className="mt-3 text-zinc-300">
            <span className="font-mono text-amber-300">ORP</span>,{" "}
            <span className="font-mono text-amber-300">Agent911</span>, and{" "}
            <span className="font-mono text-amber-300">Lazarus</span> perform
            deterministic recovery operations and readiness verification.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Surface
          </h2>
          <p className="mt-3 text-zinc-300">
            Operators use Triage and <code>octriage -watch</code> for immediate
            state visibility.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-200">
{`OpenClaw System Triage
STATUS: HEALTHY
reliability_score: 87
trend_24h: +3
protection_state: ACTIVE`}
          </pre>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Platform Philosophy
          </h2>
          <p className="mt-3 text-zinc-300">
            OpenClaw operates as a closed reliability loop:
            <span className="ml-2 font-medium text-zinc-100">
              Observe → Protect → Recover
            </span>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Workflow
          </h2>
          <p className="mt-3 text-sm text-zinc-300">Morning workflow</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-300">
            <li>run octriage</li>
            <li>review reliability score</li>
            <li>confirm protection state</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Install
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-200">
{`curl https://openclaw.ai/install.sh | bash`}
          </pre>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Install Triage
          </Link>
        </section>
      </div>
    </main>
  );
}
