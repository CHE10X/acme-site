import type { Metadata } from "next";
import CapabilityMatrix from "./CapabilityMatrix";

export const metadata: Metadata = {
  title: "Bot Shop — ACME Agent Supply Co.",
  description:
    "Machine-readable reference for operators and agents across the ACME tool surface.",
};

export default function BotShopPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className="max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400">
            Reference Surface
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-zinc-100">
            Bot Shop
          </h1>
          <p className="mt-3 text-base text-zinc-300">
            Machine-readable reference for operators and agents.
          </p>
          <p className="mt-2 text-sm leading-7 text-zinc-400">
            Use this page to map symptoms to the right ACME tool with correct
            scope and guardrails.
          </p>
        </section>

        <section className="mt-10">
          <div className="mb-4 max-w-3xl">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
              Capability Matrix
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Core tool scope, surfaces, and guardrails for first-pass routing.
            </p>
          </div>
          <CapabilityMatrix />
        </section>

        <section className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-zinc-900/30 px-5 py-5">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
            Agent Playbook (vNext)
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            This section will provide agent-facing instructions for mapping
            symptoms to actions and for communicating results back to human
            operators.
          </p>
          <p className="mt-2 text-sm leading-7 text-zinc-400">
            The initial release keeps this intentionally narrow so the matrix can
            act as a stable reference surface first.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            vNext
          </p>
        </section>
      </main>
    </div>
  );
}
