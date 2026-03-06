import Image from "next/image";
import Link from "next/link";
import ObserveSignalsSection from "./components/home/ObserveSignalsSection";
import OperatorUtilityCards from "./components/home/OperatorUtilityCards";
import { FIELD_DEVELOPMENT_CARDS } from "./components/home/homeData";

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
          <div className="mb-4 flex items-center gap-4 border-b border-zinc-800/80 pb-4">
            <Image
              src="/brand/acme-logo.png"
              alt="ACME"
              width={220}
              height={88}
              className="h-14 w-auto opacity-90"
              priority
            />
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Field Supply Division
            </div>
          </div>

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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">
                Operational Ritual
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                Run OCTriage first, confirm protection state, then decide if ORP
                recovery workflow is required.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">
                Runtime Visibility
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                `octriage -watch` keeps reliability signals visible during live
                operations.
              </p>
            </div>
          </div>
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">
                Install in Minutes
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                Deterministic install with read-safe defaults and immediate
                operator visibility.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4">
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">
                Evidence First
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                Start every support event with OCTriage output, proof bundle
                path, and ORP report context.
              </p>
            </div>
          </div>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Install OCTriage
          </Link>
        </section>

        <ObserveSignalsSection signals={OBSERVE_SIGNALS} />

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
          <div className="mt-4">
            <OperatorUtilityCards />
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
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {FIELD_DEVELOPMENT_CARDS.map((card) => (
              <article
                key={card.id}
                className="rounded-xl border border-zinc-800/70 bg-zinc-900/45 p-4"
              >
                <h3 className="text-base font-medium text-zinc-100">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-300">{card.subtitle}</p>
                <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
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
