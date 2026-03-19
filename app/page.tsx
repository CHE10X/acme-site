import Image from "next/image";
import Link from "next/link";
import HRInline from "./components/HRInline";
import ObserveSignalsSection from "./components/home/ObserveSignalsSection";
import OperatorUtilityCards from "./components/home/OperatorUtilityCards";
import OperatorTerrainSection from "./components/home/OperatorTerrainSection";
import TransitionPanelSection from "./components/home/TransitionPanelSection";

const BUNDLES = [
  {
    tier: "Free",
    name: "Diagnostics",
    tools: ["Triage", "RadCheck"],
    color: "#3D8A5C",
    desc: "Start here. Triage captures a read-only proof bundle in seconds. RadCheck scores your stack 0–100. You'll know exactly what's wrong — or that nothing is — before you touch anything.",
    cta: "Run Triage free",
    href: "/docs/triage/overview",
  },
  {
    tier: "$5 / mo",
    name: "Runtime",
    tools: ["Sentinel", "Watchdog"],
    color: "#B8782A",
    desc: "Sentinel watches for silent failures while your agents run. Watchdog tracks heartbeats and catches the loops, double-runs, and stalls that logs don't surface until it's too late.",
    cta: "Add runtime protection",
    href: "/docs/sentinel/overview",
  },
  {
    tier: "$19 / mo",
    name: "Incident Response",
    tools: ["Agent911", "Recall", "Lazarus"],
    color: "#A83E32",
    desc: "When something breaks at 2am, you open Agent911. Recall gives you manual intervention. Lazarus confirms your backups actually restore. Everything you need to recover, in one place.",
    cta: "See Incident Response",
    href: "/docs/agent911/snapshot-explained",
  },
  {
    tier: "$29 / mo",
    name: "Operator Bundle",
    tools: ["Sentinel", "InfraWatch", "Watchdog", "Lazarus", "Agent911", "Recall"],
    color: "#5A7080",
    desc: "The full resilience layer, fully wired. When something breaks, it doesn't wait for you to notice. Detection fires. Readiness confirms. Recovery runs. You get a report.",
    cta: "See the full layer",
    href: "/docs/operator-bundle/overview",
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
            <div className="flex flex-col">
              <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-[#E6E6E6] sm:text-[40px] lg:text-[48px]">
                Lead agents.<br />Get outcomes.
              </h1>
              <p className="mt-4 max-w-xl text-[18px] leading-7 text-[#9AA3AD]">
                Stop managing your stack. Start running missions.
              </p>
              <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#9AA3AD]">
                When your stack is stable, the real work begins. ACME is the infrastructure that gets you there — and the mission control that runs what comes next.
              </p>
              <div className="mt-auto pt-6 flex flex-wrap gap-3">
                <Link
                  href="/docs/octriage/overview"
                  className="inline-flex items-center gap-2 rounded-md bg-[#D98A2B] px-6 py-3 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
                >
                  Get Started
                  <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current shrink-0" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </Link>
                <a
                  href="/stack"
                  className="inline-flex items-center rounded-md border border-[#3A4048] px-6 py-3 text-[15px] text-[#E6E6E6] transition hover:border-[#D98A2B] hover:bg-[#2C3238]"
                >
                  View the Stack
                </a>
              </div>
            </div>

            <aside className="rounded-[6px] border border-[#3A4048] bg-[#161A1E] overflow-hidden">
              <div className="border-b border-[#3A4048] bg-[#1A2028] px-5 py-4">
                <div className="text-[10px] uppercase tracking-[0.36em] text-[#5A6E80]">Operator Touch Surface</div>
                <div className="mt-1 text-[15px] font-semibold text-[#E6E6E6]">Your command layer.</div>
              </div>
              <div className="divide-y divide-[#2A3240]">
                {[
                  { state: "Know", line: "What's running. What's at risk. What changed overnight.", color: "#3D8A5C" },
                  { state: "Protect", line: "Guardrails on. Watchdog live. Nothing goes silent.", color: "#B8782A" },
                  { state: "Recover", line: "Something broke. You have a playbook. Use it.", color: "#A83E32" },
                  { state: "Lead", line: "Stack is stable. Now give your agents something real to do.", color: "#5A7080" },
                ].map((item) => (
                  <div key={item.state} className="flex items-start gap-4 px-5 py-4">
                    <div
                      className="mt-0.5 w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: item.color }}
                    >
                      {item.state}
                    </div>
                    <div className="text-[14px] leading-6 text-[#9AA3AD]">{item.line}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <TransitionPanelSection />

        <OperatorTerrainSection />

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
              Pick your starting point.
            </h2>
            <Link href="/pricing" className="text-[14px] text-[#D98A2B] hover:text-[#C47A22]">
              Full pricing →
            </Link>
          </div>
          <p className="mt-2 text-[15px] text-[#9AA3AD]">
            Start free. Add protection as you need it. No lock-in.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {BUNDLES.map((bundle) => (
              <article
                key={bundle.name}
                className="flex flex-col rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5"
                style={{ borderTopColor: bundle.color, borderTopWidth: "2px" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: bundle.color }}>
                    {bundle.name}
                  </span>
                  <span className="rounded-full border border-[#3A4048] px-2 py-0.5 text-[11px] text-[#9AA3AD]">
                    {bundle.tier}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {bundle.tools.map((tool) => (
                    <span key={tool} className="rounded bg-[#1E2226] px-2 py-0.5 text-[11px] font-mono text-[#9AA3AD]">
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="mt-3 flex-1 text-[14px] leading-6 text-[#9AA3AD]">
                  {bundle.desc}
                </p>
                <Link
                  href={bundle.href}
                  className="mt-4 inline-flex text-[13px] font-medium transition"
                  style={{ color: bundle.color }}
                >
                  {bundle.cta} →
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-[12px] uppercase tracking-[0.28em] text-[#4A9E6B]">Free · Open Source</div>
                <a
                  href="https://github.com/CHE10X/octriageunit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-[#3A4048] bg-[#2C3238] px-2 py-0.5 text-[11px] text-[#9AA3AD] transition hover:border-[#D98A2B] hover:text-[#E6E6E6]"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  GitHub
                </a>
                <span className="text-[11px] text-[#5A6E80]">· SHA-verified install</span>
              </div>
              <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
                Works when OpenClaw doesn&apos;t.
              </h2>
              <p className="mt-3 text-[16px] leading-7 text-[#9AA3AD]">
                When your gateway is degraded, <code className="text-[#D98A2B]">openclaw doctor</code> can&apos;t answer — it&apos;s asking the sick system what&apos;s wrong. Triage reads directly from the filesystem. No gateway required. Run it when the system itself is the suspect.
              </p>
              <p className="mt-3 text-[15px] leading-6 text-[#9AA3AD]">
                And it doesn&apos;t just confirm broken things. <code className="text-[#D98A2B]">protection_state AT_RISK</code> means Triage caught a risk condition before anything failed. That&apos;s the part worth seeing.
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { label: "STATUS", value: "HEALTHY", color: "#4A9E6B" },
                  { label: "reliability_score", value: "83", color: "#D98A2B" },
                  { label: "protection_state", value: "AT_RISK", color: "#C0392B" },
                  { label: "sessions", value: "17 active, 0 orphan", color: "#9AA3AD" },
                  { label: "runtime alerts", value: "72,833 captured", color: "#9AA3AD" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-3 rounded bg-[#161A1E] px-4 py-2.5 font-mono text-[13px]">
                    <span className="text-[#5A6E80]">{row.label}</span>
                    <span style={{ color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/docs/triage/overview"
                className="mt-6 inline-flex items-center rounded-md bg-[#D98A2B] px-6 py-3 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
              >
                Install Triage — free
              </Link>
            </div>

            {/* Screenshot — angled pop */}
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4">
              <div
                className="overflow-hidden rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
                style={{ transform: "rotate(5deg)", transformOrigin: "top center", maxWidth: "400px" }}
              >
                <Image
                  src="/images/triage-output.png"
                  alt="Triage output showing system health, reliability score, and protection state"
                  width={400}
                  height={316}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-6 max-w-[280px] text-center text-[13px] leading-5 text-[#5A6E80]">
                Read-only. Nothing changes. GPG-verified install.
              </p>
            </div>
          </div>
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
              "Run triage",
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

triage`}
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
            href="/docs/triage/overview"
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
