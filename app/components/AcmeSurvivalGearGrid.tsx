"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Shield, Dog, Landmark, Siren, LocateFixed } from "lucide-react";
import HRChatWidget from "./HRChatWidget";
import TierBadge from "./TierBadge";
import ProductModal from "./ProductModal";
import NotifyModal from "./NotifyModal";
import FieldMap from "./FieldMap";

const TIER_BY_PRODUCT = {
  RadCheck: "FREE",
  Lazarus: "FREE",
  Sentinel: "CORE",
  Watchdog: "CORE",
  SphinxGate: "CORE",
  DriftGuard: "CORE",
  Transmission: "CORE",
  Agent911: "RECOVERY",
} as const;

type Tier = (typeof TIER_BY_PRODUCT)[keyof typeof TIER_BY_PRODUCT];

type Product = {
  id: string;
  title: string;
  unitLabel: string;
  tier: Tier;
  subtitle: string;
  positioning: string;
  bullets: string[];
  doesNot?: string[];
  optionalOutputs?: string;
  bestFor: string;
  ctaLabel: string;
  docsHref?: string;
  installSnippet?: string;
  codename?: string;
  description: string;
  flavor: string;
  icon: React.ReactNode;
};

const PRODUCTS: Product[] = [
  {
    id: "findmyagent",
    title: "FindMyAgent",
    unitLabel: "Operator Beta",
    tier: "CORE",
    subtitle: "Know what your agents are doing — and what they aren’t.",
    positioning:
      "Real-time presence, progress signals, and “needs attention” flags for your agent fleet. Built into Agent911 for operators who need confidence, not guesswork.",
    bullets: [
      "live agent presence state",
      "clear stalled / blocked signals",
      "last activity + heartbeat age",
    ],
    optionalOutputs: "Included with Agent911 operator surface.",
    bestFor: "Operators needing fast fleet awareness.",
    ctaLabel: "View in Agent911",
    docsHref: "/docs/findmyagent/overview",
    installSnippet: "Included with Agent911",
    codename: "FINDMYAGENT",
    description:
      "Real-time presence, progress signals, and “needs attention” flags for your agent fleet. Built into Agent911 for operators who need confidence, not guesswork.",
    flavor: "Included with Agent911 operator surface.",
    icon: <LocateFixed className="w-6 h-6" />,
  },
  {
    id: "radcheck",
    title: "RadCheck",
    unitLabel: "RADIATION SCAN UNIT",
    tier: TIER_BY_PRODUCT.RadCheck,
    subtitle: "Early warning for hidden instability.",
    positioning:
      "RadCheck performs a fast, read-only inspection of your OpenClaw environment to identify early reliability risks. It analyzes runtime signals, recent patterns, and config hygiene to highlight where systems may degrade. RadCheck does not modify your environment — it surfaces evidence and prioritizes what deserves operator attention.",
    bullets: [
      "baseline scan across 5 reliability domains",
      "weighted risk scoring 0–100 with guardrails",
      "enriched findings with fix prompts",
    ],
    doesNot: ["does NOT mutate config — read-only scan only"],
    optionalOutputs: "Risk score, risk band, and per-finding remediation prompts.",
    bestFor: "Teams validating new agent runs.",
    ctaLabel: "Run scan",
    docsHref: "/docs/radcheck/score-explained",
    installSnippet: "acme install radcheck",
    codename: "RADCHECK",
    description:
      "Agents feel flaky or slow? RadCheck scans your OpenClaw runtime and surfaces early risk signals before stalls, drift, or silent failures hit.",
    flavor: "Something feels off? Run the scan.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "lazarus",
    title: "Lazarus",
    unitLabel: "REANIMATION UNIT",
    tier: TIER_BY_PRODUCT.Lazarus,
    subtitle: "Backup readiness you can trust.",
    positioning:
      "Lazarus verifies whether your agent environment can actually recover when failures occur. It evaluates backup coverage, restore assumptions, and recovery gaps so operators have evidence-based confidence before an incident forces the test. Lazarus is read-only and does not modify your live system.",
    bullets: [
      "backup coverage mapping",
      "restore viability checks",
      "integrity verification",
      "recovery readiness scoring",
    ],
    doesNot: ["does NOT perform autonomous restoration — operator-driven only"],
    optionalOutputs:
      "Produces a resurrection readiness score and highlights gaps that could block successful recovery.",
    bestFor: "Teams that need evidence-based recovery confidence",
    ctaLabel: "Verify Recovery",
    docsHref: "/docs/lazarus/overview",
    installSnippet: "acme install lazarus",
    codename: "LAZARUS",
    description:
      "System feels brittle or exposed? Lazarus verifies backups and restore assumptions so you know recovery will work before an incident forces the test.",
    flavor: "Backups don’t count until they restore.",
    icon: <Siren className="w-6 h-6" />,
  },
  {
    id: "sentinel",
    title: "Sentinel",
    unitLabel: "CONTINUOUS GUARDRAIL UNIT",
    tier: TIER_BY_PRODUCT.Sentinel,
    subtitle: "Detect silent failures live.",
    positioning:
      "Sentinel monitors your OpenClaw agents during execution and surfaces real-time reliability signals when runs become slow, stuck, or behaviorally inconsistent. It flags silent failures, looping/stall patterns, and output deviations as they emerge, and records evidence so operators can confirm what changed. Sentinel is continuous detection and proof — it does not perform autonomous recovery or modify your system.",
    bullets: [
      "detects silent failures",
      "flags stuck / looping runs",
      "deviation alerts",
      "proof bundle output",
    ],
    doesNot: ["does NOT perform autonomous recovery or modify your system"],
    optionalOutputs:
      "Produces live alerts and an operator-ready proof bundle with timelines, triggers, and context.",
    bestFor: "Always-on protection for live agents",
    ctaLabel: "Enable Sentinel",
    docsHref: "/docs/sentinel/overview",
    installSnippet: "acme install sentinel",
    codename: "SENTINEL",
    description: "Continuous detection of silent failures, stalls, and output deviations.",
    flavor: "When agents quietly go off-script, Sentinel notices first.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "watchdog",
    title: "Watchdog",
    unitLabel: "Heartbeat Unit",
    tier: TIER_BY_PRODUCT.Watchdog,
    subtitle: "Know when runtimes go dark.",
    positioning:
      "Watchdog keeps long-running agents alive with heartbeat logging and duplicate run prevention built for cron and schedulers.",
    bullets: [
      "heartbeat logging",
      "lockfile protection",
      "cron-safe execution",
      "duplicate run prevention",
    ],
    optionalOutputs: "Uptime ledger and incident pings.",
    bestFor: "Schedulers, queues, and always-on agents.",
    ctaLabel: "Enable Watchdog",
    docsHref: "#watchdog",
    installSnippet: "acme install watchdog",
    codename: "WATCHDOG",
    description: "Liveness monitoring for long-running and scheduled agents.",
    flavor: "Because long-running agents have a habit of dying silently.",
    icon: <Dog className="w-6 h-6" />,
  },
  {
    id: "sphinxgate",
    title: "SphinxGate",
    unitLabel: "Gate Control",
    tier: TIER_BY_PRODUCT.SphinxGate,
    subtitle: "Route tokens with discipline.",
    positioning:
      "SphinxGate enforces lane policies so background work cannot starve interactive runs or overrun budgets.",
    bullets: [
      "interactive vs background lane routing",
      "token budget enforcement",
      "routing audit trail",
    ],
    doesNot: ["does NOT modify provider config — routing policy only"],
    optionalOutputs: "Lane audit trail and budget snapshots.",
    bestFor: "Teams scaling multiple agent lanes.",
    ctaLabel: "Set Gate Rules",
    docsHref: "/docs/sphinxgate/overview",
    installSnippet: "acme install sphinxgate",
    codename: "SPHINXGATE",
    description: "Token discipline and lane enforcement for model routing.",
    flavor: "Keep background runs from eating the whole budget.",
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    id: "agent911",
    title: "Agent911",
    unitLabel: "Recovery Unit",
    tier: TIER_BY_PRODUCT.Agent911,
    subtitle: "The control plane for agent reliability.",
    positioning:
      "Agent911 unifies system stability, Sentinel protection activity, and FindMyAgent visibility into one operational surface — so you know what your agents are doing, and when to act.",
    bullets: [
      "unified reliability snapshot",
      "real-time agent presence awareness",
      "protection proofs and history",
      "guided triage when things feel off",
    ],
    doesNot: ["does NOT mutate config / no autonomous recovery / human-in-the-loop only"],
    optionalOutputs: "Observational by design. No autonomous changes.",
    bestFor: "Operators needing unified visibility and guided triage.",
    ctaLabel: "Open Control Plane",
    docsHref: "/docs/agent911/snapshot-explained",
    installSnippet: "acme install agent911",
    codename: "AGENT911",
    description: "Unified visibility and guided triage for agent reliability.",
    flavor: "See what's happening. Act with confidence.",
    icon: <Siren className="w-6 h-6" />,
  },
];

