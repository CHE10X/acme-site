---
title: Install Sentinel
product: sentinel
tier: CORE
---

# Install Sentinel

Sentinel runs a persistent watchdog on your machine that checks your agent stack every 5 minutes — automatically, even after reboots.

## Requirements

- macOS 12+ or Ubuntu/Debian 20.04+
- [OpenClaw](https://openclaw.ai) already installed
- Your Sentinel license key (from your purchase confirmation email)

## One-Command Install

```bash
curl -fsSL https://acmeagentsupply.com/install/sentinel | ACME_LICENSE_KEY=your_key_here bash
```

That's it. The installer will:

1. Download the Sentinel watchdog script
2. Install a persistent daemon (launchd on macOS, cron on Linux)
3. Start monitoring immediately
4. Run a first health check and show your current state

## What You'll See

```
ACME Agent Supply — Sentinel Installer v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Preflight checks
✓ OS: macos
✓ openclaw: 2026.3.11

2. Setting up directories
✓ Directories ready

3. Installing Sentinel watchdog script
✓ Watchdog script installed

4. Installing persistent daemon
✓ launchd service installed and started (every 300s)

5. Running first health check
✓ First run complete

  State:  NOMINAL
  Alerts: none
  Log:    ~/.openclaw/sentinel/sentinel.log

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sentinel installed successfully.
```

## Check Status Anytime

```bash
cat ~/.openclaw/sentinel/state.json
```

Returns:
```json
{
  "state": "NOMINAL",
  "checked_at": "2026-03-16T22:00:00Z",
  "gateway_up": true,
  "gateway_latency_ms": 42,
  "heartbeat_age_s": 180,
  "disk_used_pct": 34,
  "alerts": []
}
```

## States

| State | Meaning |
|-------|---------|
| `NOMINAL` | Everything looks healthy |
| `SUSPECT` | One or more signals look off — worth checking |
| `ACTIVE` | Active issue detected — gateway down or critical alert |

## Signals Monitored

- **Gateway health** — is OpenClaw responding?
- **Heartbeat freshness** — how long since last heartbeat?
- **Disk pressure** — is your disk filling up?
- **Session activity** — has the session been quiet too long?

## What's Next?

Sentinel is running. Here's how to get value from it.

### Reading State

Run `cat ~/.openclaw/sentinel/state.json` anytime to check current state. The three states are:

- **NOMINAL** — all signals healthy. No action needed.
- **SUSPECT** — one or more signals look off. Check the `alerts` array in state.json for specifics. Don't ignore SUSPECT — it's an early warning, not a false alarm.
- **ACTIVE** — active issue detected. Gateway may be down or a critical alert has fired. Take action now.

### When State is SUSPECT

1. Note which signal triggered (gateway, heartbeat, disk, session activity).
2. Run `octriage` to get a full system snapshot.
3. If the signal clears on the next 5-minute cycle, monitor. If it persists, escalate.

### Sentinel + Agent911

Sentinel feeds its state into the Agent911 control plane. If you have Agent911 installed, its health view reflects Sentinel's current posture — you don't need to check both manually. Sentinel detects; Agent911 gives you the full picture and recovery options.

For questions or to send a support bundle: [support@acmeagentsupply.com](mailto:support@acmeagentsupply.com)

---


## Known Issues

### launchd I/O Error on Fresh Installs (macOS)

Some fresh installs fail at the launchd registration step with I/O error 5 (EIO). Symptoms: installer completes but Sentinel is not running as a background service.

**Workaround:** Re-run the install with `sudo`, or switch to cron-based activation:

```bash
# Alternative: cron-based activation (no sudo required)
(crontab -l 2>/dev/null; echo "*/5 * * * * $HOME/.openclaw/watchdog/acme-sentinel-watchdog.py >> $HOME/.openclaw/watchdog/sentinel.log 2>&1") | crontab -
```

This issue is under active investigation. Contact [support@acmeagentsupply.com](mailto:support@acmeagentsupply.com) if you hit it.

## Uninstall

```bash
# macOS
launchctl unload ~/Library/LaunchAgents/ai.openclaw.sentinel.plist
rm ~/Library/LaunchAgents/ai.openclaw.sentinel.plist

# Linux
crontab -l | grep -v "acme-sentinel-watchdog" | crontab -
```
