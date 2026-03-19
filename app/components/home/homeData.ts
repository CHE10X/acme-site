export type UtilityCard = {
  id: string;
  title: string;
  unitLabel: string;
  subtitle: string;
  description: string;
  flavor: string;
  bullets: string[];
  docsHref: string;
};

export const OPERATOR_UTILITY_CARDS: UtilityCard[] = [
  {
    id: "radcheck",
    title: "RadCheck",
    unitLabel: "RADIATION SCAN UNIT",
    subtitle: "Early warning for hidden instability.",
    description:
      "RadCheck performs a fast, read-only inspection of your OpenClaw environment to identify early reliability risks.",
    flavor: "Something feels off? Run the scan.",
    bullets: [
      "baseline scan across 5 reliability domains",
      "weighted risk scoring 0-100 with guardrails",
      "enriched findings with fix prompts",
    ],
    docsHref: "/docs/radcheck/score-explained",
  },
  {
    id: "sentinel",
    title: "Sentinel",
    unitLabel: "CONTINUOUS GUARDRAIL UNIT",
    subtitle: "Detect silent failures live.",
    description:
      "Sentinel monitors OpenClaw agents during execution and surfaces runtime reliability signals when runs become slow, stuck, or inconsistent.",
    flavor: "When agents quietly go off-script, Sentinel notices first.",
    bullets: [
      "detects silent failures",
      "flags stuck / looping runs",
      "deviation alerts",
      "proof bundle output",
    ],
    docsHref: "/docs/sentinel/overview",
  },
  {
    id: "watchdog",
    title: "Watchdog",
    unitLabel: "LIVENESS MONITOR",
    subtitle: "Know when an agent goes silent before it becomes an incident.",
    description:
      "Watchdog supervises heartbeat and liveness signals across your agent fleet. When an agent stops responding, Watchdog flags it before the silence cascades.",
    flavor: "Liveness confirmed. Or it isn't.",
    bullets: [
      "heartbeat supervision across runtimes",
      "dead-run detection",
      "cron-safe cadence checks",
    ],
    docsHref: "/docs/watchdog/overview",
  },
];

export const FIELD_DEVELOPMENT_CARDS = [
  {
    id: "driftguard",
    title: "DriftGuard",
    subtitle: "Monitoring long-horizon drift under live load.",
    bullets: [
      "behavioral drift snapshots",
      "policy deviation flags",
      "run-to-run delta tracking",
    ],
  },
  {
    id: "transmission",
    title: "Transmission",
    subtitle: "Cross-agent signal routing with guardrails.",
    bullets: [
      "signal normalization",
      "lossy vs lossless lanes",
      "priority routing rules",
    ],
  },
  {
    id: "watchdog",
    title: "Watchdog",
    subtitle: "Heartbeat supervision across runtimes.",
    bullets: [
      "liveness probes",
      "cron-safe cadence checks",
      "dead-run detection",
    ],
  },
];
