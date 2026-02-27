export const FIELD_MAP_ZONES = {
  RAD_CHECK: {
    label: "Something Feels Off",
    short: "Hidden Instability",
    product: "radcheck",
    docsHref: "/docs/radcheck/score-explained",
    hover:
      "Early signals suggest something is drifting. Run a scan before small issues compound.",
    hoverShort: "Quiet instability rarely fixes itself.",
    glowLevel: 1,
  },
  LAZARUS: {
    label: "Recovery Uncertain",
    short: "Backup Confidence Gap",
    product: "lazarus",
    docsHref: "/docs/lazarus/overview",
    hover:
      "Backups exist. Recovery certainty does not. Verify before the day you actually need it.",
    hoverShort: "Hope is not a restore strategy.",
    glowLevel: 1,
  },
  SENTINEL: {
    label: "Running Exposed",
    short: "No Continuous Guardrails",
    product: "sentinel",
    docsHref: "/docs/sentinel/overview",
    hover:
      "Your agents are running without continuous guardrails. Expose silent failures before users do.",
    hoverShort: "What runs unattended eventually misbehaves.",
    glowLevel: 2,
  },
  SPHINX_GATE: {
    label: "Policy Discipline Breaking Down",
    short: "Uncontrolled Model Routing",
    product: "sphinxgate",
    docsHref: "/docs/sphinxgate/overview",
    hover:
      "Model usage is drifting outside intended policy bounds. Restore routing discipline before costs and behavior diverge.",
    hoverShort: "Loose routing becomes expensive routing.",
    glowLevel: 2,
  },
  AGENT_911: {
    label: "System in Crisis",
    short: "Operator Visibility Required",
    product: "agent911",
    docsHref: "/docs/agent911/snapshot-explained",
    hover:
      "Multiple risk signals converging. Operator visibility and guided recovery recommended.",
    hoverShort: "This is where serious operators switch modes.",
    glowLevel: 3,
  },
} as const;

export const FIELD_MAP_HOTSPOTS = [
  { id: "RAD_CHECK", x: 8, y: 14, w: 36, h: 30 },
  { id: "SENTINEL", x: 56, y: 14, w: 36, h: 30 },
  { id: "LAZARUS", x: 8, y: 50, w: 36, h: 30 },
  { id: "SPHINX_GATE", x: 56, y: 50, w: 36, h: 30 },
  { id: "AGENT_911", x: 36, y: 74, w: 28, h: 18 },
];

export const FIELD_MAP_GOATS = [
  { x: 18, y: 30, size: 16, r: -8 },
  { x: 42, y: 26, size: 14, r: 6 },
  { x: 74, y: 28, size: 15, r: -4 },
  { x: 24, y: 62, size: 14, r: 10 },
  { x: 50, y: 58, size: 16, r: -6 },
  { x: 78, y: 64, size: 14, r: 8 },
  { x: 60, y: 82, size: 13, r: -10 },
];
