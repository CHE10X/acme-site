import type { Metadata } from "next";
import Link from "next/link";

type UtilityRow = {
  utility: string;
  function: string;
  command: string;
  layer:
    | "Diagnostics"
    | "Observe"
    | "Runtime Hygiene"
    | "Recovery"
    | "Memory Integrity"
    | "Control";
  stages: Array<"Diagnose" | "Observe" | "Protect" | "Recover">;
};

const UTILITY_ROWS: UtilityRow[] = [
  {
    utility: "Triage",
    function: "Generates deterministic diagnostics and proof bundles.",
    command: "octriage",
    layer: "Diagnostics",
    stages: ["Diagnose"],
  },
  {
    utility: "RadCheck",
    function: "Scores reliability and flags drift risk.",
    command: "radcheck",
    layer: "Observe",
    stages: ["Diagnose", "Observe"],
  },
  {
    utility: "FindMyAgent",
    function: "Locates active agent sessions and runtime context.",
    command: "findmyagent --list",
    layer: "Observe",
    stages: ["Observe"],
  },
  {
    utility: "Agent911",
    function: "Runs guided response and recovery workflows.",
    command: "agent911",
    layer: "Recovery",
    stages: ["Recover"],
  },
  {
    utility: "Lazarus",
    function: "Simulates recovery readiness before incidents.",
    command: "lazarus --simulate",
    layer: "Recovery",
    stages: ["Recover"],
  },
  {
    utility: "Watchdog",
    function: "Supervises runtime hygiene and heartbeat signals.",
    command: "watchdog --heartbeat",
    layer: "Runtime Hygiene",
    stages: ["Protect"],
  },
  {
    utility: "Sentinel",
    function: "Detects anomalies and emits protection signals.",
    command: "sentinel --monitor",
    layer: "Memory Integrity",
    stages: ["Protect"],
  },
  {
    utility: "SphinxGate",
    function: "Enforces lane discipline for token and policy flow.",
    command: "sphinxgate --enforce",
    layer: "Control",
    stages: ["Protect"],
  },
  {
    utility: "DriftGuard",
    function: "Stabilizes behavior under long-horizon drift.",
    command: "driftguard --stabilize",
    layer: "Memory Integrity",
    stages: ["Protect"],
  },
  {
    utility: "Transmission",
    function: "Routes recovery and control-plane transport signals.",
    command: "transmission --route",
    layer: "Control",
    stages: ["Recover"],
  },
];

const STAGE_ORDER: Array<"Diagnose" | "Observe" | "Protect" | "Recover"> = [
  "Diagnose",
  "Observe",
  "Protect",
  "Recover",
];

const TOOL_INDEX_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Operator Utilities",
  description: "OpenClaw tool index for operator workflows.",
  itemListElement: UTILITY_ROWS.map((item, index) => ({
    "@type": "SoftwareApplication",
    position: index + 1,
    name: item.utility,
    description: item.function,
    applicationCategory: item.layer,
  })),
};

export const metadata: Metadata = {
  title: "Operator Utilities — ACME Agent Supply Co.",
  description: "OpenClaw Tool Index - human and machine readable.",
  alternates: {
    types: {
      "application/json": "/.well-known/tools.json",
    },
  },
};

export default function BotShopPage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TOOL_INDEX_JSON_LD) }}
      />
      <main className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 sm:py-14">
        <header>
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[#E6E6E6] sm:text-[40px]">
            Operator Utilities
          </h1>
          <p className="mt-3 text-[16px] text-[#9AA3AD]">
            OpenClaw Tool Index - human and machine readable
          </p>
        </header>

        <section
          id="utility-registry"
          className="mt-16 rounded-2xl border border-[#3A4048] bg-[#242A30] px-4 py-6 sm:px-6 sm:py-7"
        >
          <h2 className="text-[24px] font-semibold tracking-tight text-[#E6E6E6] sm:text-[30px]">
            Utility Registry
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#3A4048] text-[#9AA3AD]">
                  <th className="pb-2 pr-4 font-medium">Utility</th>
                  <th className="pb-2 pr-4 font-medium">Function</th>
                  <th className="pb-2 pr-4 font-medium">Command</th>
                  <th className="pb-2 font-medium">Layer</th>
                </tr>
              </thead>
              <tbody>
                {UTILITY_ROWS.map((row) => (
                  <tr key={row.utility} className="border-b border-[#3A4048] align-top last:border-b-0">
                    <td className="py-2 pr-4 font-medium text-[#E6E6E6]">{row.utility}</td>
                    <td className="py-2 pr-4 text-[#C7CDD4]">{row.function}</td>
                    <td className="py-2 pr-4 font-mono text-[15px] text-[#D98A2B]">{row.command}</td>
                    <td className="py-2 text-[#C7CDD4]">{row.layer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="utilities-by-stage"
          className="mt-16 rounded-2xl border border-[#3A4048] bg-[#242A30] px-4 py-6 sm:px-6 sm:py-7"
        >
          <h2 className="text-[24px] font-semibold tracking-tight text-[#E6E6E6] sm:text-[30px]">
            Utilities by Operational Stage
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {STAGE_ORDER.map((stage) => {
              const rows = UTILITY_ROWS.filter((row) => row.stages.includes(stage));
              return (
                <div key={stage}>
                  <h3 className="text-[18px] font-semibold text-[#E6E6E6]">{stage}</h3>
                  <ul className="mt-3 space-y-2 text-[16px]">
                    {rows.map((row) => (
                      <li key={`${stage}-${row.utility}`} className="text-[#C7CDD4]">
                        <span className="font-medium text-[#E6E6E6]">{row.utility}</span>
                        <span className="text-[#9AA3AD]"> - </span>
                        <span>{row.function}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="operator-install-path"
          className="mt-16 rounded-2xl border border-[#3A4048] bg-[#242A30] px-4 py-6 sm:px-6 sm:py-7"
        >
          <h2 className="text-[24px] font-semibold tracking-tight text-[#E6E6E6] sm:text-[30px]">
            Operator Install Path
          </h2>
          <p className="mt-3 text-[16px] text-[#C7CDD4]">
            Install OpenClaw utilities and start with Triage.
          </p>

          <div className="mt-6 rounded-xl border border-[#3A4048] bg-[#161A1E] p-4 font-mono text-[15px] leading-7 text-[#E6E6E6]">
            <div className="text-[#9AA3AD]">Install</div>
            <div className="mt-1 text-[#D98A2B]">
              curl -fsSL https://raw.githubusercontent.com/CHE10X/octriageunit/main/install.sh | bash
            </div>
            <div className="mt-4 text-[#9AA3AD]">Then run</div>
            <div className="mt-1">octriage</div>
            <div className="mt-4 text-[#9AA3AD]">Optional follow-up</div>
            <div className="mt-1">radcheck</div>
            <div>agent911</div>
          </div>

          <div className="mt-6">
            <Link
              href="https://github.com/CHE10X/octriageunit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg bg-[#D98A2B] px-4 py-2 text-[15px] font-semibold text-[#1E2226] transition-colors hover:bg-[#C47A22]"
            >
              Install Triage
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
