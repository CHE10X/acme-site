---
title: Operator Recovery Protocol (ORP)
product: orp
---

# Operator Recovery Protocol

ORP is not a standalone product. It is the **internal recovery workflow** that the `triage` CLI executes when an operator initiates a recovery sequence.

Understanding ORP helps you understand what `triage` is actually doing under the hood — and why the workflow is structured the way it is.

---

## What ORP Is

ORP defines a deterministic four-step recovery path:

```
Detect → Classify → Recover → Verify
```

Each step has defined inputs, outputs, and evidence requirements. No step is skipped. No step is assumed successful without a verification artifact.

This structure exists because ad-hoc recovery is the #1 source of secondary incidents: operators change things before they understand the state, skip verification, and introduce new failures while fixing the original one.

---

## How It Maps to triage

| ORP Step | triage Command | What Happens |
|----------|---------------|--------------|
| Detect | `triage` | Read-only proof bundle — system state captured before anything changes |
| Classify | `triage -watch` | Live monitoring surface — establish what is stable vs. degrading |
| Recover | Operator-initiated | Guided steps based on classification; Agent911 provides the playbook |
| Verify | Agent911 snapshot | Confirms recovery was successful with before/after evidence |

The `triage` CLI is your entry point into ORP. Agent911 is the verification surface.

---

## Why This Page Exists

ORP is referenced in support documentation and incident playbooks. This page exists to explain the term — not to document a separate install or config.

For actual recovery workflows, start here:
- → [triage documentation](/docs/triage/overview)
- → [Agent911 — Snapshot Explained](/docs/agent911/snapshot-explained)
