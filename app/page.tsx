import Image from "next/image";
import Link from "next/link";

const STACK_OVERVIEW = [
  {
    title: "Memory Integrity",
    body: "Elixir / DriftGuard maintains agent memory health.",
  },
  {
    title: "Runtime Hygiene",
    body: "Watchdog / Sentinel detects runtime anomalies.",
  },
  {
    title: "Observe",
    body: "FindMyAgent / RadCheck aggregates system signals.",
  },
  {
    title: "Recover",
    body: "ORP / Agent911 / Lazarus executes deterministic recovery.",
  },
];

const UTILITIES = ["OCTriage", "RadCheck", "FindMyAgent"];

const SIGNALS = [
  "Agent topology",
  "Agent activity rate",
  "Runtime alerts",
  "Reliability score",
  "Protection events",
];

const STORIES = [
  "Agent system recovered from memory drift.",
  "Gateway stall detected before failure.",
  "Reliability improved from 46 → 74 in 24 hours.",
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
            Observe agent fleets
            <br />
            Detect failures early
            <br />
            Recover deterministically
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
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            <Link href="/platform" className="hover:text-amber-300">
              The OpenClaw Reliability Stack
            </Link>
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
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_OVERVIEW.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4"
              >
                <h3 className="text-base font-medium text-zinc-100">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Console
          </h2>
          <p className="mt-3 text-zinc-300">
            Operators run OCTriage to understand system state instantly.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-200">
{`OpenClaw System Triage

STATUS: HEALTHY
reliability_score: 87
trend_24h: +3
protection_state: ACTIVE`}
          </pre>
          <p className="mt-3 text-sm text-zinc-300">
            Run OCTriage to see system reliability, agent activity, protection
            status, and recovery readiness.
          </p>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Install OCTriage
          </Link>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Observe Your Agent System
          </h2>
          <p className="mt-3 text-zinc-300">
            OpenClaw surfaces the signals operators need to understand system
            behavior.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-zinc-300">
            {SIGNALS.map((signal) => (
              <li
                key={signal}
                className="rounded-lg border border-zinc-800/70 bg-zinc-900/55 px-3 py-2"
              >
                {signal}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Detect → Classify → Recover → Verify
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Most platforms detect failures. OpenClaw recovers from them through
            ORP, Agent911, and Lazarus with deterministic workflow gates.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-4 text-sm text-zinc-200">
            {["Detect", "Classify", "Recover", "Verify"].map((step) => (
              <div
                key={step}
                className="rounded-lg border border-zinc-800 bg-zinc-900/55 px-3 py-2"
              >
                {step}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Start with OCTriage
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-4 text-sm text-zinc-200">
{`curl https://openclaw.ai/install.sh | bash

octriage`}
          </pre>
          <p className="mt-3 text-sm text-zinc-300">
            Instant system diagnostics, reliability scoring, and proof bundles.
          </p>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Install OCTriage
          </Link>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Operator Utilities
          </h2>
          <p className="mt-3 text-zinc-300">
            Tools and utilities for OpenClaw environments.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {UTILITIES.map((tool) => (
              <div
                key={tool}
                className="rounded-lg border border-zinc-800 bg-zinc-900/55 px-3 py-2 text-sm text-zinc-200"
              >
                {tool}
              </div>
            ))}
          </div>
          <Link
            href="/bot-shop"
            className="mt-4 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Explore utilities
          </Link>
        </section>

        <section className="rounded-2xl border border-dashed border-zinc-700/80 bg-zinc-900/25 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            OpenClaw Control Plane (Coming Soon)
          </h2>
          <p className="mt-3 text-zinc-300">
            Fleet visibility, reliability trends, and system protection state in
            a single operator surface.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Field Reports
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
            Architecture, diagnostics, and recovery workflows.
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
