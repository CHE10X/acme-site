---
title: Quickstart
---

# Quickstart

> **Note:** Packaged installation (one-command setup) is coming soon. This page will be updated with the real install path when it ships. The steps below describe what a full quickstart will look like — and what you can do right now.

---

## What You'll Have After Setup

- RadCheck running — first reliability score for your stack
- Sentinel guarding — continuous runtime detection active
- Agent911 snapshot available — unified incident view ready

All in observational mode. Nothing changes on your system without explicit operator action.

---

## What You Can Do Now

### Step 1 — Run triage (available today)

`triage` is the open-source diagnostic CLI. It's the right first tool to run against any OpenClaw stack you want to evaluate.

```bash
curl -fsSL https://acmeagentsupply.com/install/triage | bash
triage
```

This produces a read-only proof bundle at `~/.openclaw/triage-bundles/` — gateway health, session topology, disk pressure, binary integrity, compaction status, and fleet identity. No account required.

### Step 2 — Interpret your results

Once `triage` completes, look at the bundle:

- `gateway_status.txt` — is the gateway alive and responding?
- `compaction_status.txt` — any active compaction pressure?
- `fleet_identity.txt` — version, uptime, environment confirmed

### Step 3 — Get a RadCheck score

RadCheck produces a 0–100 reliability score with ranked risk findings. [See what the score means →](/docs/radcheck/score-explained)

A RED or ORANGE score is the natural starting point for a conversation about Sentinel and Agent911.

---

## Full Quickstart (Coming Soon)

The packaged installer will wire up RadCheck, Sentinel, and Agent911 in a single command. When it ships, this page will show the real command and expected output.

If you want early access or need to get a stack evaluated now, [contact us](https://acmeagentsupply.com/contact) — we'll walk through it manually.
