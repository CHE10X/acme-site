---
title: "Gateway Recovery Runbook"
description: "When your OpenClaw gateway is broken. Step-by-step decision tree — from 'something feels wrong' to confirmed recovery."
---

# Gateway Recovery Runbook

When your gateway is degraded, you shouldn't have to think. This is the decision tree.

<Warning>
**Resist the urge to restart first.** Gateway restart misses the most common failure modes — bad state lives in session context, active sub-agents, and memory files. This protocol takes 3 minutes. Skipping it can cost days.
</Warning>

---

## Step 0 — Identify Your State

Answer one question:

```bash
openclaw status
```

| Result | Meaning | Go to |
|--------|---------|-------|
| Returns output | Gateway alive, possibly degraded | Step 1 |
| Hangs indefinitely | Gateway stalled (process up, event loop frozen) | Step 2 |
| Crashes immediately | Gateway down | Step 3 |

---

## Step 1 — Gateway Alive, Behavior Degraded

### Read the cockpit first

```bash
agent911
```

Read top to bottom: **SYSTEM STABILITY** → **ACTIVE RISKS** → **PROTECTION STATE** → **COMPACTION RISK**. This is your full picture in 8ms.

### Confirm with the external observer

```bash
triage --self-test && triage
```

`triage` reads outside the gateway — it tells you what's actually wrong even if the gateway is lying to you. If `agent911` and `triage` agree on the diagnosis, it's confirmed.

<Tip>
If `triage` shows `gateway: DEGRADED` while `openclaw status` still returns output, you have a frozen event loop. The port is listening but the event loop is stalled. Go to Step 2.
</Tip>

### Score the stack

```bash
radcheck
```

| Score | Band | Action |
|-------|------|--------|
| 80–100 | LOW ✅ | Monitor — nothing urgent |
| 60–79 | MODERATE ⚠️ | Review findings, fix within 24h |
| 40–59 | HIGH 🚨 | Fix today — don't defer |
| 0–39 | SEVERE 💀 | Go to Step 3 immediately |

### If compaction is ACTIVE or STORM

```bash
cat ~/.openclaw/watchdog/compaction_alert_state.json
```

If `level` is ACTIVE or STORM: stop spawning sessions, run `recall stall`, wait for the storm to clear (30-minute cooldown), then re-run `agent911` before resuming.

---

## Step 2 — Gateway Stalled

**Confirm the stall pattern:**

```bash
lsof -i :18789       # Port should show openclaw process
openclaw status      # If this hangs → stall confirmed
```

Port listening + probe failing = frozen event loop. This is the most dangerous failure mode because the gateway appears healthy to the OS.

### Check if Watchdog already handled it

```bash
cat ~/.openclaw/watchdog/stall_seen.txt
tail -20 ~/.openclaw/watchdog/watchdog.log | grep -i "STALL\|KICKSTART"
```

If `stall_seen.txt` exists, Watchdog detected the stall and triggered a kickstart. Wait 30 seconds, then re-run `openclaw status`. If it responds, go back to Step 1 to verify health.

### Manual kickstart sequence

If Watchdog hasn't handled it yet:

```bash
# 1. Pause agents first — don't let bad state compound
recall stall

# 2. Kill any orphaned sub-agents
openclaw sessions list
openclaw sessions kill <session-id>    # for any orphaned sessions

# 3. Restart cleanly via launchctl (not kill -9)
launchctl stop ai.openclaw.gateway
sleep 3
launchctl start ai.openclaw.gateway

# 4. Confirm
sleep 10
openclaw status
recall wake
```

Then verify recovery at [Step 4](#step-4--verify-recovery).

---

## Step 3 — Gateway Won't Start

### Check git rollback first

<Warning>
Do this before changing any config. The fix often already exists in your history.
</Warning>

```bash
cd ~/.openclaw
git log --oneline -10
git diff HEAD~1 openclaw.json    # What changed last commit?
```

If the last commit broke the gateway:

```bash
git revert HEAD --no-edit
# or surgical:
git checkout HEAD~1 -- openclaw.json
openclaw gateway restart
```

If rollback works: go to Step 4 to verify.

### Check the error log

```bash
tail -50 ~/.openclaw/logs/gateway.err.log
```

Common patterns:

| Error | Cause | Fix |
|-------|-------|-----|
| `TDZ error` / `normalizeAnthropicModelId` | Version bug (2026.3.12–13) | Roll back to 2026.3.11 |
| `EADDRINUSE :18789` | Zombie gateway process | `kill $(lsof -ti :18789)` then retry |
| `openclaw.json parse error` | Corrupt config | Restore from git or backup |
| `Cannot find module` | Broken install | Reinstall OpenClaw |

### Check recoverability before improvising

```bash
lazarus
```

Lazarus scores your backup posture 0–100 before you attempt any restore. If it scores below 60, you don't have reliable recovery materials — contact support before proceeding.

### Restore openclaw.json from backup

```bash
# From git (preferred)
cd ~/.openclaw && git checkout HEAD -- openclaw.json

# From backup (via Lazarus — extracts to staging only, never live)
lazarus --mode restore
```

---

## Step 4 — Verify Recovery

Recovery is not complete when the gateway starts. Recovery is complete when the signals confirm it.

```bash
triage --self-test && triage    # External observer: gateway OK?
radcheck                         # Score ≥60 before resuming normal work
agent911                         # No CRITICAL findings, protection state green
```

<Warning>
If RadCheck scores below 60 after recovery, fix the findings before resuming full operation. A stack that just recovered and scores 35/100 will fail again.
</Warning>

---

## Quick Reference

```
Something's wrong
  └─ openclaw status returns?
       ├─ YES  → Step 1 (agent911 + triage + radcheck)
       └─ NO   → hangs?   → Step 2 (stall protocol)
                 crashes? → Step 3 (git rollback FIRST)

RadCheck score?
  ├─ 80–100 → monitor
  ├─ 60–79  → fix within 24h
  ├─ 40–59  → fix today
  └─ 0–39   → Step 3 now
```

---

## Product Reference

| Product | Role | Command |
|---------|------|---------|
| [Agent911](/docs/agent911) | Unified cockpit — start here | `agent911` |
| [triage](/docs/triage) | External observer — works when gateway doesn't | `triage` |
| [RadCheck](/docs/radcheck) | Baseline score — tells you severity | `radcheck` |
| [Sentinel](/docs/sentinel) | Continuous monitor — check compaction state | — |
| [Watchdog](/docs/watchdog) | Heartbeat — may have already kickstarted | — |
| [Recall](/docs/recall) | Manual intervention surface | `recall stall` / `recall wake` |
| [Lazarus](/docs/lazarus) | Backup verification before restore | `lazarus` |

---

Questions or edge cases not covered here: [support@acmeagentsupply.com](mailto:support@acmeagentsupply.com)
