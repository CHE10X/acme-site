---
title: InfraWatch — Infrastructure Drift Detection
product: infrawatch
tier: OPERATOR_BUNDLE
availability: Included in the Operator Bundle. Not sold standalone.
---

# InfraWatch — Infrastructure Drift Detection

InfraWatch detects configuration drift in your agent stack's infrastructure — ingest chains, daemon configs, and routing — before unexpected changes silently degrade reliability.

## The Problem InfraWatch Solves

Agent stacks depend on infrastructure that rarely changes on purpose, but frequently changes by accident. A launchd plist gets modified. A Tailscale route shifts. A Gmail ingest chain loses a filter. None of these changes are visible at the application layer — the agent appears healthy until it isn't.

Standard monitoring tells you an agent is alive. InfraWatch tells you whether the infrastructure underneath it is still the infrastructure you deployed.

## What InfraWatch Does

- Monitors infrastructure configuration artifacts for unexpected changes
- Detects baseline deviations — config state that differs from the last known-good snapshot
- Identifies drift patterns that precede reliability incidents
- Emits events to the Resilience Event Bus (REB) — the shared event backbone for the detection layer
- Surfaces drift signals to Agent911 and the broader reliability stack

## What InfraWatch Does NOT Do

- No autonomous config correction
- No destructive operations on config artifacts
- No modification of runtime state without operator action
- No coverage of agent memory or cognitive state — that's Elixir's job

---

## What InfraWatch Monitors

**Ingest chain drift** — Gmail filters, webhook routes, and data pipeline configs that feed your agents. Changes here silently starve agents of the inputs they expect.

**Daemon config drift** — launchd plists, systemd units, and process supervision configs. A modified plist can change how an agent starts, restarts, or fails silently.

**Network routing drift** — Tailscale routes, proxy configs, and network topology changes that affect how agents reach services and each other.

**Baseline deviation** — any config artifact whose content diverges from the last known-good snapshot without a corresponding operator action.

---

## The Resilience Event Bus

InfraWatch is part of ACME's Detection layer, alongside Sentinel and Watchdog. All three products write to a shared **Resilience Event Bus (REB)** — an append-only event file with a common schema.

```
{ts, source, event_type, severity, payload}
```

Events from InfraWatch are consumed by:
- **Lazarus** — triggers readiness scans when severity crosses threshold
- **Agent911** — reads the unified event stream for incident response
- **Bonfire** — routes detection events to the cognitive stack (Commander, Quartermaster)

> **If you're running InfraWatch standalone:** REB is installed and receiving InfraWatch events. To consume those events — triggering readiness scans and recovery — add Lazarus and Agent911, or install the Operator Bundle.

---

## Stack Position

InfraWatch is the **infra config watch surface** in the Detection sublayer of the Resilience Layer.

```
Resilience Layer
├── Detection
│   ├── Sentinel      ← runtime behavior (stalls, silence, compaction)
│   ├── InfraWatch    ← infrastructure config (daemons, ingest, routing)
│   └── Watchdog      ← process liveness (heartbeat, port probes)
├── Readiness
│   └── Lazarus       ← recovery blueprint on detection trigger
└── Recovery
    └── Agent911      ← executes recovery from blueprint
```

InfraWatch does not overlap with Elixir. Elixir manages agent memory surface (context injection, DIGEST hydration). InfraWatch monitors infrastructure configuration. Different layers, different signals.

---

## Who Needs InfraWatch

Operators running:
- Agents with persistent ingest dependencies (email, webhooks, data pipelines)
- Long-running daemons where config drift accumulates invisibly
- Multi-agent stacks where a single routing change can cascade across agents

InfraWatch is the layer that catches the config change you didn't make — before your agents start behaving as if you did.

---

## Availability

InfraWatch is included in the **Operator Bundle** ($29/month). It is not sold as a standalone product.

The Operator Bundle includes the complete wired resilience layer: Sentinel, InfraWatch, Watchdog (detection) → Lazarus (readiness) → Agent911 (recovery).

→ [Operator Bundle overview](/docs/operator-bundle/overview)
