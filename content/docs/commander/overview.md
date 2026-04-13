---
title: Commander v2 — Policy Engine
product: commander
tier: CORE
status: v2
---

# Commander v2

> **Version:** v2 — Unified governance coordinator. Reads load signals from Transmission, Quartermaster, and CLS. Computes policy. Gates dispatch.

Commander is the policy brain for your agent stack. Every dispatch decision — which tier runs, which agents are throttled, what happens when the fleet is under load — flows through Commander's policy engine.

Think of it as the control plane that governs the control plane.

---

## The Problem

Without centralized policy governance, load responses are fragmented. Transmission detects a STORM. Quartermaster pauses missions. Agents self-throttle. Every system acts independently, with no unified view of what's actually safe to run.

Commander solves this by being the single point of policy truth. It reads all signals, computes one policy document, and answers one question for every dispatch request: *is this allowed right now?*

---

## How Commander Works

### 1. Signal Aggregation

Commander reads three input streams:

| Signal | Source | What it measures |
|--------|--------|-----------------|
| Backpressure state | Transmission Load Governor | Provider 429 rate, fleet CLS pressure, active agent count |
| CLS scores | CLS Scanner | Per-agent session burden (composite 0–100) |
| Health projections | Quartermaster v2 | Mission health, fleet summary, blocked/at-risk entities |

It computes an **effective load state** — the highest-severity state across all three signals. If one signal is CRITICAL and the others are CLEAR, the effective state is CRITICAL.

### 2. Policy Computation

From the effective load state, Commander produces a policy document:

```json
{
  "schema_version": "commander_v2_policy_v1",
  "state": "PRESSURED",
  "as_of": "2026-03-30T10:00:00Z",
  "recommendations": ["stop_retries", "single_provider_lane", "throttle_background"],
  "priority_tiers": ["ops_head", "active_mission", "standard", "background", "cron"],
  "policy": {
    "tiers": {
      "ops_head":        { "mode": "run",     "dispatch_allowed": true,  "rate_limit": 1.0 },
      "active_mission":  { "mode": "run",     "dispatch_allowed": true,  "rate_limit": 1.0 },
      "standard":        { "mode": "run",     "dispatch_allowed": true,  "rate_limit": 1.0 },
      "background":      { "mode": "throttle","dispatch_allowed": true,  "rate_limit": 0.5 },
      "cron":            { "mode": "paused",  "dispatch_allowed": false, "rate_limit": 0.0 }
    }
  }
}
```

Policy is deterministic — same signals produce the same policy. No AI reasoning on the hot path.

### 3. Dispatch Gating

Every agent that wants to dispatch a task calls Commander's gate check:

```
can_dispatch(agent_id, priority_tier, active_execution_runs) → allow | deny + reason
```

Commander checks:
- Is this tier allowed under current load state?
- Is this agent within its concurrency ceiling for this tier?
- Is this tier in a throttle window (time-based, for CRITICAL/PRESSURED states)?
- Is the fleet in hysteresis recovery (recently dropped from CRITICAL/STORM)?

The gate check is synchronous and fast. No network calls on the critical path.

---

## Priority Tiers Under Load

| State | ops_head | active_mission | standard | background | cron |
|-------|----------|---------------|----------|------------|------|
| CLEAR / ELEVATED | ✅ | ✅ | ✅ | ✅ | ✅ |
| PRESSURED | ✅ | ✅ | ✅ | Throttled 50% | Paused |
| CRITICAL | ✅ | ✅ | Throttled 50% | Paused | Paused |
| STORM | ✅ | Paused | Paused | Paused | Paused |

**ops_head always runs.** It exists for system-critical operations (heartbeats, recovery, monitoring) that must continue regardless of fleet load.

---

## Hysteresis

When load state drops (e.g., CRITICAL → PRESSURED), Commander doesn't immediately unlock previously-paused tiers. It maintains a hysteresis window (default: 60 seconds) before restoring normal dispatch for `background` and `cron` tiers.

This prevents oscillation — a fleet that's just recovered from CRITICAL isn't ready to resume full background work immediately.

---

## State Transitions and QM Notification

When Commander detects a load state transition (e.g., PRESSURED → CRITICAL), it:

1. Recomputes and writes the new policy document
2. Posts a policy enforcement event to Quartermaster's event endpoint

```
POST /qm/events → OPERATOR_ACK event (actor: "commander_v2", action: "escalate" | "resolve")
```

If Quartermaster isn't running, the POST fails silently. Commander writes the policy file regardless.

---

## Configuration

Commander resolves all paths from `commander_config.json` at `~/.openclaw/qm/`:

```json
{
  "base_path": "~/.openclaw",
  "paths": {
    "cls_scores": "watchdog/cls_scores.ndjson",
    "backpressure_state": "watchdog/backpressure_state.json",
    "health_projections": "qm/state/health_projections.json",
    "session_weight_config": "working/SESSION_WEIGHT_CONFIG.json",
    "policy_output": "watchdog/commander_policy_state.json",
    "policy_transition_state": "watchdog/commander_policy_transition_state.json"
  },
  "qm_events_endpoint": "http://127.0.0.1:8090/qm/events",
  "tier_ceilings": {
    "ops_head": null,
    "active_mission": 1,
    "standard": 1,
    "background": 1,
    "cron": 1
  },
  "cls_thresholds": {
    "elevated": 15,
    "pressured": 25,
    "critical": 40
  },
  "throttle_min_interval_seconds": 30,
  "hysteresis_seconds": 60
}
```

`ops_head` ceiling is `null` — uncapped. All other tiers default to 1 concurrent execution run per agent.

---

## CLS Thresholds

Commander maps CLS fleet pressure scores to load states:

| CLS Fleet Pressure | Resulting State Contribution |
|-------------------|----------------------------|
| > 40 | CRITICAL |
| > 25 | PRESSURED |
| > 15 | ELEVATED |
| ≤ 15 | CLEAR |

These thresholds are configurable. The effective state is the maximum across all signal sources — CLS alone can push the fleet to CRITICAL even if provider 429 rates are low.

---

## What Commander Is Not

**Not a scheduler.** Quartermaster and Dispatch own task scheduling. Commander gates individual dispatch decisions — it doesn't build queues or assign work.

**Not a monitor.** Sentinel and Watchdog monitor agent liveness. Commander reads their downstream signals (through Quartermaster health projections) but doesn't run its own health checks.

**Not a router.** Transmission handles per-call model routing (circuit breaker, tier selection). Commander handles per-dispatch policy (is this agent allowed to run right now).

---

## Where Commander Fits in the Stack

```
Callsign / Scrum (operator interface)
  ↓
Commander v2 (policy governance)
  ↓
Quartermaster v2 (mission orchestration)
  ↓
Dispatch (execution scheduling)
  ↓
Telepath (cognitive graph)
  ↓
Agents
```

Commander governs the whole stack. Quartermaster orchestrates missions within Commander's policy envelope. Every agent dispatch flows through both.

---

## Related

- [Quartermaster v2](/docs/quartermaster/overview) — mission orchestration layer Commander governs
- [Transmission — Load Governor](/docs/transmission/load-governor) — primary signal source for load state
- [CLS Scanner](/docs/cls-scanner/overview) — session burden scores Commander reads
- [Transmission Overview](/docs/transmission/overview) — full context on Transmission's routing and circuit breaker
