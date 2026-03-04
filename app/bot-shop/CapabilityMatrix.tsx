import type { ReactNode } from "react";

type CapabilityRow = {
  anchor?: string;
  tool: string;
  primaryFunction: string;
  mode: string;
  outputs: string;
  operatorSurface: string;
  whenToUse: string;
  guardrails: string;
  tags: string[];
};

const CAPABILITY_ROWS: CapabilityRow[] = [
  {
    anchor: "octriage",
    tool: "OCTriageUnit",
    primaryFunction: "Read-only first-response triage snapshot",
    mode: "One-shot, read-only, zero telemetry",
    outputs: "Deterministic proof bundle + bundle summary",
    operatorSurface: "CLI output + bundle artifacts (support-ready)",
    whenToUse: '"Something feels off", degraded control plane, safe first move',
    guardrails: "No config mutation, no network calls, no remote access claims",
    tags: ["FREE"],
  },
  {
    anchor: "radcheck",
    tool: "RadCheck",
    primaryFunction: "Scan-time detection of systemic risk posture",
    mode: "On-demand scan (read-only evidence)",
    outputs: "Risk score + findings + recommended next protective step",
    operatorSurface: "CLI + docs interpretation",
    whenToUse:
      "Before enabling continuous protection; periodic audits; pre-change sanity",
    guardrails:
      'Scan-time only; not continuous monitoring; no "prevents incidents" claims',
    tags: ["FREE"],
  },
  {
    tool: "Lazarus (Lite / Overview)",
    primaryFunction: "Recovery readiness validation (restore posture confidence)",
    mode: "Verification workflow (operator-controlled)",
    outputs: "Recovery posture signal + verification artifacts (as applicable)",
    operatorSurface: "CLI + docs-guided steps",
    whenToUse:
      "Backup/restore unknown; before incidents; verify recovery path",
    guardrails:
      'Do not claim "guarantees recovery"; verification is environment-dependent',
    tags: ["FREE"],
  },
  {
    anchor: "sentinel",
    tool: "Sentinel",
    primaryFunction: "Continuous runtime guardrails + early trouble flags",
    mode: "Continuous runtime protection layer",
    outputs: 'Guard signals, protection events, "needs attention" flags',
    operatorSurface: "Surfaces inside Agent911 + docs pages",
    whenToUse:
      "After RadCheck indicates productive unease; when ongoing protection is needed",
    guardrails:
      'Not a full solution; avoid autonomy/self-heal claims; not "observability only"',
    tags: ["PAID", "MOST POPULAR"],
  },
  {
    tool: "SphinxGate",
    primaryFunction: "Policy enforcement for routing/model posture",
    mode: "Continuous enforcement (policy-driven)",
    outputs: "Policy decisions + routing posture signals + enforcement events",
    operatorSurface: "Operator posture via Agent911 and/or logs",
    whenToUse:
      "Uncontrolled routing; inconsistent behavior; need policy discipline",
    guardrails:
      'Policy enforcement only; lane language optional; no "solves everything"',
    tags: ["PAID"],
  },
  {
    tool: "Drift Guard",
    primaryFunction: "Drift detection/guardrails against baseline",
    mode: "Continuous or scheduled checks (implementation-dependent)",
    outputs: "Drift deltas + warnings + recommended operator actions",
    operatorSurface: "Operator view via Agent911 / reports",
    whenToUse: "Predictability matters; quiet drift risk",
    guardrails:
      "Don't imply drift is eliminated; it's risk posture + operator playbook",
    tags: ["ADVANCED", "PAID"],
  },
  {
    tool: "Transmission",
    primaryFunction: "Multi-agent delivery / routing transport discipline",
    mode: "Runtime assist (implementation-dependent)",
    outputs: "Delivery posture, routing events, reliability signals",
    operatorSurface: "Operator surface via Agent911 where applicable",
    whenToUse: "Multi-agent setups; delivery reliability needs",
    guardrails:
      "Don't promise orchestration solves reliability; keep scope precise",
    tags: ["ADVANCED", "PAID"],
  },
  {
    tool: "Agent911",
    primaryFunction: "Read-only cockpit + guided triage workflows (revenue gravity)",
    mode: "Operator surface (observational by design)",
    outputs: "Unified reliability snapshot + proofs/history + guided triage",
    operatorSurface: "Web UI / operator console",
    whenToUse: 'Serious operators; production visibility; "WTF is going on"',
    guardrails:
      "NO autonomous recovery/self-healing claims; guided playbooks only",
    tags: ["PAID", "GRAVITY WELL"],
  },
  {
    tool: "FindMyAgent (embedded)",
    primaryFunction: 'Agent presence & "needs attention" awareness',
    mode: "Continuous visibility surface (embedded in Agent911)",
    outputs:
      "Presence state + heartbeat age + stalled/blocked flags + delta",
    operatorSurface: "Agent911 panel",
    whenToUse: "Multiple agents; overnight runs; silence detection",
    guardrails:
      "Not separately priced (launch); awareness layer, not control automation",
    tags: ["EMBEDDED"],
  },
  {
    tool: "Watchdog (foundation)",
    primaryFunction: "Reliability foundation component (baseline hygiene)",
    mode: "Background checks (implementation-dependent)",
    outputs: "Hygiene signals; baseline health posture",
    operatorSurface: "Implicit; referenced as included",
    whenToUse: "Included in protection stack; baseline reliability posture",
    guardrails:
      'Do not elevate as hero; phrase "Included as part of the reliability foundation"',
    tags: ["FOUNDATION"],
  },
];

