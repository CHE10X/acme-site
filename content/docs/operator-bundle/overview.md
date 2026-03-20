---
title: Operator Bundle — The Complete Resilience Layer
product: operator-bundle
tier: BUNDLE
price: $29/month
---

# Operator Bundle — The Complete Resilience Layer

The Operator Bundle is the full resilience layer, fully wired. Detection triggers readiness. Readiness triggers recovery. Everything runs automatically from the moment something goes wrong.

**$29/month** · Includes: Sentinel, InfraWatch, Watchdog, Lazarus, Agent911, Recall

---

## What Changes When You Have the Full Layer

Individual products work standalone — each one does its job and emits events to the Resilience Event Bus. But nothing consumes those events until the next product is in place.

The Operator Bundle wires everything end-to-end:

```
Sentinel ──┐
InfraWatch ─┼──→ REB ──→ Lazarus ──→ recovery_blueprint.json ──→ Agent911
Watchdog ──┘              ↑                                          ↓
                      Bonfire ─────────────────────────────→ Commander / QM
```

**Detection fires.** Sentinel catches a stall. InfraWatch catches a config drift. Watchdog catches a dead process. Any of them emit an event to the Resilience Event Bus.

**Readiness runs.** Lazarus receives the event, runs a recovery readiness scan, and writes a `recovery_blueprint.json`. It confirms your system is recoverable before anything touches it.

**Recovery executes.** Agent911 receives the blueprint and executes. Your operator dashboard shows exactly what ran and why.

**The cognitive stack knows.** Bonfire routes detection events to Commander and Quartermaster. Your governance layer sees what happened without you having to relay it.

---

## What's Included

| Product | Layer | What it watches |
|---------|-------|----------------|
| **Sentinel** | Detection | Runtime behavior — stalls, silence, compaction pressure |
| **InfraWatch** | Detection | Infrastructure config — ingest chains, daemon configs, routing |
| **Watchdog** | Detection | Process liveness — heartbeat, port probes, stall detection |
| **Lazarus** | Readiness | Recovery blueprint — confirms recoverability before any action |
| **Agent911** | Recovery | Executes recovery from Lazarus blueprint. Read-only cockpit in v0.1. |
| **Recall** | Control | Manual intervention surface — `recall status --watch` for ambient awareness |

**Also included:** SphinxGate is available separately as the access control layer (Layer 0).

---

## Individual Products vs. The Bundle

| Scenario | What you get |
|----------|-------------|
| Buy Sentinel only | Runtime events emitted to REB. Nothing consuming them yet. Same protection as today, better structured. |
| Buy Sentinel + InfraWatch + Watchdog | Full detection coverage. Events flowing to REB. Still no readiness or recovery trigger. |
| Add Lazarus | Detection now triggers readiness scans. First real integration value — you know you can recover before you need to. |
| Full Operator Bundle | Detection → Readiness → Recovery, all wired. Bonfire routes events to your cognitive stack. The whole point. |

**Individual SKUs are entry points. The Bundle is the destination.**

---

## The Resilience Event Bus

Every product in the bundle reads and writes to a shared **Resilience Event Bus (REB)** — an append-only NDJSON file installed automatically with your first resilience product.

Schema: `{ts, source, event_type, severity, payload}`

The REB is what makes the layer a layer — a shared event contract that lets products trigger each other without tight coupling. No orchestrator daemon. No shared process. Detection emits; Lazarus subscribes; Agent911 executes. The sequence emerges from subscriptions.

---

## What the Bundle Does NOT Do

- No autonomous healing in Agent911 v0.1 — it executes from a blueprint, with operator visibility
- No modification of your OpenClaw config or agent behavior without operator action
- No guarantee of recovery in all scenarios — Lazarus confirms recoverability before Agent911 acts; if recoverability isn't confirmed, Agent911 does not proceed

---

## Getting Started

1. Install via the Operator Bundle install route:
   ```bash
   curl -fsSL https://acmeagentsupply.com/install/operator-bundle | ACME_LICENSE_KEY=your_key bash
   ```

2. Verify all five products are running:
   ```bash
   triage          # Stack reliability score
   bonfire status  # Confirm REB events are flowing
   ```

3. Open Agent911 to confirm your operator dashboard is receiving events.

---

## Support

docs.acmeagentsupply.com · support@acmeagentsupply.com
