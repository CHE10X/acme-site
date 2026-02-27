"use client";

import { useState } from "react";

export default function SupportPage() {
  const [supportMode, setSupportMode] = useState<"ai" | "human">("ai");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500 mb-3">
            <span className="rounded-full border border-zinc-800 bg-zinc-900/70 px-2 py-1">
              AI-FIRST
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/70 px-2 py-1">
              OPERATOR SAFE
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/70 px-2 py-1">
              READ-ONLY
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/70 px-2 py-1">
              REDACTED BY DEFAULT
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-3">
            Support that starts with evidence.
          </h1>
          <p className="text-zinc-400">
            When something feels off, don’t guess. Generate a verified support
            bundle and get precise, actionable guidance.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400">
              Run Support Bundle
            </button>
            <button
              onClick={() =>
                setSupportMode((prev) => (prev === "ai" ? "human" : "ai"))
              }
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              I prefer human instructions
            </button>
          </div>
          <div className="mt-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
            Observational analysis only. No system changes are performed.
          </div>
        </section>

        {supportMode === "ai" ? (
          <>
            {/* AI Mode — How support works */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                How support works
              </div>
              <div className="mt-4 space-y-6">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 1 — Generate your bundle
                  </div>
                  <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                    acme_support_bundle.py --zip
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    This creates a redacted diagnostic package your operator or
                    our support systems can analyze.
                  </p>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 2 — Optional: run guided triage
                  </div>
                  <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                    agent911_triage.py --bundle &lt;support_bundle.zip&gt;
                  </div>
                  <div className="mt-2 text-sm text-zinc-300">
                    Produces:
                    <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                      <li>• triage_report.md</li>
                      <li>• triage_snapshot.json</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 3 — Share if needed
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    If you contact ACME Support, attach the generated zip. Most
                    issues can be understood immediately from this artifact.
                  </p>
                </div>
              </div>
            </section>

            {/* AI Mode — What the bundle contains */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                What the bundle contains
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• recent ops events (tail)</li>
                <li>• agent state snapshot</li>
                <li>• RadCheck history tail</li>
                <li>• routing posture</li>
                <li>• compaction indicators</li>
                <li>• predictive guard signals</li>
              </ul>
              <div className="mt-6 text-[11px] uppercase tracking-[0.32em] text-zinc-500">
                Never included
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                <li>• openclaw.json</li>
                <li>• secrets files</li>
                <li>• API keys</li>
                <li>• tokens</li>
                <li>• full logs</li>
              </ul>
              <div className="mt-4 text-xs uppercase tracking-[0.28em] text-zinc-500">
                Sensitive patterns are automatically redacted.
              </div>
            </section>

            {/* AI Mode — Privacy & control */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Privacy &amp; control
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Read-only collection</li>
                <li>• Redaction applied automatically</li>
                <li>• Bundle created locally</li>
                <li>• You choose whether to share it</li>
              </ul>
              <div className="mt-4 text-sm text-zinc-400">
                You remain in control of your data.
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Human Mode */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Human instructions
              </div>
              <div className="mt-4 space-y-5 text-sm text-zinc-300">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    1. Run the support bundle
                  </div>
                  <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                    acme_support_bundle.py --zip
                  </div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    2. Save the generated zip
                  </div>
                  <div className="mt-2 text-sm text-zinc-400">
                    Location will be shown after the script completes.
                  </div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    3. Send it to support
                  </div>
                  <div className="mt-2 text-sm text-zinc-400">
                    Attach the zip when contacting ACME Support.
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                What we look for
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• reliability signals</li>
                <li>• protection activity</li>
                <li>• routing behavior</li>
                <li>• compaction pressure</li>
                <li>• agent health</li>
              </ul>
              <div className="mt-4 text-sm text-zinc-400">
                This allows us to respond quickly without asking you to
                reproduce the issue.
              </div>
            </section>
          </>
        )}

        {/* Self-triage */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            Want to investigate locally?
          </div>
          <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
            agent911_triage.py --bundle &lt;support_bundle.zip&gt;
          </div>
          <div className="mt-3 text-sm text-zinc-300">
            You will receive a deterministic report describing:
            <ul className="mt-2 space-y-1 text-sm text-zinc-400">
              <li>• likely causes</li>
              <li>• recommended next actions</li>
              <li>• additional data we may need</li>
            </ul>
          </div>
        </section>

        {/* When to run support */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            Run the bundle if you notice
          </div>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• agents appear stuck</li>
            <li>• unexpected slowdowns</li>
            <li>• repeated fallbacks</li>
            <li>• compaction pressure warnings</li>
            <li>• reliability score drops</li>
            <li>• or anything that “just feels off”</li>
          </ul>
          <div className="mt-4 text-sm text-zinc-400">
            Trust your operator instinct.
          </div>
        </section>

        {/* Response posture */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            What happens after you send a bundle
          </div>
          <p className="mt-3 text-sm text-zinc-300">
            ACME Support follows an observational analysis model.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li>• review your bundle</li>
            <li>• identify likely causes</li>
            <li>• recommend next steps</li>
            <li>• request additional evidence if needed</li>
          </ul>
          <div className="mt-4 text-sm text-zinc-400">
            We do not perform remote changes to your system.
          </div>
        </section>

        {/* Footer callout */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 text-center">
          <div className="text-[11px] uppercase tracking-[0.4em] text-amber-400">
            Generated by operators, for operators
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            ACME support is designed to minimize guesswork and maximize signal.
          </div>
        </section>
      </main>
    </div>
  );
}
