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

## Usage

```bash
triage
```

Runs all collectors and writes a timestamped proof bundle to `~/.openclaw/triage-bundles/`. The bundle is your evidence record — share it with support or Agent911 for automated diagnosis.

## Output Files

Each run produces a bundle directory:

- `gateway_status.txt`
- `gateway_log_tail.txt`
- `gateway_err_tail.txt`
- `session_topology.json`
- `disk_pressure.txt`
- `binary_integrity.txt`
- `openclaw_doctor.txt`
- `compaction_status.txt`
- `fleet_identity.txt`
- `manifest.json`

## Operator Rule

Run `triage` before you touch anything. Once you start changing the system, the state you needed to capture is gone.

## Installation

```bash
curl -fsSL https://acmeagentsupply.com/install/triage | bash
```

Installs the `triage` command globally. MIT licensed. No Acme account required.

## Current Version

`triage` v0.1.3 — see [release notes](https://github.com/acmeagentsupply/triage/releases).

---

## Triage Pro

The open-source edition is the foundation. **Triage Pro** extends it with deep integrations into the Acme reliability stack:

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

`triage -watch` provides a continuously-refreshing live dashboard showing reliability score, 24h RadCheck trend, active agent count, and protection state. Requires an Acme account.

[Contact us](https://acmeagentsupply.com/contact) to enable Triage Pro.
