import Image from "next/image";
import Link from "next/link";
import HRInline from "./components/HRInline";
import ObserveSignalsSection from "./components/home/ObserveSignalsSection";
import OperatorUtilityCards from "./components/home/OperatorUtilityCards";
import OperatorTerrainSection from "./components/home/OperatorTerrainSection";
import TransitionPanelSection from "./components/home/TransitionPanelSection";

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
  {
    title: "Memory Drift Recovered",
    detail: "Agent system recovered from memory drift before cascading impact.",
    metric: "MTTR: 11m",
  },
  {
    title: "Gateway Stall Prevented",
    detail: "Gateway stall detected and classified before downstream failure.",
    metric: "Incident scope: constrained",
  },
  {
    title: "Reliability Lift",
    detail: "Reliability score improved after deterministic recovery workflow.",
    metric: "46 → 74 in 24h",
  },
];

export default function Home() {
  return (
    <main className="bg-[#1E2226] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[1100px] space-y-8">
        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <div className="mb-4 flex items-center gap-4 border-b border-[#3A4048] pb-4">
            <Image
              src="/brand/acme-logo.png"
              alt="ACME"
              width={220}
              height={88}
              className="h-14 w-auto opacity-90"
              priority
            />
            <div className="text-[13px] uppercase tracking-[0.3em] text-[#9AA3AD]">
              Field Supply Division
            </div>
            <div className="ml-auto">
              <HRInline />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-[#E6E6E6] sm:text-[40px] lg:text-[48px]">
                OpenClaw
              </h1>
              <p className="mt-2 text-[22px] font-medium text-[#9AA3AD]">
                Reliability Infrastructure for AI Agent Systems
              </p>
              <p className="mt-4 max-w-xl text-[18px] leading-8 text-[#E6E6E6]">
                Observe agent fleets.
                <br />
                Detect failures early.
                <br />
                Recover deterministically.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/docs/octriage/overview"
                  className="inline-flex items-center rounded-md bg-[#D98A2B] px-6 py-3 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
                >
                  Install Triage
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center rounded-md border border-[#3A4048] px-6 py-3 text-[15px] text-[#E6E6E6] transition hover:border-[#D98A2B] hover:bg-[#2C3238]"
                >
                  View the Reliability Stack
                </Link>
              </div>
              <p className="mt-4 max-w-2xl text-[18px] leading-8 text-[#9AA3AD]">
                OpenClaw helps operators detect silent failures, understand
                agent behavior, and recover systems deterministically.
              </p>
            </div>

            <aside className="rounded-md border border-[#3A4048] bg-[#161A1E] p-5">
              <div className="text-[13px] uppercase tracking-[0.24em] text-[#9AA3AD]">
                Triage Preview
              </div>
              <pre className="mt-3 overflow-x-auto text-[16px] leading-7 text-[#E6E6E6]">
{`STATUS: HEALTHY
Reliability: 87
Protection: ACTIVE`}
              </pre>
            </aside>
          </div>
        </section>

        <TransitionPanelSection />

        <OperatorTerrainSection />

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            Reliability Stack Overview
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_BLOCKS.map((block) => (
              <article
                key={block.title}
                className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5"
              >
                <h3 className="text-[22px] font-medium text-[#E6E6E6]">
                  {block.title}
                </h3>
                <div className="mt-1 text-[16px] font-mono text-[#D98A2B]">
                  {block.stack}
                </div>
                <p className="mt-2 text-[16px] leading-7 text-[#E6E6E6]">{block.desc}</p>
              </article>
            ))}
          </div>
          <Link
            href="/docs"
            className="mt-5 inline-flex text-[16px] text-[#D98A2B] hover:text-[#C47A22]"
          >
            View the full Reliability Stack →
          </Link>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            Operator Console (Triage)
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-[#E6E6E6]">
            Operators run Triage and <code>octriage -watch</code> to
            immediately understand system state.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md bg-[#161A1E] px-6 py-5 text-[16px] leading-7 text-[#E6E6E6]">
{`OpenClaw System Triage
STATUS: HEALTHY
reliability_score: 87
trend_24h: +3
protection_state: ACTIVE`}
          </pre>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-[#3A4048] bg-[#2C3238] p-5">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Operational Ritual
              </div>
              <p className="mt-2 text-[16px] leading-7 text-[#E6E6E6]">
                Run Triage first, confirm protection state, then decide if ORP
                recovery workflow is required.
              </p>
            </div>
            <div className="rounded-md border border-[#3A4048] bg-[#2C3238] p-5">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Runtime Visibility
              </div>
              <p className="mt-2 text-[16px] leading-7 text-[#E6E6E6]">
                <code>octriage -watch</code> keeps reliability signals visible
                during live operations.
              </p>
            </div>
          </div>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-md bg-[#D98A2B] px-6 py-3 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
          >
            Install Triage
          </Link>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            Start with Triage
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-[#E6E6E6]">
            Triage is the platform entry point: system diagnostics,
            reliability scoring, observe signals, and proof bundles.
          </p>
          <p className="mt-3 text-[16px] text-[#9AA3AD]">
            Run Triage to understand system health in seconds.
          </p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "Install Triage",
              "Run octriage",
              "View system reliability state",
            ].map((step, index) => (
              <li
                key={step}
                className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] px-4 py-3 text-[16px] text-[#E6E6E6]"
              >
                {index + 1}. {step}
              </li>
            ))}
          </ol>
          <pre className="mt-4 overflow-x-auto rounded-md bg-[#161A1E] px-6 py-5 text-[16px] leading-7 text-[#E6E6E6]">
{`curl https://openclaw.ai/install.sh | bash

octriage`}
          </pre>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-[#3A4048] bg-[#2C3238] p-5">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Install in Minutes
              </div>
              <p className="mt-2 text-[16px] leading-7 text-[#E6E6E6]">
                Deterministic install with read-safe defaults and immediate
                operator visibility.
              </p>
            </div>
            <div className="rounded-md border border-[#3A4048] bg-[#2C3238] p-5">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Evidence First
              </div>
              <p className="mt-2 text-[16px] leading-7 text-[#E6E6E6]">
                Start every support event with Triage output, proof bundle
                path, and ORP report context.
              </p>
            </div>
          </div>
          <Link
            href="/docs/octriage/overview"
            className="mt-4 inline-flex items-center rounded-md bg-[#D98A2B] px-6 py-3 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
          >
            Install Triage
          </Link>
        </section>

        <ObserveSignalsSection signals={OBSERVE_SIGNALS} />

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            When Something Breaks
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#9AA3AD]">
            Most tools tell you something broke. OpenClaw tells you what to do about it — in order, with evidence, without guessing.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              {
                name: "ORP",
                label: "Recovery Protocol",
                desc: "Sequences recovery correctly every time. Evidence first, then diagnosis, then action. The order is mandatory because skipping steps is how recoveries fail.",
              },
              {
                name: "Agent911",
                label: "Recovery Cockpit",
                desc: "Your incident command surface. Health signals, anomaly classification, routing status — and structured guidance on what to do next. Open this at 2am.",
              },
              {
                name: "Lazarus",
                label: "Backup Readiness",
                desc: "Verifies your backups actually work before an incident forces the test. Most operators discover their backup posture is wrong during recovery. Lazarus finds out first.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5"
              >
                <div className="text-[13px] uppercase tracking-[0.28em] text-[#D98A2B]">
                  {item.name}
                </div>
                <div className="mt-1 text-[15px] font-medium text-[#E6E6E6]">
                  {item.label}
                </div>
                <p className="mt-2 text-[14px] leading-6 text-[#9AA3AD]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            Operator Utilities
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-[#E6E6E6]">
            Supporting utilities used in OpenClaw environments.
          </p>
          <div className="mt-4">
            <OperatorUtilityCards />
          </div>
          <Link
            href="/bot-shop"
            className="mt-4 inline-flex items-center rounded-md border border-[#3A4048] px-6 py-3 text-[15px] text-[#E6E6E6] transition hover:border-[#D98A2B] hover:bg-[#2C3238]"
          >
            Explore Operator Utilities
          </Link>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            Operator Stories
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {STORIES.map((story) => (
              <article
                key={story.title}
                className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5"
              >
                <h3 className="text-[22px] font-medium text-[#E6E6E6]">{story.title}</h3>
                <p className="mt-2 text-[16px] leading-7 text-[#E6E6E6]">{story.detail}</p>
                <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-[#9AA3AD]">
                  {story.metric}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            Start Here
          </h2>
          <p className="mt-3 text-[16px] leading-7 text-[#9AA3AD]">
            Architecture references, install guides, and recovery workflows — everything you need to get running.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Docs", href: "/docs" },
              { label: "Install Guide", href: "/install" },
              {
                label: "Reliability Stack",
                href: "/docs/architecture/reliability-stack",
              },
              { label: "Support", href: "/support" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center rounded-md border border-[#3A4048] px-6 py-3 text-[15px] text-[#E6E6E6] transition hover:border-[#D98A2B] hover:bg-[#2C3238]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
