export default function InstallPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <h1 className="text-3xl font-bold text-zinc-100 mb-3">
            Install in minutes
          </h1>
          <p className="text-zinc-400">Deterministic install. No surprises.</p>
          <p className="mt-2 text-sm text-zinc-300">
            The ACME install helper prepares your runtime with idempotent,
            read-safe steps. Start with visibility. Add protection when ready.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="/docs/quickstart/5-minute"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
            >
              Quickstart
            </a>
            <a
              href="#verify"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Verify Installation
            </a>
          </div>
        </section>

        {/* Quickstart */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            Quickstart
          </div>
          <div className="mt-4 space-y-5">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                Step 1 — Preview (recommended)
              </div>
              <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                acme_install.sh -dry-run
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                Step 2 — Apply
              </div>
              <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                acme_install.sh -apply
              </div>
            </div>
            <div id="verify">
              <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                Step 3 — Verify
              </div>
              <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                acme_install.sh -verify
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs uppercase tracking-[0.28em] text-zinc-500">
            Expected time: ~2 minutes
          </div>
        </section>

        {/* What gets installed */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            What gets installed
          </div>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• RadCheck (free)</li>
            <li>• Lazarus Lite (free)</li>
            <li>• Optional modules you select</li>
          </ul>
          <div className="mt-6 text-[11px] uppercase tracking-[0.32em] text-zinc-500">
            Notes
          </div>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>• No gateway restarts</li>
            <li>• openclaw.json untouched</li>
            <li>• Idempotent — safe to re-run</li>
            <li>• Append-only telemetry</li>
          </ul>
        </section>

        {/* Install Safety */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            Install Safety
          </div>
          <p className="mt-3 text-sm text-zinc-300">
            The installer is designed for operator confidence:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• dry-run shows planned changes</li>
            <li>• lockfile prevents drift</li>
            <li>• verify mode confirms runtime state</li>
            <li>• repeated runs are NO-OP when current</li>
          </ul>
        </section>

        {/* After install */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            After install
          </div>
          <ol className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>1. Run RadCheck</li>
            <li>2. Review your risk posture</li>
            <li>3. Enable Sentinel if continuous protection is needed</li>
          </ol>
        </section>

        {/* Footer callout */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            ACME install is observational and additive. It does not modify
            existing control plane configuration.
          </div>
        </section>
      </main>
    </div>
  );
}
