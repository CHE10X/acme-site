---
title: Watchdog — Liveness & Stall Detection
product: watchdog
tier: CORE
---

# Watchdog — Liveness & Stall Detection

Watchdog is the heartbeat layer. It runs a continuous liveness loop on long-running agents, distinguishes between "process is alive" and "work is actually progressing," and emits the telemetry that every other layer in the Acme reliability stack depends on.

## What Watchdog Does

- Runs a heartbeat loop: probes each monitored agent on a fixed interval
- Detects gateway stalls: port-up but probe-fail → emits `GATEWAY_STALL` event
- Uses probe debounce: requires N=3 consecutive failures before triggering a kickstart — avoids false positives from transient network hiccups
- Owns log hygiene: bounds log growth, governs `restore_staging` directory, performs conservative cleanup
- Prevents duplicate runs via lockfile protection
- Emits events to the **Resilience Event Bus (REB)** — the shared event backbone consumed by Lazarus, Agent911, and Bonfire
- Emits telemetry that Sentinel, RadCheck, and Agent911 all consume

> **Resilience layer position:** Watchdog is the process liveness watch surface in the Detection sublayer — alongside Sentinel (runtime behavior) and InfraWatch (infra config). All three emit to a shared REB.

> **If running Watchdog standalone:** REB is installed and receiving Watchdog events. To consume those events — triggering readiness scans and recovery — add Lazarus and Agent911, or install the Operator Bundle.

## What Watchdog Does NOT Do

- No destructive operations on running processes (beyond configured kickstart behavior)
- No autonomous recovery decisions — it detects and signals; operators decide
- No modification of `openclaw.json` or gateway config

---

## Stall Detection Logic

The difference between "process alive" and "work progressing" is the core problem Watchdog solves.

A standard health check tells you a port is listening. Watchdog goes further:

1. **Probe** — sends a liveness probe to the gateway endpoint
2. **Evaluate** — checks for meaningful progress signals, not just a TCP response
3. **Debounce** — N=3 consecutive failures required before a `GATEWAY_STALL` event fires
4. **Kickstart** — if configured, triggers a restart sequence after stall confirmation; logs the event before any action

The debounce threshold (N=3) prevents alert noise from transient blips while keeping stall detection fast enough to matter.

---

## Hygiene Enforcement (v1.1)

Watchdog v1.1 owns stack hygiene:

- **Log bounding** — monitors total log volume and trims stale entries when growth exceeds configured thresholds. Prevents disk pressure accumulation.
- **`restore_staging` governance** — manages the staging directory used by Lazarus restore operations. Ensures stale staging artifacts are cleared safely.
- **Conservative cleanup** — Watchdog never deletes without logging. Every hygiene action appears in `ops_events.log`.

---

## Output Files

| File | Contents |
|------|----------|
| `watchdog.log` | Probe results, stall events, kickstart actions, debounce state |
| `status.log` | Current liveness state per monitored agent — Sentinel and Agent911 read this |
| `ops_events.log` | Append-only event log — all significant Watchdog actions and state changes |

These files are the **backbone of the Acme data flow**. Every product that reads reliability signals is reading files Watchdog produces.

---

## Data Flow Position

```
OpenClaw runtime events
  → Watchdog → watchdog.log + status.log + ops_events.log
                   → RadCheck  (reads log state)
                   → Sentinel  (runs inside Watchdog loop)
                   → Agent911  (reads all of the above)
```

Watchdog is the first layer. If Watchdog isn't running, the rest of the stack is reading stale state.

---

## Best For

Any long-running or scheduled agent deployment where silent stalls are a real risk. If your agents run unattended for hours or days, Watchdog is the layer that tells you before your users do.

---

## Next Step

Watchdog feeds Sentinel. If you haven't enabled Sentinel yet, see the [Sentinel documentation](/docs/sentinel/overview).
