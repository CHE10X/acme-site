import Link from "next/link";

const NOTES = [
  "Capture evidence before recovery.",
  "Deterministic artifacts beat screenshots.",
  "Runtime drift precedes visible failure.",
  "Heartbeats are not equivalent to health.",
];

export default function OperatorsTalePage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
        <div className="inline-flex rounded border border-zinc-700 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-400">
          Field Document
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-100">
          Operator&apos;s Tale
        </h1>
        <p className="mt-2 text-zinc-300">
          How the reliability stack was built and why it stays operator-safe.
        </p>

        <div className="mt-8 space-y-6 rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5">
          <section>
            <h2 className="text-lg font-medium text-zinc-100">Field Log · The Problem</h2>
            <p className="mt-2 text-zinc-300">
              AI agent systems fail quietly before alarms trigger.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-medium text-zinc-100">Field Doctrine</h2>
            <blockquote className="mt-2 rounded-lg border border-amber-400/30 bg-zinc-900/70 px-4 py-3 text-zinc-200">
              Capture evidence before recovery. Proof beats memory.
            </blockquote>
          </section>
          <section>
            <h2 className="text-lg font-medium text-zinc-100">Field Notes</h2>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
              {NOTES.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-6 text-sm text-zinc-400">
          Next:{" "}
          <Link href="/docs/octriage/overview" className="text-amber-300 hover:text-amber-200">
            Start with OpenClaw Triage Unit
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
