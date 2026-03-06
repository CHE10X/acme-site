import Image from "next/image";
import Link from "next/link";

const MODEL_BLOCKS = [
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
    desc: "Aggregates signals from across the runtime.",
  },
  {
    title: "Recovery Layer",
    stack: "ORP / Agent911 / Lazarus",
    desc: "Deterministic recovery when failures occur.",
  },
];

export default function PlatformPage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
            The Problem
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            AI agent systems fail silently: stalled agents, memory corruption,
            invisible runtime failures, and cascading instability often appear
            before obvious alerts.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            The OpenClaw Reliability Model
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/80">
            <Image
              src="/diagrams/openclaw-reliability-stack.svg"
              alt="Layered diagram of the OpenClaw reliability stack showing runtime, memory integrity, monitoring, diagnostics, and recovery."
              width={1400}
              height={1000}
              className="h-auto w-full"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {MODEL_BLOCKS.map((block) => (
              <article
                key={block.title}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4"
              >
                <h3 className="text-lg font-medium text-zinc-100">{block.title}</h3>
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
            Operator Surface
          </h2>
          <p className="mt-2 text-zinc-300">
            OCTriage and <code className="text-amber-300">octriage -watch</code>{" "}
            give operators an immediate system read.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-200">
{`OpenClaw System Triage
STATUS: HEALTHY
reliability_score: 87
trend_24h: +3
protection_state: ACTIVE`}
          </pre>
          <p className="mt-3 text-sm text-zinc-300">
            Operators run OCTriage to see system health instantly.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Platform Philosophy
          </h2>
          <p className="mt-3 text-zinc-300">
            OpenClaw operates as a technical reliability loop:
            <span className="ml-2 font-medium text-zinc-100">
              Observe → Detect → Classify → Recover → Verify
            </span>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Install OCTriage
          </h2>
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
            Operator Workflow
          </h2>
          <p className="mt-3 text-sm text-zinc-300">Morning check</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-300">
            <li>run octriage</li>
            <li>review reliability score</li>
            <li>confirm protection state</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
