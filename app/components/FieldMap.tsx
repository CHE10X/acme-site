export default function FieldMap() {
  const regions = [
    {
      label: "UNSTABLE / FLAKY",
      href: "/docs/radcheck/score-explained",
      aria: "Unstable or flaky symptoms — RadCheck score explained",
    },
    {
      label: "SILENT / STUCK",
      href: "/docs/sentinel/overview",
      aria: "Silent or stuck symptoms — Sentinel overview",
    },
    {
      label: "EXPOSED / AT RISK",
      href: "/docs/lazarus/overview",
      aria: "Exposed or at risk symptoms — Lazarus overview",
    },
    {
      label: "OUT OF CONTROL",
      href: "/docs/sphinxgate/overview",
      aria: "Out of control routing — SphinxGate overview",
    },
  ];

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
          {regions.map((region) => (
            <a
              key={region.label}
              href={region.href}
              aria-label={region.aria}
              className="group rounded-xl border border-zinc-800/80 bg-zinc-900/50 px-4 py-4 text-left transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.12)] hover:scale-[1.02]"
            >
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400 group-hover:text-amber-200 transition-colors">
                {region.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
