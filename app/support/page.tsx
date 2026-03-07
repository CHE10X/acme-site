"use client";

import { useState } from "react";
import Link from "next/link";

export default function SupportPage() {
  const [supportMode, setSupportMode] = useState<"ai" | "human">("ai");

  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[1100px] px-6 py-12">
        {/* Hero */}
        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6 shadow-[0_0_0_1px_rgba(217,138,43,0.06)]">
          <h1 className="mb-3 text-[40px] font-semibold text-[#E6E6E6]">
            When something feels off
          </h1>
          <p className="text-[16px] text-[#9AA3AD]">
            Generate a support bundle. Send evidence, not guesswork.
          </p>
          <p className="mt-2 text-[16px] text-[#E6E6E6]">
            ACME support begins with a deterministic bundle that captures the
            signals needed for fast triage. Built for operators. Readable by
            humans and AI.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/support/first-response"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D98A2B] px-4 py-2 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
            >
              First Response
            </Link>
            <Link
              href="/docs/support/when-things-feel-off"
              className="inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
            >
              Run Support Bundle
            </Link>
            <a
              href="#support-contents"
              className="inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
            >
              View What’s Collected
            </a>
          </div>
          <div className="mt-3 text-[13px] uppercase tracking-[0.28em] text-[#9AA3AD]">
            Observational analysis only. No system changes are performed.
          </div>
        </section>

        <section className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
          <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
            Reliability Flow
          </div>
          <p className="mt-3 text-[16px] text-[#E6E6E6]">
            The canonical reliability architecture diagram is maintained in
            docs.
          </p>
          <Link
            href="/docs"
            className="mt-3 inline-flex items-center text-[16px] text-[#D98A2B] transition hover:text-[#C47A22]"
          >
            View the OpenClaw Reliability Stack →
          </Link>
        </section>

        {/* Toggle */}
        <div className="mt-6 inline-flex items-center rounded-full border border-[#3A4048] bg-[#242A30] p-1 text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">
          <span className="px-3 py-1 text-[#9AA3AD]">Human / AI</span>
          <button
            onClick={() => setSupportMode("human")}
            className={`rounded-full px-3 py-1 transition ${
              supportMode === "human"
                ? "bg-[#D98A2B] text-[#1E2226]"
                : "text-[#9AA3AD] hover:text-[#E6E6E6]"
            }`}
          >
            Human
          </button>
          <button
            onClick={() => setSupportMode("ai")}
            className={`rounded-full px-3 py-1 transition ${
              supportMode === "ai"
                ? "bg-[#D98A2B] text-[#1E2226]"
                : "text-[#9AA3AD] hover:text-[#E6E6E6]"
            }`}
          >
            AI
          </button>
        </div>

        {supportMode === "ai" ? (
          <>
            {/* AI Mode — Support Protocol */}
            <section className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Support Protocol
              </div>
              <div className="mt-4 space-y-6">
                <div>
                  <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">
                    Step 1 — Generate bundle
                  </div>
                  <div className="mt-2 rounded-lg bg-[#161A1E] px-4 py-3 font-mono text-[16px] text-[#D98A2B]">
                    acme_support_bundle.py -zip
                  </div>
                </div>
                <div>
                  <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">
                    Step 2 — Review consent
                  </div>
                  <div className="mt-2 rounded-lg bg-[#161A1E] px-4 py-3 font-mono text-[16px] text-[#D98A2B]">
                    acme_support_bundle.py -print-consent
                  </div>
                </div>
                <div>
                  <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">
                    Step 3 — First response
                  </div>
                  <p className="mt-2 text-[16px] text-[#E6E6E6]">
                    If the control plane is degraded, begin with the calm,
                    read-only first-response workflow before escalating.
                  </p>
                  <Link
                    href="/support/first-response"
                    className="mt-2 inline-flex items-center gap-2 text-[16px] text-[#D98A2B] transition hover:text-[#C47A22]"
                  >
                    First Response
                  </Link>
                </div>
                <div>
                  <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">
                    Step 4 — Send bundle
                  </div>
                  <p className="mt-2 text-[16px] text-[#E6E6E6]">
                    Attach the generated zip when contacting support.
                  </p>
                </div>
                <ul className="mt-2 space-y-2 text-[16px] text-[#E6E6E6]">
                  <li>• Observational analysis only</li>
                  <li>• No configuration changes performed</li>
                  <li>• Redaction applied automatically</li>
                </ul>
              </div>
            </section>

            {/* Expected contents */}
            <section
              id="support-contents"
              className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6"
            >
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Expected contents
              </div>
              <ul className="mt-4 space-y-2 text-[16px] text-[#E6E6E6]">
                <li>• agent911 snapshot</li>
                <li>• recent ops events (tail)</li>
                <li>• routing and protection posture</li>
                <li>• compaction signals</li>
                <li>• redacted logs</li>
              </ul>
            </section>

            {/* Response posture */}
            <section className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Response posture
              </div>
              <p className="mt-3 text-[16px] text-[#E6E6E6]">
                ACME reviews bundles in deterministic order:
              </p>
              <div className="mt-2 text-[16px] text-[#9AA3AD]">
                Agent911 → ops events → Sentinel → compaction → routing
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Human Mode */}
            <section className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                What to do
              </div>
              <div className="mt-4 text-[16px] text-[#E6E6E6]">
                If your system looks wrong or stalled:
                <ol className="mt-3 space-y-2 text-[16px] text-[#9AA3AD]">
                  <li>1. Run the support bundle command</li>
                  <li>2. Attach the zip to your support request</li>
                  <li>
                    3. Include a short description of what you observed
                  </li>
                </ol>
              </div>
              <div className="mt-3 rounded-lg bg-[#161A1E] px-4 py-3 font-mono text-[16px] text-[#D98A2B]">
                acme_support_bundle.py -zip
              </div>
              <div className="mt-4 text-[16px] text-[#9AA3AD]">
                We’ll review the evidence and respond with next steps.
              </div>
            </section>

            <section className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
              <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">
                Privacy &amp; safety
              </div>
              <ul className="mt-4 space-y-2 text-[16px] text-[#E6E6E6]">
                <li>• Secrets are redacted</li>
                <li>• openclaw.json is never included</li>
                <li>• Bundle is read-only evidence</li>
                <li>• You control what you send</li>
              </ul>
            </section>
          </>
        )}

        {/* Footer callout */}
        <section className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6 text-center">
          <div className="text-[13px] uppercase tracking-[0.24em] text-[#9AA3AD]">
            Generated artifacts are observational. No automated repair is
            performed.
          </div>
        </section>
      </main>
    </div>
  );
}
