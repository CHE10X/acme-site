export type FieldMapPoint = {
  x: number;
  y: number;
};

export type FieldMapHotspot = {
  id: string;
  label: string;
  body: string;
  ctaLabel: string;
  href: string;
  polygon: FieldMapPoint[];
};

export const HOTSPOTS: FieldMapHotspot[] = [
  {
    id: "gateway-unstable",
    label: "Gateway unstable",
    body:
      "Control plane connectivity is degraded or non-responsive. Run a rapid probe to confirm gateway health and isolate failure domain.",
    ctaLabel: "Investigate gateway",
    href: "/docs/support/when-things-feel-off",
    polygon: [
      { x: 0.08, y: 0.10 },
      { x: 0.41, y: 0.10 },
      { x: 0.45, y: 0.22 },
      { x: 0.42, y: 0.36 },
      { x: 0.10, y: 0.36 },
      { x: 0.06, y: 0.24 },
    ],
  },
  {
    id: "failures-not-surfacing",
    label: "Failures not surfacing",
    body:
      "Processes appear healthy, but failure signals are not reaching the operator surface. Detect hidden faults before they compound.",
    ctaLabel: "Surface hidden faults",
    href: "/docs/radcheck/score-explained",
    polygon: [
      { x: 0.57, y: 0.10 },
      { x: 0.91, y: 0.12 },
      { x: 0.93, y: 0.24 },
      { x: 0.90, y: 0.36 },
      { x: 0.60, y: 0.36 },
      { x: 0.55, y: 0.23 },
    ],
  },
  {
    id: "context-nearing-limits",
    label: "Context nearing limits",
    body:
      "Session and memory pressure are rising toward compaction thresholds. Assess headroom before degradation begins.",
    ctaLabel: "Check context headroom",
    href: "/docs/architecture/reliability-stack",
    polygon: [
      { x: 0.09, y: 0.41 },
      { x: 0.42, y: 0.42 },
      { x: 0.43, y: 0.56 },
      { x: 0.39, y: 0.68 },
      { x: 0.12, y: 0.68 },
      { x: 0.07, y: 0.55 },
    ],
  },
  {
    id: "system-drift-detected",
    label: "System drift detected",
    body:
      "Configuration or behavioral drift may reduce predictability over time. Compare live state against known-good baseline.",
    ctaLabel: "Analyze drift",
    href: "/docs/sentinel/overview",
    polygon: [
      { x: 0.58, y: 0.41 },
      { x: 0.92, y: 0.42 },
      { x: 0.93, y: 0.57 },
      { x: 0.88, y: 0.69 },
      { x: 0.61, y: 0.69 },
      { x: 0.56, y: 0.55 },
    ],
  },
  {
    id: "recovery-posture-unknown",
    label: "Recovery posture unknown",
    body:
      "Backup and restore pathways have not been recently verified. Confirm the system can recover under real conditions.",
    ctaLabel: "Verify recovery",
    href: "/docs/lazarus/overview",
    polygon: [
      { x: 0.36, y: 0.64 },
      { x: 0.66, y: 0.64 },
      { x: 0.69, y: 0.74 },
      { x: 0.62, y: 0.86 },
      { x: 0.41, y: 0.86 },
      { x: 0.33, y: 0.75 },
    ],
  },
];
