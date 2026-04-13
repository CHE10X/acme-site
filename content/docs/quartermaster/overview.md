---
title: Quartermaster v2 — Mission Health & Orchestration
product: quartermaster
tier: CORE
status: v2
---

# Quartermaster v2

> **Version:** v2 — Shadow orchestration. Reads v1 state, projects health, pushes real-time events. Does not dispatch tasks (that's Phase 2).

Quartermaster is ACME's mission orchestration layer. It watches your agent campaigns and missions continuously — projecting health, detecting stalls, and pushing alerts the moment something goes wrong.

If Sentinel is your per-agent watchdog, Quartermaster is the control tower watching the whole fleet.

---

## The Problem

Multi-mission agent stacks fail silently. An agent stalls. A task dependency blocks. Credit burns through a budget without anyone noticing. By the time an operator looks, the mission is an hour behind and the context is gone.

Polling for status doesn't help. By the time you check, the damage is done.

Quartermaster closes this gap with continuous health projection and real-time push events — so you know the moment a mission goes at-risk, not the moment you happen to look.

---

## How Quartermaster Works

### 1. Health Projection Engine

Every entity — campaign, mission, task — carries a `health_state` object. Quartermaster computes this continuously from live signals:

- Task stall duration
- Agent activity gaps
- Credit consumption pace vs. remaining work
- Dependency chain blocks
- Load Governor state (from Transmission v4)

Health is a composite score (0–100) with a severity label (green / yellow / orange / red) and plain-English contributors — not just a number.

```
Mission: "Q2 Outreach Campaign"
Health: 58 — orange

Top contributors:
• 2 tasks stalled > 4h
• no agent activity in last 6h
• credit burn 80% of budget with 40% of tasks remaining
```

### 2. Real-Time Push Events

Quartermaster runs a WebSocket server at `ws://localhost:<port>/events/stream`. Operators and dashboards subscribe once and receive events as they happen:

| Event | When it fires |
|-------|--------------|
| `STORM_DETECTED` | Load Governor enters STORM state (within seconds of detection) |
| `HEALTH_CHANGED` | Entity severity changes (e.g., green → orange) |
| `TASK_STALLED` | Task exceeds its ack window without progress |
| `TASK_BLOCKED` | Task dependency unresolvable |
| `OPERATOR_ACK` | Operator acknowledges an alert |

STORM events fire within seconds of detection. This is a hard requirement — not a best-effort behavior.

### 3. Dashboard Views

Three pre-computed views are always available as fast REST reads:

| View | What it shows |
|------|--------------|
| **At Risk** | All entities trending toward failure — degrading health, credit pace issues |
| **Blocked** | All entities with unresolvable dependency chains |
| **Stale** | All entities with no agent activity in the configured window |

These are filters over a unified health state — not separate queries. Every view includes hierarchy context (campaign → mission → task) so you can see the blast radius at a glance.

### 4. Fleet Health Summary

`GET /health/fleet` returns a pre-computed summary:

```json
{
  "healthy": 12,
  "at_risk": 3,
  "blocked": 1,
  "load_governor_state": "PRESSURED"
}
```

This is a first-class pre-computed read — not a join-on-request aggregation. It's always fast.

---

## Priority Tiers

Every mission and task carries a priority tier. Tier governs dispatch order (Phase 2) and determines what gets preserved vs. throttled under load:

| Tier | Description |
|------|-------------|
| `ops_head` | System-critical. Never blocked, even during STORM. |
| `active_mission` | Live work in progress. Protected under CRITICAL. |
| `standard` | Normal priority. Throttled under CRITICAL. |
| `background` | Low-urgency work. Paused under PRESSURED. |
| `cron` | Scheduled tasks. Paused under PRESSURED. |

Under STORM: only `ops_head` runs. Everything else pauses until the fleet stabilizes.

---

## Health Recompute Tiers

Not all signals are equal urgency. Quartermaster recomputes health at different rates depending on severity:

| Tier | Latency | Triggers |
|------|---------|----------|
| Immediate (seconds) | STORM, task FAILED | Fires immediately — never delayed |
| High-frequency (< 60s) | CRITICAL system state | Fast response to escalating conditions |
| Standard (≤ 5 min) | Stall, blocked dependency, credit alert | Normal degradation detection |
| Low-frequency (30 min) | Stale activity, credit pace | Periodic sweep |

---

## Operator Acknowledgment

When Quartermaster fires a STORM or CRITICAL alert, an operator can acknowledge it via:

```
POST /events/{entity_type}/{entity_id}/acknowledge
```

The acknowledgment writes to the event store and pushes back via WebSocket before the banner clears. No optimistic dismissal — the write must confirm first.

---

## Credit Visibility

Every mission carries a credit budget. Quartermaster tracks consumption pace and fires a warning when a mission is on track to exhaust its budget before completion:

```
credit_pace: "Burning fast — 80% consumed, 40% tasks remaining"
```

This is always human-readable — not a normalized score. If the pace is unsustainable, you'll know what it means without needing to decode a number.

---

## What v2 Does Not Do (Phase 2)

Phase 1 is shadow orchestration — read-only health projection and alerting. These are Phase 2 features:

- **WakeAgent dispatch** — Quartermaster autonomously wakes agents to resume stalled tasks
- **Credit enforcement** — hard budget gates on task dispatch
- **Automated escalation** — escalation chains when operator ack doesn't arrive
- **Postgres persistence** — Phase 1 uses SQLite

Phase 1 gives you visibility. Phase 2 gives you control.

---

## Migration from v1

Quartermaster v2 imports your existing v1 `mission_manifest.json` automatically. v1 remains authoritative during Phase 1 — v2 runs alongside it without replacing it.

Migration tracking lives in `qm/state/migration_mappings.json`.

---

## Configuration

Quartermaster resolves all paths from a single `base_path` in `qm/config.json`:

```json
{
  "base_path": "~/.openclaw",
  "paths": {
    "cls_scores": "watchdog/cls_scores.ndjson",
    "transmission_load_state": "watchdog/transmission_load_state.json",
    "transmission_load_alert": "watchdog/transmission_load_alert.json",
    "qm_state": "qm/state",
    "health_projections": "qm/state/health_projections.json",
    "event_store": "qm/state/event_store.db",
    "migration_mappings": "qm/state/migration_mappings.json",
    "v1_mission_manifest": "quartermaster_v1/missions/mission_manifest.json"
  }
}
```

Set `base_path` once. Everything else resolves from it.

---

## REST API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health/fleet` | GET | Pre-computed fleet summary |
| `/health/{entity_type}/{entity_id}` | GET | Single entity health state |
| `/views/at-risk` | GET | All at-risk entities with hierarchy |
| `/views/blocked` | GET | All blocked entities with hierarchy |
| `/views/stale` | GET | All stale entities with hierarchy |
| `/missions` | GET | All missions with current health |
| `/events/stream` | WS | Real-time push event stream |
| `/events/{entity_type}/{entity_id}/acknowledge` | POST | Operator acknowledgment |

---

## Related

- [Transmission — Load Governor](/docs/transmission/load-governor) — STORM detection feeds QM push events
- [CLS Scanner](/docs/cls-scanner/overview) — session burden scores feed QM health projections
- [Commander v2](/docs/commander/overview) — policy engine governing dispatch tiers
- [Agent911](/docs/agent911/overview) — operator cockpit for agent recovery
