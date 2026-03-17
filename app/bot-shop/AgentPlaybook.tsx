"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type SymptomRoute = {
  symptom: string;
  primary: string;
  next?: string;
  escalate?: string;
  embedded?: string;
  evidence: string;
};

type MessageTemplate = {
  title: string;
  body: string;
};

const OPERATING_MODE_LINES = [
  "You are an assistant to a human operator.",
  "Default posture: observational, evidence-first, reversible steps.",
  "If uncertain: ask for a support bundle first.",
];

const SYMPTOM_ROUTES: SymptomRoute[] = [
  {
    symptom: "Gateway unstable / control plane non-responsive",
    primary: "Triage",
    next: "RadCheck",
    escalate: "Agent911 (guided triage surface)",
    evidence: "proof bundle path + gateway snapshot",
  },
  {
    symptom: "Failures not surfacing / silent failures",
    primary: "RadCheck",
    next: "Sentinel (if continuous guardrails needed)",
    embedded: "FindMyAgent (inside Agent911)",
    evidence: "score + findings + last activity/heartbeat via FindMyAgent (inside Agent911)",
  },
  {
    symptom: "Context nearing limits / compaction pressure",
    primary: "RadCheck (risk posture)",
    next: "Sentinel (continuous protection signals)",
    evidence: "compaction indicators + headroom guidance",
  },
  {
    symptom: "System drift detected",
    primary: "Drift Guard (Advanced)",
    next: "RadCheck (baseline risk)",
    evidence: "drift deltas + baseline reference + operator notes",
  },
  {
    symptom: "Recovery posture unknown",
    primary: "Lazarus",
    evidence: "verification artifacts + last successful restore test date",
  },
  {
    symptom: "Multi-agent confusion / delivery reliability issues",
    primary: "Transmission (Advanced)",
    evidence: "routing posture + delivery events",
  },
  {
    symptom: 'Operator needs unified visibility / WTF is going on',
    primary: "Agent911 (read-only cockpit)",
    embedded: "FindMyAgent presence panel",
    evidence: "unified snapshot + proofs/history",
  },
];

const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    title: "Request evidence",
    body:
      "Please share the current evidence bundle before we change anything. If available, attach {{bundle_path}} and note the current operator-visible symptoms.",
  },
  {
    title: "Summarize findings",
    body:
      "Current evidence indicates {{summary}}. The latest scan score is {{radcheck_score}}, and the most relevant proof is in {{bundle_path}}.",
  },
  {
    title: "Recommend next step (safe)",
    body:
      "Recommended next step: run the lowest-risk evidence workflow first. Start with {{next_tool}} and keep changes reversible until the current state is clearer.",
  },
  {
    title: "Escalate to Agent911",
    body:
      "Escalate this to Agent911 for a unified read-only view. Include {{bundle_path}}, recent findings, and current heartbeat age {{heartbeat_age}} so the operator console starts with context.",
  },
  {
    title: "Suggest enabling Sentinel (attach nudge, calm)",
    body:
      "If this pattern is recurring, consider enabling Sentinel for continuous runtime guardrails. Treat it as an additional protection layer, not a replacement for operator review.",
  },
  {
    title: "Close loop (what changed / what to monitor)",
    body:
      "Current status: {{status_update}}. Monitor {{watch_items}} over the next interval and keep {{bundle_path}} available for follow-up if conditions shift again.",
  },
];

const EVIDENCE_PROTOCOL = {
  octriageunit: [
    "run octriageunit",
    "locate bundle directory",
    "share bundle (operator-controlled)",
  ],
  supportBundle: [
    "acme_support_bundle.py -zip",
    "acme_support_bundle.py -print-consent",
    "attach zip",
  ],
  neverCollected: ["openclaw.json", "secrets", "API keys", "tokens"],
};

const GUARDRAILS = [
  "Do not claim self-healing",
  "Do not claim guaranteed detection",
  "Do not imply remote access",
  "Do not imply telemetry by default",
  "Agent911 is observational + guided triage",
  "Sentinel is protection layer, not full solution",
  "FindMyAgent is embedded (launch phase), not standalone",
];