const getProductById = (id: string) =>
  PRODUCTS.find((product) => product.id === id) || null;

type FieldUnit = {
  id: string;
  title: string;
  unitLabel: string;
  subtitle: string;
  bullets: string[];
  icon: React.ReactNode;
};

const FIELD_UNITS: FieldUnit[] = [
  {
    id: "driftguard",
    title: "DriftGuard",
    unitLabel: "DRIFT CONTROL UNIT",
    subtitle: "Monitoring long-horizon drift under live load.",
    bullets: [
      "behavioral drift snapshots",
      "policy deviation flags",
      "run-to-run delta tracking",
      "audit-ready traces",
    ],
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "transmission",
    title: "Transmission",
    unitLabel: "SIGNAL ROUTING UNIT",
    subtitle: "Cross-agent signal routing with guardrails.",
    bullets: [
      "signal normalization",
      "lossy vs lossless lanes",
      "priority routing rules",
      "operator override hooks",
    ],
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    id: "watchdog",
    title: "Watchdog",
    unitLabel: "HEARTBEAT UNIT",
    subtitle: "Heartbeat supervision across runtimes.",
    bullets: [
      "liveness probes",
      "cron-safe cadence checks",
      "lock collision alerts",
      "dead-run detection",
    ],
    icon: <Dog className="w-6 h-6" />,
  },
];

