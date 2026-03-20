export type DocsEntry = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};

export const DOCS_ENTRIES: DocsEntry[] = [
  {
    slug: "octriage/overview",
    title: "Triage Overview",
    summary: "Operator entrypoint for immediate reliability diagnostics.",
    body: [
      "Triage is the first install surface in OpenClaw.",
      "It reports reliability score, protection state, and evidence bundle status in one run.",
    ],
  },
  {
    slug: "radcheck/score-explained",
    title: "RadCheck Score Explained",
    summary: "Reliability scoring model for runtime risk classification.",
    body: [
      "RadCheck aggregates runtime and memory signals into an operator score.",
      "Scores support classify and prioritize actions before failures cascade.",
    ],
  },
  {
    slug: "sentinel/overview",
    title: "Sentinel Overview",
    summary: "Continuous runtime anomaly detection.",
    body: [
      "Sentinel detects silent runtime degradation and trigger conditions.",
      "It routes anomaly context into Observe and Recovery flows.",
    ],
  },
  {
    slug: "sphinxgate/overview",
    title: "SphinxGate Overview",
    summary: "Routing discipline and guardrail enforcement.",
    body: [
      "SphinxGate protects lane isolation and policy routing boundaries.",
      "It reduces cascading instability from uncontrolled traffic paths.",
    ],
  },
  {
    slug: "driftguard/overview",
    title: "DriftGuard Overview",
    summary: "Memory-integrity drift analysis for agent systems.",
    body: [
      "DriftGuard monitors long-horizon memory divergence.",
      "It anchors deterministic rehydration with stable memory assumptions.",
    ],
  },
  {
    slug: "watchdog/overview",
    title: "Watchdog Overview",
    summary: "Runtime heartbeat and stall detection.",
    body: [
      "Watchdog probes gateway and agent liveness.",
      "It escalates stall signatures before silent degradation becomes outage.",
    ],
  },
  {
    slug: "agent911/snapshot-explained",
    title: "Agent911 Snapshot Explained",
    summary: "Recovery decision support and verification outputs.",
    body: [
      "Agent911 classifies incident posture and coordinates recovery workflow checks.",
      "It outputs deterministic state evidence for operator verification.",
    ],
  },
  {
    slug: "lazarus/overview",
    title: "Lazarus Overview",
    summary: "Recovery readiness simulation and execution planning.",
    body: [
      "Lazarus validates restore pathways and readiness assumptions.",
      "Plans are surfaced as deterministic recovery reports.",
    ],
  },
  {
    slug: "transmission/overview",
    title: "Transmission Overview",
    summary: "Signal transport integrity across reliability surfaces.",
    body: [
      "Transmission moves reliability signals across Observe and Recover layers.",
      "It preserves event integrity through operator workflows.",
    ],
  },
  {
    slug: "findmyagent/overview",
    title: "FindMyAgent Overview",
    summary: "Agent topology and activity visibility.",
    body: [
      "FindMyAgent surfaces fleet structure, activity rate, and identity signals.",
      "It is a primary Observe-layer visibility feed.",
    ],
  },
  {
    slug: "orp/overview",
    title: "ORP Overview",
    summary: "Operational recovery protocol orchestration.",
    body: [
      "ORP standardizes detect/classify/recover/verify steps.",
      "It keeps recovery deterministic and auditable.",
    ],
  },
  {
    slug: "support/when-things-feel-off",
    title: "Support: When Things Feel Off",
    summary: "Evidence-first support workflow for degraded systems.",
    body: [
      "Begin with Triage output and a proof bundle path.",
      "Attach ORP report context before requesting escalation support.",
    ],
  },
  {
    slug: "architecture/reliability-stack",
    title: "Reliability Stack Architecture",
    summary: "Layered architecture overview for OpenClaw platform operations.",
    body: [
      "OpenClaw reliability is layered: Memory Integrity, Runtime Hygiene, Observe, and Recover.",
      "The loop is Observe → Detect → Classify → Recover → Verify.",
    ],
  },
];

export const DOCS_BY_SLUG = new Map(
  DOCS_ENTRIES.map((entry) => [entry.slug, entry]),
);
