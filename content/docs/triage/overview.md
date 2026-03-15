---
title: triage
---

# triage

`triage` is an open-source diagnostic tool for OpenClaw operators. Run it first — before any recovery action — to capture a deterministic, read-only proof bundle of system state.

Your debugging tools run on the system that's broken. When the control plane is unhealthy, native diagnostics are the first to go dark. `triage` runs independently of the stack it's diagnosing.

## Installation

```bash
curl -fsSL https://acmeagentsupply.com/install/triage | bash
```

Installs the `triage` command globally. MIT licensed. No Acme account required.

## Usage

```bash
triage
```

Runs all collectors and outputs a proof bundle to `~/.openclaw/triage-bundles/`.

## What It Checks

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

## Output

`triage` emits a timestamped bundle directory:

```
~/.openclaw/triage-bundles/YYYY-MM-DD-HH-MM-SS/
  gateway_status.txt
  gateway_log_tail.txt
  gateway_err_tail.txt
  session_topology.json
  disk_pressure.txt
  binary_integrity.txt
  openclaw_doctor.txt
  compaction_status.txt
  fleet_identity.txt
  manifest.json
```

The bundle is your evidence record. Share it with support or Agent911 for automated diagnosis.

## Operator Rule

Run `triage` before you touch anything. Once you start changing the system, the state you needed to capture is gone.

## Current Version

`triage` v0.1.3 — see [release notes](https://github.com/CHE10X/octriageunit/releases).

---

## Triage for Acme

The open-source edition is the foundation. **Triage for Acme** extends it with deep integrations into the Acme reliability stack:

| Feature | OSS | Triage for Acme |
|---------|-----|-----------------|
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

Advanced monitoring and Acme stack integration — [contact us](https://acmeagentsupply.com/contact) to enable Triage for Acme.
