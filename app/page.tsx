import Image from "next/image";
import Link from "next/link";
import HRInline from "./components/HRInline";
import ObserveSignalsSection from "./components/home/ObserveSignalsSection";
import OperatorTerrainSection from "./components/home/OperatorTerrainSection";
import TransitionPanelSection from "./components/home/TransitionPanelSection";

const BUNDLES = [
  {
    tier: "Free",
    name: "Diagnostics",
    tools: ["Triage", "RadCheck"],
    color: "#3D8A5C",
    desc: "Start here. Triage diagnoses your stack. RadCheck scores it 0–100.",
    cta: "Run Triage free",
    href: "/docs/triage/overview",
  },
  {
    tier: "$5 / mo",
    name: "Runtime",
    tools: ["Sentinel", "Watchdog"],
    color: "#B8782A",
    desc: "Sentinel watches for silent failures. Watchdog catches loops, stalls, and double-runs.",
    cta: "Add runtime protection",
    href: "/docs/sentinel/overview",
  },
  {
    tier: "$19 / mo",
    name: "Incident Response",
    tools: ["Agent911", "Recall", "Lazarus"],
    color: "#A83E32",
    desc: "When something breaks at 2am, you open Agent911. Recall and Lazarus are already there.",
    cta: "See Incident Response",
    href: "/docs/agent911/snapshot-explained",
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

          {/* Hero: headline + subline + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="mb-3 text-[13px] uppercase tracking-[0.28em] text-[#B8782A]">Mission Management Software for OpenClaw</div>
              <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-[#E6E6E6] sm:text-[40px] lg:text-[44px]">
                Stabilize. Coordinate. Results.
              </h1>
              <p className="mt-5 text-[20px] font-medium tracking-wide text-[#5A6A78] sm:text-[22px]">
                Make it work (for you)
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/docs/triage/overview"
                className="inline-flex items-center justify-center gap-2 h-9 w-[200px] rounded-lg border border-[#D98A2B]/70 bg-[#D98A2B]/25 px-3 text-[12px] font-medium tracking-wide text-[#E8A040] transition hover:bg-[#D98A2B]/40 hover:border-[#E8A040]/90 hover:text-[#F0B050]"
              >
                Get Started
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current shrink-0" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Stack hint — landscape, top gap matches section padding so all four sides are equal */}
          <div className="mt-6 md:mt-8 rounded-[6px] overflow-hidden border border-[#2E3848]" style={{ aspectRatio: "1100/200" }}>
            <iframe
              src="/diagrams/stack-hint.html"
              title="The ACME Stack — click to view full product architecture"
              scrolling="no"
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              loading="eager"
            />
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
                  href="https://github.com/acmeagentsupply/triage"
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
                Reads directly from the filesystem. No gateway required. Run it when the system itself is the suspect — or when <code className="text-[#D98A2B]">protection_state AT_RISK</code> and nothing has broken yet.
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
                  src="/images/triage-output-v2.png"
                  alt="Triage output showing system health, reliability score, and protection state"
                  width={1280}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-6 max-w-[280px] text-center text-[13px] leading-5 text-[#5A6E80]">
                Read-only. Nothing changes. GPG-verified install.
              </p>
            </div>
          </div>
        </section>

        <ObserveSignalsSection signals={OBSERVE_SIGNALS} />

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] p-6 md:p-8">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#E6E6E6] md:text-[26px] lg:text-[30px]">
            When Something Breaks
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#9AA3AD]">
            ACME tells you what to do — in order, with evidence, without guessing.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              {
                name: "ORP",
                label: "Recovery Protocol",
                desc: "Sequences recovery correctly every time. Evidence first, then diagnosis, then action.",
              },
              {
                name: "Agent911",
                label: "Recovery Cockpit",
                desc: "Your incident command surface at 2am. Health signals, anomaly classification, and structured guidance on what to do next.",
              },
              {
                name: "Lazarus",
                label: "Backup Readiness",
                desc: "Verifies your backups actually work before an incident forces the test. Lazarus finds out first.",
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

        {/* ── Where ACME is taking you ── */}
        <section className="rounded-[6px] border border-[#2A3848] bg-[#1E2730] p-6 md:p-10">
          <div className="text-[11px] uppercase tracking-[0.36em] text-[#B8782A] mb-4">Where we&apos;re going</div>
          <p className="text-[20px] font-semibold leading-snug text-[#E6E6E6] max-w-3xl md:text-[24px]">
            Five patents pending, all about one thing: giving operators like you real control over multiple agents
          </p>
          <p className="mt-6 max-w-3xl text-[16px] leading-7 text-[#9AA3AD]">
            Not just keeping agents alive — leading them, coordinating them, measuring what they produce. The floor is reliability. ACME gets you there, and beyond.
          </p>
          <p className="mt-8 text-[18px] font-semibold italic text-[#B8782A]">Stick with us</p>
        </section>

        {/* ── Stay in the loop ── */}
        <section className="rounded-[6px] border border-[#2A3848] bg-[#1A2028] p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">Stay in the loop</div>
              <h2 className="mt-1 text-[20px] font-semibold text-[#E6E6E6]">Get updates on new releases</h2>
              <p className="mt-2 text-[14px] text-[#5A6E80] max-w-sm">
                Early access, release notes, and operator field updates. No noise.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center justify-center rounded-md border border-[#3A4858] px-6 py-3 text-[14px] font-medium text-[#C8D4E0] transition hover:border-[#D98A2B] hover:text-[#D98A2B]"
            >
              Contact us →
            </Link>
          </div>
        </section>


      </div>
    </main>
  );
}