export default function AcmeSurvivalGearGrid() {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [notifyUnitId, setNotifyUnitId] = useState<string | null>(null);

  const activeProduct = useMemo(
    () => PRODUCTS.find((product) => product.id === activeProductId) || null,
    [activeProductId]
  );

  const freeTools = useMemo(
    () =>
      ["radcheck", "lazarus"].map((id) => getProductById(id)).filter(
        (product): product is Product => Boolean(product)
      ),
    []
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header + Hero */}
        <header className="mb-10">
          <div className="flex flex-col gap-4 border-b border-zinc-800/80 pb-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/brand/acme-logo.png"
                alt="ACME"
                width={260}
                height={104}
                className="h-20 w-auto rounded-sm opacity-90 transition duration-300 hover:opacity-100 md:h-24"
                priority
              />
              <div>
                <div className="text-xs text-amber-400 tracking-[0.32em] uppercase">
                  Field Supply Division
                </div>
                <div className="text-sm text-zinc-400 tracking-[0.08em] uppercase">
                  Authorized operators only
                </div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.34em] text-zinc-500">
              Property of ACME • Serial 77A
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col">
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/50 px-6 py-6 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px]"></div>
                <div className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-2">
                  Hazard Notice
                </div>
                <div className="w-full overflow-hidden rounded">
                  <span className="hazard-shimmer hazard-stripe block h-1 w-full" />
                </div>
                <h1 className="mt-5 max-w-2xl text-left text-3xl md:text-4xl font-bold tracking-[0.04em] leading-tight">
                  Agent Field Survival Gear
                </h1>
                <p className="mt-2 max-w-2xl text-zinc-300 text-base md:text-lg">
                  Tools to keep your agents predictable when real workloads begin.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                  It worked. Now make it reliable.
                </p>
                <p className="mt-3 text-xs text-zinc-500">
                  Built for real-world agent runtimes and OpenClaw-class stacks.
                </p>
              </div>
              <div className="mt-8 mb-4">
                <div className="relative h-[280px] sm:h-[300px] lg:h-[340px] flex items-center justify-center">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.85)_0%,rgba(9,9,11,0.65)_45%,rgba(9,9,11,0)_75%)]" />
                  <img
                    src="/brand/acme-field-goat.png"
                    alt="ACME Field Insignia"
                    className="relative z-10 opacity-[0.98] h-auto max-h-[230px] sm:max-h-[250px] lg:max-h-[290px] w-auto select-none pointer-events-none translate-y-6 sm:translate-y-5 lg:translate-y-8"
                  />
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:sticky lg:top-20 w-full">
              <HRChatWidget onOpenGear={(id) => setActiveProductId(id)} />
            </div>
          </div>
        </header>

        {/* Section Label */}
        <div className="mb-6 rounded-2xl border border-zinc-600/80 bg-zinc-200/25 px-5 py-4">
          <p className="text-amber-400 text-sm tracking-widest uppercase mb-1">
            ACME Agent Supply Co
          </p>
          <p className="text-zinc-300 text-sm">
            Standard issue gear for reliability-minded operators.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["radcheck", "sentinel", "sphinxgate", "agent911"] as const).map(
            (id) => {
              const product = getProductById(id);
              if (!product) return null;
              return (
                <GearCard
                  key={product.id}
                  id={product.id}
                  icon={product.icon}
                  badge={product.unitLabel}
                  codename={product.codename}
                  title={product.title}
                  tier={product.tier}
                  description={product.description}
                  flavor={product.flavor}
                  bullets={product.bullets}
                  doesNot={product.doesNot}
                  onOpen={() => setActiveProductId(product.id)}
                  docsHref={product.docsHref}
                />
              );
            }
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-5 py-5">
          <div className="overflow-hidden rounded mb-4 opacity-80">
            <span className="hazard-shimmer hazard-stripe block h-1 w-full" />
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-amber-400">
                Start Free
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                No credit card. Run a scan. Verify recovery readiness.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {freeTools.map((product) => (
              <FreeToolCard
                key={product.id}
                product={product}
                onOpen={() => setActiveProductId(product.id)}
              />
            ))}
          </div>
        </div>

        <section className="mt-4 rounded-2xl border border-zinc-800/70 bg-zinc-950/60 px-5 py-5">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400 mb-3">
            Operator Beta
          </div>
          <div className="grid grid-cols-1 gap-4 items-start">
            <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.32em] text-zinc-400">
                    Operator Beta
                  </div>
                  <h3 className="text-2xl font-semibold text-zinc-100 mt-2">
                    FindMyAgent
                  </h3>
                  <p className="mt-2 text-[15px] text-zinc-300 leading-relaxed">
                    Know what your agents are doing — and what they aren’t.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-800/70 flex items-center justify-center text-zinc-300 transition duration-150 ease-out group-hover:text-amber-300">
                  <LocateFixed className="w-6 h-6" />
                </div>
              </div>
              <p className="mt-3 text-[15px] text-zinc-300 leading-relaxed">
                Real-time presence, progress signals, and “needs attention”
                flags for your agent fleet. Built into Agent911 for operators
                who need confidence, not guesswork.
              </p>
              <ul className="mt-3 space-y-1 text-[15px] text-zinc-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-[2px]">•</span>
                  <span>Live agent presence state</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-[2px]">•</span>
                  <span>Clear stalled / blocked signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-[2px]">•</span>
                  <span>Last activity + heartbeat age</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveProductId("agent911")}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
                >
                  View in Agent911
                </button>
                <a
                  href="/docs/findmyagent/overview"
                  className="text-sm text-amber-300 hover:text-amber-200 transition"
                >
                  Learn more →
                </a>
              </div>
              <div className="mt-3 text-xs text-zinc-500">
                Included with Agent911 operator surface.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/70 bg-zinc-950/60 px-5 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
            Field Development
          </div>
          <p className="mt-2 text-sm text-zinc-500 max-w-2xl">
            Units currently in field testing. Capabilities expanding as
            real-world data accumulates.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {FIELD_UNITS.map((unit) => (
              <GearCard
                key={unit.id}
                id={unit.id}
                icon={unit.icon}
                badge={unit.unitLabel}
                title={unit.title}
                tier="CORE"
                description={unit.subtitle}
                flavor=""
                bullets={unit.bullets}
                variant="field"
                onNotify={() => setNotifyUnitId(unit.id)}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800/70 bg-zinc-950/60 px-5 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-5 py-5">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Install in minutes
              </div>
              <p className="mt-2 text-[15px] text-zinc-300 leading-relaxed">
                Bring the ACME reliability stack online with a single command.
                The installer enables RadCheck, Sentinel, and Agent911 in
                observational mode — without modifying your existing
                configuration.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="/docs/quickstart/5-minute"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
                >
                  Get started in 5 minutes
                </a>
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Idempotent. Read-safe. No gateway changes.
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-5 py-5">
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-400">
                Something feel off?
              </div>
              <p className="mt-2 text-[15px] text-zinc-300 leading-relaxed">
                Generate a secure support bundle and we’ll help you triage what’s
                happening inside your agent system. No guesswork. No screenshots.
              </p>
              <div className="mt-3 text-sm text-amber-200 font-mono">
                acme_support_bundle.py --zip
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="/docs/support/when-things-feel-off"
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-400/50 px-4 py-2 text-sm text-amber-200 transition hover:border-amber-400 hover:text-amber-100"
                >
                  Generate support bundle
                </a>
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Redaction applied automatically. Secrets are never included.
                </div>
              </div>
            </div>
          </div>
        </section>

        <FieldMap />

        {/* Footer line */}
        <div className="mt-8 text-center text-zinc-500 text-sm">
          Picks. Shovels. Guardrails. Standard issue for autonomous builders.
        </div>
      </div>
      {activeProduct ? (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProductId(null)}
        />
      ) : null}
      {notifyUnitId ? (
        <NotifyModal onClose={() => setNotifyUnitId(null)} />
      ) : null}
    </div>
  );
}

