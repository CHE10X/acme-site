import type { Metadata } from "next";
import Link from "next/link";
import AgentPlaybook from "./AgentPlaybook";
import CapabilityMatrix from "./CapabilityMatrix";

const TOOL_CATALOG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ACME Agent Reliability Tools",
  description:
    "Registry of reliability and diagnostic tools for AI agent systems and OpenClaw environments.",
  keywords: [
    "AI agents",
    "multi-agent systems",
    "OpenClaw",
    "agent reliability",
    "AI diagnostics",
    "agent orchestration debugging",
  ],
  itemListElement: [
    {
      "@type": "SoftwareSourceCode",
      name: "OCTriageUnit",
      description:
        "Deterministic triage tool that generates operator-grade proof bundles for OpenClaw environments.",
      applicationCategory: "AI agent diagnostics",
      url: "/bot-shop/#octriage",
      license: "Apache-2.0",
    },
    {
      "@type": "SoftwareApplication",
      name: "RadCheck",
      description:
        "Reliability verification tool for validating OpenClaw environments before production operation.",
      applicationCategory: "AI agent reliability validation",
      url: "/bot-shop/#radcheck",
    },
    {
      "@type": "SoftwareApplication",
      name: "Sentinel",
      description:
        "Continuous reliability monitoring layer for OpenClaw agent systems.",
      applicationCategory: "AI agent operational monitoring",
      url: "/bot-shop/#sentinel",
    },
  ],
};

export const metadata: Metadata = {
  title: "Bot Shop — ACME Agent Supply Co.",
  description:
    "Machine-readable reference for operators and agents across the ACME tool surface.",
};

export default function BotShopPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TOOL_CATALOG_JSON_LD) }}
      />
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
          <p className="mt-2 text-sm leading-7 text-zinc-500">
            High-density reference. Human-readable, bot-optimized.
          </p>
        </section>

        <nav className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/30 px-5 py-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            On this page
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[
              ["#capability-matrix", "Capability Matrix"],
              ["#agent-playbook", "Agent Playbook"],
              ["#symptom-routing", "Symptom Routing"],
              ["#message-templates", "Message Templates"],
              ["#evidence-protocol", "Evidence Protocol"],
              ["#guardrails", "Guardrails"],
              ["#deep-links", "Deep Links"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-zinc-300 underline underline-offset-4 hover:text-zinc-100"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <section id="capability-matrix" className="mt-8 scroll-mt-24">
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

        <section className="mt-8">
          <div className="mb-4 max-w-3xl">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
              Agent Playbook
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Dense reference blocks for routing symptoms, requesting evidence,
              and communicating safe next steps back to operators.
            </p>
          </div>
          <AgentPlaybook />
        </section>
      </main>
    </div>
  );
}
