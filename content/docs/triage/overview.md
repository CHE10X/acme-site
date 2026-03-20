---
title: Triage
---

# Triage

Open-source. Read-only. Runs when nothing else will.

When your gateway is degraded, `openclaw doctor` can't answer — it's asking the sick system what's wrong. Triage reads directly from the filesystem. No gateway required.

![Triage output showing system health, reliability score, and protection state](/images/triage-output-v2.png)

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

All checks are **read-only**. No configuration changes. No system modifications. One command:

```bash
triage
```

**Run it before you touch anything.** Once you start changing the system, the state you needed to capture is gone.

[Install Triage — free →](/install/triage)

---

## Triage Pro

The open-source edition is the foundation. **Triage Pro** adds live monitoring and deep integration with the Acme reliability stack:

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

[Contact us](https://acmeagentsupply.com/contact) to enable Triage Pro.