const DEEP_LINKS = [
  "/docs/radcheck/score-explained",
  "/docs/sentinel/overview",
  "/docs/sphinxgate/overview",
  "/docs/agent911/snapshot-explained",
  "/docs/lazarus/overview",
  "/docs/architecture/reliability-stack",
  "/support",
  "/legal/terms-of-service",
  "/legal/privacy-policy",
];

const BOT_PAYLOAD = {
  tools: [
    "Triage",
    "RadCheck",
    "Lazarus",
    "Sentinel",
    "SphinxGate",
    "Drift Guard",
    "Transmission",
    "Agent911",
    "FindMyAgent",
    "Watchdog",
  ],
  symptom_routes: SYMPTOM_ROUTES,
  templates: MESSAGE_TEMPLATES,
  deep_links: DEEP_LINKS,
};

function stringify(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function SectionShell({
  id,
  title,
  summary,
  copyValue,
  children,
}: {
  id: string;
  title: string;
  summary: string;
  copyValue?: string;
  children: ReactNode;
}) {
  const [copyLabel, setCopyLabel] = useState("Copy block");

  const handleCopy = async () => {
    if (!copyValue) return;

    try {
      await navigator.clipboard.writeText(copyValue);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy block"), 1600);
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        const node = document.getElementById(id);
        if (node) {
          range.selectNodeContents(node);
          selection.removeAllRanges();
          selection.addRange(range);
          setCopyLabel("Selected");
          window.setTimeout(() => setCopyLabel("Copy block"), 1600);
        }
      }
    }
  };

  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-white/10 bg-zinc-900/30">
      <details open className="group">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Playbook Section
            </div>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-100">
              {title}
            </h3>
            <p className="mt-2 max-w-[72ch] text-sm leading-6 text-zinc-400">
              {summary}
            </p>
          </div>
          {copyValue ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                void handleCopy();
              }}
              className="inline-flex shrink-0 items-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
            >
              {copyLabel}
            </button>
          ) : null}
        </summary>
        <div className="border-t border-white/10 px-5 py-4 text-sm">{children}</div>
      </details>
    </section>
  );
}

