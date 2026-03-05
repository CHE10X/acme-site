"use client";

import { useState } from "react";
import OpenClawStackDiagram from "@/src/components/OpenClawStackDiagram";

export default function SupportPage() {
  const [supportMode, setSupportMode] = useState<"ai" | "human">("ai");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <h1 className="text-3xl font-bold text-zinc-100 mb-3">
            When something feels off
          </h1>
          <p className="text-zinc-400">
            Generate a support bundle. Send evidence, not guesswork.
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            ACME support begins with a deterministic bundle that captures the
            signals needed for fast triage. Built for operators. Readable by
            humans and AI.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="/support/first-response"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
            >
              First Response
            </a>
            <a
              href="/docs/support/when-things-feel-off"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Run Support Bundle
            </a>
            <a
              href="#support-contents"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              View What’s Collected
            </a>
          </div>
        <div className="mt-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
            Observational analysis only. No system changes are performed.
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            Reliability Flow
          </div>
          <div className="mt-4 mx-auto max-w-[980px] rounded-2xl border border-zinc-700/80 bg-zinc-900/70 p-4">
            <OpenClawStackDiagram />
            <p className="mt-3 text-sm text-zinc-400">
              Start with OCTriageUnit (Operator Tool) to capture a deterministic
              proof bundle before recovery actions.
            </p>
          </div>
        </section>

        {/* Toggle */}
        <div className="mt-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 p-1 text-xs uppercase tracking-[0.28em] text-zinc-500">
          <span className="px-3 py-1 text-zinc-500">Human / AI</span>
          <button
            onClick={() => setSupportMode("human")}
            className={`rounded-full px-3 py-1 transition ${
              supportMode === "human"
                ? "bg-amber-500 text-black"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Human
          </button>
          <button
            onClick={() => setSupportMode("ai")}
            className={`rounded-full px-3 py-1 transition ${
              supportMode === "ai"
                ? "bg-amber-500 text-black"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            AI
          </button>
        </div>

        {supportMode === "ai" ? (
          <>
            {/* AI Mode — Support Protocol */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Support Protocol
              </div>
              <div className="mt-4 space-y-6">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 1 — Generate bundle
                  </div>
                  <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                    acme_support_bundle.py -zip
                  </div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 2 — Review consent
                  </div>
                  <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                    acme_support_bundle.py -print-consent
                  </div>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 3 — First response
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    If the control plane is degraded, begin with the calm,
                    read-only first-response workflow before escalating.
                  </p>
                  <a
                    href="/support/first-response"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-amber-300 transition hover:text-amber-200"
                  >
                    First Response
                  </a>
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-zinc-500">
                    Step 4 — Send bundle
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">
                    Attach the generated zip when contacting support.
                  </p>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                  <li>• Observational analysis only</li>
                  <li>• No configuration changes performed</li>
                  <li>• Redaction applied automatically</li>
                </ul>
              </div>
            </section>

            {/* Expected contents */}
            <section
              id="support-contents"
              className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6"
            >
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Expected contents
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• agent911 snapshot</li>
                <li>• recent ops events (tail)</li>
                <li>• routing and protection posture</li>
                <li>• compaction signals</li>
                <li>• redacted logs</li>
              </ul>
            </section>

            {/* Response posture */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Response posture
              </div>
              <p className="mt-3 text-sm text-zinc-300">
                ACME reviews bundles in deterministic order:
              </p>
              <div className="mt-2 text-sm text-zinc-400">
                Agent911 → ops events → Sentinel → compaction → routing
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Human Mode */}
            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                What to do
              </div>
              <div className="mt-4 text-sm text-zinc-300">
                If your system looks wrong or stalled:
                <ol className="mt-3 space-y-2 text-sm text-zinc-400">
                  <li>1. Run the support bundle command</li>
                  <li>2. Attach the zip to your support request</li>
                  <li>
                    3. Include a short description of what you observed
                  </li>
                </ol>
              </div>
              <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 font-mono text-amber-200 text-sm">
                acme_support_bundle.py -zip
              </div>
              <div className="mt-4 text-sm text-zinc-400">
                We’ll review the evidence and respond with next steps.
              </div>
            </section>

            <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Privacy &amp; safety
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>• Secrets are redacted</li>
                <li>• openclaw.json is never included</li>
                <li>• Bundle is read-only evidence</li>
                <li>• You control what you send</li>
              </ul>
            </section>
          </>
        )}

        {/* Footer callout */}
        <section className="mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Generated artifacts are observational. No automated repair is
            performed.
          </div>
        </section>
      </main>
    </div>
  );
}