function Tag({ children }: { children: ReactNode }) {
  const label = String(children);
  const isAmber = label === "PAID" || label === "MOST POPULAR";

  return (
    <span
      className={
        isAmber
          ? "rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-200"
          : "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-300"
      }
    >
      {children}
    </span>
  );
}

export default function CapabilityMatrix() {
  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-white/5 text-zinc-300">
            <tr>
              {[
                "Tool",
                "Primary function",
                "Mode",
                "Outputs",
                "Operator surface",
                "When to use",
                "Guardrails",
              ].map((heading) => (
                <th
                  key={heading}
                  className="border-b border-white/10 px-4 py-3 font-medium tracking-[0.02em]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAPABILITY_ROWS.map((row) => (
              <tr key={row.tool} id={row.anchor} className="align-top">
                <td className="border-b border-white/10 px-4 py-4 text-zinc-100">
                  <div className="font-medium">{row.tool}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {row.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </td>
                <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                  {row.primaryFunction}
                </td>
                <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                  {row.mode}
                </td>
                <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                  {row.outputs}
                </td>
                <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                  {row.operatorSurface}
                </td>
                <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                  {row.whenToUse}
                </td>
                <td className="border-b border-white/10 px-4 py-4 text-zinc-400">
                  {row.guardrails}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {CAPABILITY_ROWS.map((row) => (
          <article
            key={row.tool}
            id={row.anchor}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 text-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-medium text-zinc-100">{row.tool}</h3>
                <p className="mt-2 text-zinc-300">{row.primaryFunction}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {row.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <details className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <summary className="cursor-pointer list-none text-zinc-200">
                More
              </summary>
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Mode
                  </dt>
                  <dd className="mt-1 text-zinc-300">{row.mode}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Outputs
                  </dt>
                  <dd className="mt-1 text-zinc-300">{row.outputs}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Operator surface
                  </dt>
                  <dd className="mt-1 text-zinc-300">{row.operatorSurface}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    When to use
                  </dt>
                  <dd className="mt-1 text-zinc-300">{row.whenToUse}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Guardrails
                  </dt>
                  <dd className="mt-1 text-zinc-400">{row.guardrails}</dd>
                </div>
              </dl>
            </details>
          </article>
        ))}
      </div>
    </>
  );
}