function GearCard({
  id,
  icon,
  badge,
  codename,
  title,
  tier,
  description,
  flavor,
  bullets,
  doesNot,
  onOpen,
  docsHref,
  variant = "default",
  onNotify,
}: {
  id: string;
  icon: React.ReactNode;
  badge: string;
  codename?: string;
  title: string;
  tier: "FREE" | "CORE" | "ADVANCED" | "RECOVERY";
  description: string;
  flavor: string;
  bullets: string[];
  doesNot?: string[];
  onOpen?: () => void;
  docsHref?: string;
  variant?: "default" | "field";
  onNotify?: () => void;
}) {
  const isField = variant === "field";
  return (
    <article
      id={id}
      className={`group relative scroll-mt-24 rounded-xl p-6 flex h-full flex-col transition duration-200 ease-out ${
        isField
          ? "bg-zinc-900/50 border border-dashed border-zinc-700/70 opacity-85 hover:opacity-100 hover:bg-zinc-900/60 hover:-translate-y-0.5"
          : "bg-zinc-900 hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-2xl hover:ring-1 hover:ring-amber-500/30"
      }`}
    >
      {/* Badge */}
      {isField ? (
        <div className="absolute top-4 right-4 text-[10px] tracking-[0.22em] uppercase bg-zinc-800/80 text-zinc-300 px-2 py-1 rounded-full border border-zinc-700/80">
          Field Testing
        </div>
      ) : (
        <div className="absolute top-4 right-4 text-[11px] tracking-widest uppercase bg-amber-500/10 text-amber-400 px-2 py-1 rounded transition duration-150 ease-out group-hover:translate-x-0.5 group-hover:opacity-100">
          {badge}
        </div>
      )}

      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 transition duration-150 ease-out group-hover:translate-x-0.5 group-hover:opacity-100">
        {icon}
      </div>

      {/* Title + Codename */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-2xl font-semibold">{title}</h3>
          {!isField && codename ? (
            <span className="text-[10px] tracking-widest uppercase text-zinc-500">
              {codename}
            </span>
          ) : null}
        </div>
        {!isField ? <TierBadge tier={tier} /> : null}
      </div>

      {isField ? (
        <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500 mb-2">
          {badge}
        </div>
      ) : null}

      {/* Description */}
      <p className="text-zinc-300 mb-3 text-[15px] leading-relaxed">
        {description}
      </p>

      {/* Flavor */}
      {!isField ? (
        <p className="text-zinc-500 italic text-[15px] leading-relaxed mb-4">
          {flavor}
        </p>
      ) : null}

      {/* Bullets — does */}
      <ul className="space-y-1 text-[15px] text-zinc-300 leading-relaxed mb-3 flex-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-amber-400 mt-[2px]">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Bullets — does NOT */}
      {!isField && doesNot && doesNot.length > 0 && (
        <ul className="space-y-1 text-[15px] leading-relaxed mb-4">
          {doesNot.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-zinc-500">
              <span className="text-red-500/60 mt-[2px]">✕</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div
        className={`flex items-center mt-auto pt-2 ${
          isField ? "justify-end" : "justify-between"
        }`}
      >
        {isField ? (
          <button
            onClick={onNotify}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            Notify When Online
          </button>
        ) : (
          <>
            <button
              onClick={onOpen}
              className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium px-4 py-2 rounded-lg transition duration-200 ease-out active:translate-y-[1px] active:shadow-none shadow-md"
            >
              View Gear
              <span className="transition duration-200 ease-out group-hover:translate-x-1">
                →
              </span>
            </button>
            {docsHref ? (
              <a
                href={docsHref}
                className="text-amber-400 hover:text-amber-300 text-sm transition duration-200 ease-out"
              >
                Learn more →
              </a>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}

function FreeToolCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  const fallbackCta =
    product.id === "radcheck" ? "Run scan" : "Verify recovery";
  const ctaLabel = product.ctaLabel || fallbackCta;

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      className="group w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-4 text-left transition duration-150 ease-out hover:border-zinc-700 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-100">
            {product.title}
          </div>
          <div className="mt-1 text-xs text-zinc-400">{product.subtitle}</div>
        </div>
        <TierBadge tier={product.tier} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          {product.unitLabel}
        </div>
        <div className="flex items-center gap-3">
          {product.docsHref && (
            <a
              href={product.docsHref}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              Learn more →
            </a>
          )}
          <button
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
