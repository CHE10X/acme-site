---
title: Transmission — Load Governor
product: transmission
tier: CORE
status: early-access
---

# Load Governor

> **Part of Transmission v4.** The Load Governor is the sensing and alerting layer — it watches provider error rates and session burden, computes System Load State, and pushes recommendations before the fleet hits a wall.

The Load Governor doesn't replace calls or manage queues. It watches, classifies, and alerts. Phase 1 is sense-and-recommend. Enforcement comes in Phase 2.

---

## The Problem

Provider failures don't arrive with warning labels. A rate limit wall appears mid-task — the call fails, context is lost, the operator gets an error with no useful signal.

The Load Governor inverts this. It watches error rates and session pressure continuously, classifies the current load state, and tells you what to do before the failure hits.

---

## System Load State

The Load Governor computes one of five states every 10 seconds:

| State | Meaning |
|-------|---------|
| `CLEAR` | Normal operations |
| `ELEVATED` | Early pressure — log and watch |
| `PRESSURED` | Recommend backpressure — throttle background, collapse to single provider lane |
| `CRITICAL` | Alert operator — stop retries, compact sessions, require single lane |
| `STORM` | Immediate alert — write STORM signal, pause non-critical dispatch |

State is computed from three inputs: provider 429 rate (5-minute window), fleet CLS pressure, and active agent count.

### Decision Table

Evaluation order: first match wins. STORM and CRITICAL have no hysteresis — they trigger immediately on breach.

| State | Trigger |
|-------|---------|
| `STORM` | 429 rate > 50% in 5m **OR** 3+ consecutive failures (no delay) |
| `CRITICAL` | 429 rate > 30% in 5m **OR** CLS fleet pressure > 40 **OR** active agents > 8 |
| `PRESSURED` | 429 rate > 10% in 5m **OR** CLS fleet pressure > 25 **OR** active agents > 5 |
| `ELEVATED` | 429 rate > 5% in 5m **OR** CLS fleet pressure > 15 |
| `CLEAR` | None of the above |

All thresholds are configurable in `transmission_v4_config.json`.

---

## What Happens at Each State

### ELEVATED
Logged. No action required. The governor is watching.

### PRESSURED
1. Recommend: stop retries on failing providers
2. Recommend: collapse to single provider lane
3. Write `PRESSURED` backpressure signal

### CRITICAL
1. Recommend: stop retries immediately
2. Recommend: compact any HEAVY or CRITICAL sessions
3. Require: single provider lane
4. Write `CRITICAL` backpressure signal
5. Alert operator

### STORM
1. Alert operator immediately (Slack/Telegram; falls back to file)
2. Write `STORM` backpressure signal
3. Display manual Recovery Mode steps
4. POST `STORM_DETECTED` event to Quartermaster (if running)

---

## The Backpressure Signal

The Load Governor writes `~/.openclaw/watchdog/backpressure_state.json` on every state change:

```json
{
  "state": "PRESSURED",
  "as_of": "2026-03-27T10:18:00Z",
  "recommendations": ["stop_retries", "single_provider_lane"],
  "sustained_since": "2026-03-27T10:17:00Z",
  "provider_pressure": {
    "429_rate_5m": 0.12,
    "consecutive_failures": 1,
    "affected_providers": ["openai"]
  },
  "cls_fleet_pressure": 18,
  "active_agent_count": 3
}
```

Agents that check this file in Phase 1 can self-throttle cooperatively. In Phase 2, Transmission gates calls against this signal automatically.

---

## STORM Event Schema

When state reaches STORM, the Load Governor writes a `TRANSMISSION_STORM_DETECTED` event to `~/.openclaw/watchdog/transmission_load_alert.json`:

```json
{
  "event": "TRANSMISSION_STORM_DETECTED",
  "timestamp": "2026-03-27T10:18:08Z",
  "state": "STORM",
  "trigger": "429_rate",
  "trigger_value": 0.52,
  "affected_providers": ["openai"],
  "recommendations": ["stop_retries", "single_provider_lane", "compact_sessions"],
  "recovery_mode_steps": "See docs/architecture/OPENCLAW_RECOVERY_MODE_SPEC.md"
}
```

Quartermaster v2 polls this file every 5 seconds and pushes a `STORM_DETECTED` WebSocket event to subscribers within seconds of detection.

---

## What the Load Governor Watches

### Provider Error Rate
Reads `~/.openclaw/logs/gateway.err.log` every 10 seconds. Counts `isError=true` entries with rate-limit or overload error text in the rolling 5-minute window.

**Detected patterns:**
- "rate limit reached"
- "temporarily overloaded"
- HTTP 429

### CLS Fleet Pressure
Reads `~/.openclaw/watchdog/cls_scores.ndjson` — session burden scores produced by the CLS Scanner. If the CLS Scanner isn't deployed, the Load Governor runs in provider-pressure-only mode.

### Active Agent Count
Counts `runId` entries in gateway logs that have a start event but no corresponding completion in the last 30 seconds. This counts agents *currently making a provider call* — not agents with open sessions.

---

## Configuration

The Load Governor resolves all paths from `transmission_v4_config.json`. Set `base_directory` once:

```json
{
  "base_directory": "~/.openclaw",
  "paths": {
    "cls_scores": "${base}/watchdog/cls_scores.ndjson",
    "gateway_error_log": "${base}/logs/gateway.err.log",
    "backpressure_state": "${base}/watchdog/backpressure_state.json",
    "load_state": "${base}/watchdog/transmission_load_state.json",
    "alert_fallback": "${base}/watchdog/transmission_load_alert.json"
  },
  "qm_events_endpoint": "http://localhost:8090/qm/events"
}
```

No paths are hardcoded. The governor adapts to any OpenClaw installation layout.

---

## Polling Cadence

| Signal | Cadence |
|--------|---------|
| Provider error rate | Every 10 seconds |
| Active agent count | Every 10 seconds |
| System Load State evaluation | Every 10 seconds |
| CLS scores | On-change (synced with CLS scan cadence) |
| State write | On every state change |

---

## What This Isn't

**Not a failover mechanism.** Transmission's circuit breaker handles provider failover. The Load Governor handles fleet-level load state — a distinct concern.

**Not enforcement (Phase 1).** The Load Governor recommends. Agents cooperate voluntarily in Phase 1. Enforcement — where Transmission actually gates calls — is Phase 2.

**Not an agent scheduler.** That's Quartermaster and Dispatch. The Load Governor feeds them signals; it doesn't make scheduling decisions.

---

## Phase 1 vs Phase 2

| Capability | Phase 1 | Phase 2 |
|-----------|---------|---------|
| Provider error rate sensing | ✅ | ✅ |
| CLS fleet pressure sensing | ✅ (if CLS deployed) | ✅ |
| Backpressure signal file | ✅ | ✅ |
| STORM alerting | ✅ | ✅ |
| QM push event on STORM | ✅ | ✅ |
| Cooperative agent throttling | ✅ | ✅ |
| Credit enforcement | ❌ | ✅ |
| Automated containment | ❌ | ✅ (opt-in) |
| Session weight as CLS input | ❌ (Phase 1.1) | ✅ |

---

## Related

- [Transmission Overview](/docs/transmission/overview) — full Transmission context (circuit breaker, routing, reporting)
- [CLS Scanner](/docs/cls-scanner/overview) — session burden scores that feed Load Governor
- [Quartermaster v2](/docs/quartermaster/overview) — consumes STORM events from Load Governor
- [Commander v2](/docs/commander/overview) — policy engine that reads Load Governor state for dispatch gating
