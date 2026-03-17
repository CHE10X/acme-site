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

## Uninstall

```bash
# macOS
launchctl unload ~/Library/LaunchAgents/ai.openclaw.sentinel.plist
rm ~/Library/LaunchAgents/ai.openclaw.sentinel.plist

# Linux
crontab -l | grep -v "acme-sentinel-watchdog" | crontab -
```
