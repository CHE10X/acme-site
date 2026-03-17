import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Triage Unit — ACME Agent Supply Co.",
  description:
    "Read-only triage workflow for degraded OpenClaw environments.",
};

const COMMANDS = [
  "python3 triage.py --snapshot",
  "python3 triage.py --proof-bundle ./triage-proof.zip",
];

const SAFETY_NOTES = [
  "Read-only inspection. No restart, repair, or configuration mutation is performed.",
  "No telemetry is sent externally by default. Output stays with the operator unless explicitly shared.",
  "Proof bundle output is built for handoff under degraded conditions, when memory and patience are both limited.",
];

export default function OCTriageUnitProductPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400">
            Operator Service
          </div>
          <h1 className="mt-3 text-3xl font-bold text-zinc-100 md:text-4xl">
            OpenClaw Triage Unit
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            A read-only triage workflow for operators who need a stable view of
            system condition before making any intervention. It is designed to
            stay safe under degradation and to leave a proof bundle behind that
            another operator can review calmly.
          </p>
          <div className="mt-6 text-sm text-zinc-400">
            Safe under degraded conditions. No telemetry. No automatic repair.
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <h2 className="text-xl font-semibold text-zinc-100">What it does</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-300">
            <p>
              The workflow gathers a local snapshot of the current state, records
              the evidence needed for review, and packages that evidence without
              changing the system it is observing.
            </p>
            <ul className="space-y-2 text-zinc-300">
              {SAFETY_NOTES.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <h2 className="text-xl font-semibold text-zinc-100">Operator commands</h2>
          <div className="mt-4 space-y-3">
            {COMMANDS.map((command) => (
              <pre
                key={command}
                className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-amber-200"
              >
                <code>{command}</code>
              </pre>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6">
          <h2 className="text-xl font-semibold text-zinc-100">When to use it</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
            <p>Use it when the control plane looks wrong, stalled, or partial.</p>
            <p>
              Use it when you need evidence first and action second.
            </p>
            <p>
              Use it when another operator may need to continue the investigation
              from the proof bundle you leave behind.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
