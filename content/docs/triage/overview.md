---
title: Triage
---

# Triage

`triage` is an open-source diagnostic for OpenClaw operators. Run it first — before any recovery action — to capture a deterministic, read-only snapshot of system state.

Your debugging tools run on the system that's broken. When the control plane is unhealthy, native diagnostics are the first to go dark. `triage` runs independently of the stack it's diagnosing.

## What It Reports

| Collector | What It Captures |
|-----------|-----------------|
| Gateway health | Process status, log tail, liveness probe |
| Session topology | Agent count, orphan sessions |
| Disk pressure | Available space, inode usage |
| Binary integrity | Hash verification of installed binaries |
| OpenClaw doctor | `openclaw doctor` output |
| Compaction status | Memory compaction state |
| Fleet identity | Hostname, uptime, version |

All checks are **read-only**. No configuration changes. No system modifications.

## Running Triage

One command, no arguments required:

```bash
triage
```

Triage runs all collectors in sequence and writes a timestamped proof bundle to `~/.openclaw/triage-bundles/`. The bundle is your evidence record — share it with support or open it in Agent911 for automated diagnosis.

**Run Triage before you touch anything.** Once you start changing the system, the state you needed to capture is gone.

## What Gets Written

Each run produces a bundle directory containing:

- `gateway_status.txt` — gateway process and liveness state
- `gateway_log_tail.txt` — last 200 lines of gateway log
- `gateway_err_tail.txt` — last 200 lines of gateway error log
- `session_topology.json` — agent counts, orphan sessions, session IDs
- `disk_pressure.txt` — available space and inode usage
- `binary_integrity.txt` — hash verification of installed binaries
- `openclaw_doctor.txt` — full output of `openclaw doctor`
- `compaction_status.txt` — memory compaction state
- `fleet_identity.txt` — hostname, uptime, OpenClaw version
- `manifest.json` — bundle metadata and collector checksums

## Installation

```bash
curl -fsSL https://acmeagentsupply.com/install/triage | bash
```

Installs the `triage` command globally. MIT licensed. No Acme account required. Current version: `v0.1.3` — [release notes](https://github.com/acmeagentsupply/triage/releases).

---

## Triage Pro

The open-source edition is the foundation. **Triage Pro** extends it with live monitoring and deep integration into the Acme reliability stack:

| Feature | OSS | Triage Pro |
|---------|-----|------------|
| Gateway health | ✅ | ✅ |
| Session topology | ✅ | ✅ |
| Disk pressure | ✅ | ✅ |
| Binary integrity | ✅ | ✅ |
| OpenClaw doctor | ✅ | ✅ |
| Compaction status | ✅ | ✅ |
| Fleet identity | ✅ | ✅ |
| **Live `-watch` monitor** | ❌ | ✅ |
| **Reliability score** | ❌ | ✅ |
| **Protection state** | ❌ | ✅ |
| **RadCheck history trend** | ❌ | ✅ |
| **Observe snapshot** | ❌ | ✅ |

`triage -watch` provides a continuously-refreshing live dashboard: reliability score, 24h RadCheck trend, active agent count, and protection state. Requires an Acme account.

[Contact us](https://acmeagentsupply.com/contact) to enable Triage Pro.
