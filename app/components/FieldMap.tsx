export const FIELD_MAP_ZONES = {
  RAD_CHECK: {
    label: "Something Feels Off",
    short: "Hidden Instability",
    product: "radcheck",
    hover:
      "Early signals suggest something is drifting. Run a scan before small issues compound.",
    hoverShort: "Quiet instability rarely fixes itself.",
    glowLevel: 1,
  },
  LAZARUS: {
    label: "Recovery Uncertain",
    short: "Backup Confidence Gap",
    product: "lazarus",
    hover:
      "Backups exist. Recovery certainty does not. Verify before the day you actually need it.",
    hoverShort: "Hope is not a restore strategy.",
    glowLevel: 1,
  },
  SENTINEL: {
    label: "Running Exposed",
    short: "No Continuous Guardrails",
    product: "sentinel",
    hover:
      "Your agents are running without continuous guardrails. Expose silent failures before users do.",
    hoverShort: "What runs unattended eventually misbehaves.",
    glowLevel: 2,
  },
  SPHINX_GATE: {
    label: "Policy Discipline Breaking Down",
    short: "Uncontrolled Model Routing",
    product: "sphinxgate",
    hover:
      "Model usage is drifting outside intended policy bounds. Restore routing discipline before costs and behavior diverge.",
    hoverShort: "Loose routing becomes expensive routing.",
    glowLevel: 2,
  },
  AGENT_911: {
    label: "System in Crisis",
    short: "Operator Visibility Required",
    product: "agent911",
    hover:
      "Multiple risk signals converging. Operator visibility and guided recovery recommended.",
    hoverShort: "This is where serious operators switch modes.",
    glowLevel: 3,
  },
} as const;

const DOCS_BY_PRODUCT: Record<string, string> = {
  radcheck: "/docs/radcheck/score-explained",
  lazarus: "/docs/lazarus/overview",
  sentinel: "/docs/sentinel/overview",
  sphinxgate: "/docs/sphinxgate/overview",
  agent911: "/docs/agent911/snapshot-explained",
};

function getGlowClass(level: number) {
  if (level >= 3) return "zone-glow-3";
  if (level === 2) return "zone-glow-2";
  if (level === 1) return "zone-glow-1";
  return "zone-glow-0";
}

export default function FieldMap() {
  const zones = Object.values(FIELD_MAP_ZONES).map((zone) => ({
    ...zone,
    href: DOCS_BY_PRODUCT[zone.product],
  }));

  return (
    <section className="mt-8 rounded-2xl border border-zinc-800/70 bg-zinc-950/60 px-5 py-6">
      <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
        Field Map
      </div>
      <p className="mt-2 text-sm text-zinc-500">
        Not sure where to start? Follow the symptom.
      </p>
      <div className="mt-4 relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_60%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-8 top-10 h-px w-32 bg-amber-400/20" />
          <div className="absolute right-10 top-20 h-px w-40 bg-amber-400/10" />
          <div className="absolute left-14 bottom-12 h-px w-44 bg-amber-400/15" />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          {zones.map((zone) => (
            <a
              key={zone.label}
              href={zone.href}
              aria-label={`${zone.label} — ${zone.short}`}
              className={`group rounded-xl border border-zinc-800/80 bg-zinc-900/50 px-4 py-4 text-left transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 hover:border-amber-400/40 hover:scale-[1.02] ${getGlowClass(
                zone.glowLevel
              )}`}
            >
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400 group-hover:text-[var(--acme-amber-200)] transition-colors">
                {zone.label}
              </div>
              <div className="mt-1 text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {zone.short}
              </div>
              <div className="mt-3 text-xs text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                {zone.hover}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
                {zone.hoverShort}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
