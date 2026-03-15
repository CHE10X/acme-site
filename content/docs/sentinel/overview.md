---
title: Sentinel — Continuous Guardrails
product: sentinel
tier: CORE
---

# Sentinel — Continuous Guardrails

Sentinel is the always-on detection layer that watches your agent stack while it runs. Where RadCheck is a one-time scan, Sentinel monitors continuously — surfacing silence gaps, stall patterns, and compaction pressure before they become incidents.

## What Sentinel Does

- Monitors for stalled or silent agent behavior during live operation
- Tracks compaction acceleration and emits disk pressure advisories
- Maintains a state machine that escalates through four protection levels
- Feeds real-time event context into Agent911 and Watchdog
- Emits structured alerts that operators and downstream tools can consume

## What Sentinel Does NOT Do

- No autonomous recovery or self-healing actions
- No destructive operations
- No changes to `openclaw.json` or gateway config
- No guaranteed prevention of all failures — it detects and signals

---

## Protection State Machine

Sentinel maintains a four-state protection model:

| State | Meaning |
|-------|---------|
| `NOMINAL` | No anomalies detected — system within expected parameters |
| `SUSPECT` | Early warning signals present — elevated monitoring |
| `ACTIVE` | Active anomaly confirmed — alert emitted |
| `STORM` | Compaction storm state — multiple overlapping signals |

State advances automatically based on signal accumulation. Operators observe the current state in `sentinel_protection_state.json` and via Agent911.

---

## What Sentinel Monitors

**Silence gaps** — expected agent activity has stopped without a clean shutdown signal.

**Stall patterns** — process appears alive (port up) but meaningful work has stopped. Sentinel distinguishes between "running" and "progressing."

**Compaction pressure** — memory compaction acceleration that historically precedes multi-minute stalls. Sentinel adds a `comp_alert` signal to every Watchdog status cycle when compaction budget is stressed.

**Disk growth slope** — Sentinel emits a `SENTINEL_DISK_PRESSURE` advisory when log volume growth exceeds safe thresholds.

---

## Integration with Watchdog

Sentinel runs inside the Watchdog loop. Every Watchdog heartbeat cycle receives Sentinel's current protection state. This means:

- Watchdog stall detection inherits Sentinel's compaction context
- A `STORM` state in Sentinel will appear in `watchdog.log` and `ops_events.log`
- Agent911 reads both surfaces — the Sentinel protection state influences its top-risk ranking

---

## Output Files

| File | Contents |
|------|----------|
| `compaction_alert_state.json` | Current compaction pressure level, acceleration rate, timestamp |
| `sentinel_protection_state.json` | Current state (`NOMINAL`/`SUSPECT`/`ACTIVE`/`STORM`), last transition, active signals |
| `ops_events.log` | Append-only event log — all Sentinel state transitions and alerts |

All files are **read-only outputs**. Sentinel never modifies gateway config or operational runtime.

---

## Best For

Long-running or scheduled agent systems where stalls are expensive and early detection matters. Sentinel is the upgrade from "we found out when it stopped working" to "we knew it was degrading before it stopped."

---

## Next Step

If Sentinel reports `ACTIVE` or `STORM`:
1. Run `triage` immediately to capture a proof bundle before touching anything
2. Open Agent911 for a unified incident view
3. Check `sentinel_protection_state.json` for the active signal list
