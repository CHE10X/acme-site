import type { Metadata } from "next";
import Link from "next/link";
import AgentPlaybook from "./AgentPlaybook";
import CapabilityMatrix from "./CapabilityMatrix";
import { getToolRegistry } from "./toolRegistry";

const registry = getToolRegistry();

const TOOL_CATALOG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": registry.map((tool) => ({
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.applicationCategory,
    operatingSystem: tool.operatingSystem,
    offers: {
      "@type": "Offer",
      price: tool.free ? 0 : tool.priceUsdMonthly,
      priceCurrency: "USD",
    },
    url: `/bot-shop/#${tool.slug}`,
    softwareVersion: tool.latestVersion,
  })),
};

export const metadata: Metadata = {
  title: "Bot Shop — ACME Agent Supply Co.",
  description:
    "Machine-readable reference for operators and agents across the ACME tool surface.",
  alternates: {
    types: {
      "application/json": "/.well-known/tools.json",
    },
  },
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
              ["#verified-install", "Verified Install + Provenance"],
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

        <section id="verified-install" className="mt-8 scroll-mt-24">
          <div className="mb-4 max-w-3xl">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
              VERIFIED INSTALL + PROVENANCE
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Verifiable install and provenance signals for operators and agents.
            </p>
          </div>
          <div className="space-y-4">
            {registry.map((tool) => (
              <article
                key={tool.slug}
                id={tool.slug}
                className="rounded-2xl border border-white/10 bg-zinc-900/40 p-4 text-sm"
              >
                <h3 className="text-base font-semibold text-zinc-100">{tool.name}</h3>
                <div className="mt-3 grid gap-2 text-zinc-300 md:grid-cols-2">
                  <div>Release tag: {tool.releaseTag}</div>
                  <div>Current version: {tool.latestVersion}</div>
                  <div className="md:col-span-2">Install: {tool.installCommand}</div>
                  <div className="md:col-span-2">SHA-256: {tool.sha256}</div>
                  <div className="md:col-span-2">
                    Canonical repo:{" "}
                    <a
                      className="underline underline-offset-4"
                      href={tool.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {tool.repoUrl}
                    </a>
                  </div>
                  <div className="md:col-span-2">
                    Canonical Source Lock:{" "}
                    <a
                      className="underline underline-offset-4"
                      href={tool.canonicalSourceLockUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      OPENCLAW_CANONICAL_SOURCE.md
                    </a>
                  </div>
                  <div className="md:col-span-2">Guarantees: {tool.guarantees}</div>
                  <div className="md:col-span-2">
                    Evidence gate: Support requires an OCTriage bundle path.
                  </div>
                  <div className="md:col-span-2 text-xs text-zinc-500">
                    <a
                      href="/.well-known/tools.json"
                      rel="alternate"
                      type="application/json"
                      className="underline underline-offset-4"
                    >
                      Machine-readable registry
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