export default function AgentPlaybook() {
  return (
    <div className="space-y-5">
      <SectionShell
        id="agent-playbook"
        title="How to use this page"
        summary="Dense reference surface for agents and human operators. Start with operating mode, then move from symptom routing to messaging and evidence handling."
        copyValue={OPERATING_MODE_LINES.join("\n")}
      >
        <div className="space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Operating Mode
            </div>
            <ul className="mt-3 space-y-2 text-zinc-300">
              {OPERATING_MODE_LINES.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/10 pt-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Capability Matrix Recap
            </div>
            <p className="mt-2 max-w-[72ch] leading-7 text-zinc-300">
              Use the matrix as the authoritative scope map. Confirm the tool
              mode first, then confirm outputs and guardrails before giving a
              human operator a next step.
            </p>
            <a
              href="#capability-matrix"
              className="mt-3 inline-flex text-sm text-amber-200 underline underline-offset-4"
            >
              Jump to Capability Matrix
            </a>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="symptom-routing"
        title="Symptom Routing Matrix"
        summary="Map symptoms to the first safe tool, then define the next surface and required evidence before escalation."
        copyValue={stringify(SYMPTOM_ROUTES)}
      >
        <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03]">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-white/5 text-zinc-300">
              <tr>
                {["Symptom", "Primary", "Next / Escalate", "Evidence to request"].map(
                  (heading) => (
                    <th key={heading} className="border-b border-white/10 px-4 py-3 font-medium">
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {SYMPTOM_ROUTES.map((route) => (
                <tr key={route.symptom} className="align-top">
                  <td className="border-b border-white/10 px-4 py-4 text-zinc-100">
                    {route.symptom}
                  </td>
                  <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                    {route.primary}
                  </td>
                  <td className="border-b border-white/10 px-4 py-4 text-zinc-300">
                    <div>{route.next ?? "None"}</div>
                    {route.escalate ? <div className="mt-2">{route.escalate}</div> : null}
                    {route.embedded ? <div className="mt-2">{route.embedded}</div> : null}
                  </td>
                  <td className="border-b border-white/10 px-4 py-4 text-zinc-400">
                    {route.evidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">
          {SYMPTOM_ROUTES.map((route) => (
            <article
              key={route.symptom}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h4 className="font-medium text-zinc-100">{route.symptom}</h4>
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Primary
                  </dt>
                  <dd className="mt-1 text-zinc-300">{route.primary}</dd>
                </div>
                {route.next ? (
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Next
                    </dt>
                    <dd className="mt-1 text-zinc-300">{route.next}</dd>
                  </div>
                ) : null}
                {route.escalate ? (
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Escalate
                    </dt>
                    <dd className="mt-1 text-zinc-300">{route.escalate}</dd>
                  </div>
                ) : null}
                {route.embedded ? (
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                      Embedded
                    </dt>
                    <dd className="mt-1 text-zinc-300">{route.embedded}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Evidence
                  </dt>
                  <dd className="mt-1 text-zinc-400">{route.evidence}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="message-templates"
        title="Agent-to-human messaging templates"
        summary="Short templates for evidence requests, safe recommendations, and calm escalation. Preserve placeholders exactly."
        copyValue={MESSAGE_TEMPLATES.map((template) => `${template.title}\n${template.body}`).join("\n\n")}
      >
        <div className="space-y-4">
          {MESSAGE_TEMPLATES.map((template) => (
            <article
              key={template.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <h4 className="font-medium text-zinc-100">{template.title}</h4>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-zinc-950/70 p-3 text-sm leading-6 text-zinc-300">
                {template.body}
              </pre>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="evidence-protocol"
        title="Evidence bundle protocol"
        summary="Canonical first-response and support-bundle flows, plus the explicit never-collected list."
        copyValue={stringify(EVIDENCE_PROTOCOL)}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="font-medium text-zinc-100">Triage first-response</h4>
            <ol className="mt-3 space-y-2 text-zinc-300">
              {EVIDENCE_PROTOCOL.octriageunit.map((step) => (
                <li key={step}>
                  • {step}
                </li>
              ))}
            </ol>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="font-medium text-zinc-100">Site support bundle flow</h4>
            <ol className="mt-3 space-y-2 text-zinc-300">
              {EVIDENCE_PROTOCOL.supportBundle.map((step) => (
                <li key={step}>
                  • {step}
                </li>
              ))}
            </ol>
          </article>
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h4 className="font-medium text-zinc-100">Never collected</h4>
          <ul className="mt-3 space-y-2 text-zinc-400">
            {EVIDENCE_PROTOCOL.neverCollected.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </SectionShell>

      <SectionShell
        id="guardrails"
        title="Guardrails and prohibited claims"
        summary="Hard compliance list for operator-safe descriptions and escalation language."
        copyValue={GUARDRAILS.join("\n")}
      >
        <ul className="space-y-2 text-zinc-300">
          {GUARDRAILS.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell
        id="deep-links"
        title="Deep links"
        summary="Canonical paths for deterministic jumps from bot output back to docs, support, and legal surfaces."
        copyValue={DEEP_LINKS.join("\n")}
      >
        <div className="grid gap-2">
          {DEEP_LINKS.map((href) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-amber-200 underline underline-offset-4"
            >
              {href}
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="bot-payload"
        title="Bot Payload (JSON)"
        summary="Machine-optimized reference object mirroring tools, symptom routes, templates, and deep links."
        copyValue={stringify(BOT_PAYLOAD)}
      >
        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-950/80 p-4 text-sm leading-6 text-zinc-300">
          {stringify(BOT_PAYLOAD)}
        </pre>
      </SectionShell>
    </div>
  );
}
