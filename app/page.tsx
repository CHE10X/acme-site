import Image from "next/image";
import Link from "next/link";

const STACK_BLOCKS = [
  {
    title: "Memory Integrity",
    stack: "Elixir / DriftGuard",
    desc: "Maintains agent memory health and prevents silent drift.",
  },
  {
    title: "Runtime Hygiene",
    stack: "Watchdog / Sentinel",
    desc: "Continuously monitors runtime behavior and detects anomalies.",
  },
  {
    title: "Observe Layer",
    stack: "FindMyAgent / RadCheck / Observe",
    desc: "Aggregates signals across the runtime.",
  },
  {
    title: "Recovery Layer",
    stack: "ORP / Agent911 / Lazarus",
    desc: "Provides deterministic recovery when failures occur.",
  },
];

const OBSERVE_SIGNALS = [
  "Agent topology",
  "Agent activity rate",
  "Runtime alerts",
  "Reliability score",
  "Protection events",
];

const STORIES = [
  "Agent system recovered from memory drift.",
  "Gateway stall detected before cascading failure.",
  "Reliability score improved from 46 → 74 in 24 hours.",
];

export default function Home() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-100 sm:text-5xl">
            OpenClaw
            <span className="block text-2xl font-medium text-zinc-300 sm:text-3xl">
              Reliability Infrastructure for AI Agent Systems
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-300">
            Observe agent fleets.
            <br />
            Detect failures early.
            <br />
            Recover deterministically.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs/octriage/overview"
              className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
            >
              Install OCTriage
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              View the Reliability Stack
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">
            OpenClaw helps operators detect silent failures, understand agent
            behavior, and recover systems deterministically.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/80">
            <Image
              src="/diagrams/openclaw-reliability-stack.svg"
              alt="Layered diagram of the OpenClaw reliability stack showing runtime, memory integrity, monitoring, diagnostics, and recovery."
              width={1400}
              height={1000}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            The OpenClaw Reliability Stack
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_BLOCKS.map((block) => (
              <article
                key={block.title}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4"
              >
                <h3 className="text-base font-medium text-zinc-100">
                  {block.title}
                </h3>
                <div className="mt-1 text-sm font-mono text-amber-300">
                  {block.stack}
                </div>
                <p className="mt-2 text-sm text-zinc-300">{block.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Console
          </h2>
          <p className="mt-3 text-zinc-300">
            Operators run OCTriage and <code>octriage -watch</code> to
            immediately understand system state.
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
            Start with OCTriage
          </h2>
          <p className="mt-3 text-zinc-300">
            OCTriage is the platform entry point: system diagnostics,
            reliability scoring, observe signals, and proof bundles.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-200">
{`curl https://openclaw.ai/install.sh | bash

octriage`}
          </pre>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Install OCTriage
          </Link>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Observe Layer
          </h2>
          <p className="mt-3 text-zinc-300">
            OpenClaw telemetry exposes the operator signals that feed both the
            CLI console and the future fleet control plane.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {OBSERVE_SIGNALS.map((signal) => (
              <li
                key={signal}
                className="rounded-lg border border-zinc-800/80 bg-zinc-900/55 px-3 py-2 text-sm text-zinc-300"
              >
                {signal}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Protection &amp; Recovery
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Most monitoring tools detect problems. OpenClaw ensures
            deterministic recovery with ORP, Agent911 verification, and Lazarus
            recovery simulation.
          </p>
          <div className="mt-4 rounded-xl border border-zinc-800/80 bg-zinc-900/55 px-4 py-3 text-sm text-zinc-200">
            Detect → Classify → Recover → Verify
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Utilities
          </h2>
          <p className="mt-3 text-zinc-300">
            Supporting utilities used in OpenClaw environments.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              "OCTriage",
              "RadCheck",
              "FindMyAgent",
            ].map((utility) => (
              <div
                key={utility}
                className="rounded-lg border border-zinc-800/80 bg-zinc-900/55 px-3 py-2 text-sm text-zinc-200"
              >
                {utility}
              </div>
            ))}
          </div>
          <Link
            href="/bot-shop"
            className="mt-4 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Explore Operator Utilities
          </Link>
        </section>

        <section className="rounded-2xl border border-dashed border-zinc-700/80 bg-zinc-900/25 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            OpenClaw Control Plane (Coming Soon)
          </h2>
          <p className="mt-3 text-zinc-300">
            Fleet monitoring, reliability trends, and node visibility.
          </p>
          <div className="mt-4 h-24 rounded-xl border border-dashed border-zinc-700/70 bg-zinc-900/35" />
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Stories
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {STORIES.map((story) => (
              <article
                key={story}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4 text-sm text-zinc-300"
              >
                {story}
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Install Flow
          </h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-zinc-300">
            <li>Install OCTriage</li>
            <li>Run octriage</li>
            <li>View system reliability state</li>
          </ol>
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
            Documentation
          </h2>
          <p className="mt-3 text-zinc-300">
            Architecture references, diagnostics, and recovery workflows.
          </p>
          <Link
            href="/docs"
            className="mt-4 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Read the Docs
          </Link>
        </section>
      </div>
    </main>
  );
}
