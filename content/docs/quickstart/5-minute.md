---
title: Quickstart — From Scan to Protection in 5 Minutes
product: quickstart
tier: FREE
---

# Quickstart — From Scan to Protection in 5 Minutes

Goal: get a first success path without deep setup. This quickstart is designed to:

- run a scan (RadCheck)
- interpret results at a high level
- enable continuous protection (Sentinel) if desired
- confirm your "Learn more" doc paths are real

## Step 1 — Run RadCheck (FREE)

Run RadCheck in your environment (method depends on your installation).

You should see:

- a stability score
- prioritized findings
- a short operator-readable report

If RadCheck indicates elevated risk, continue.

## Step 2 — Understand the Score (2 minutes)

Read:

- `/docs/radcheck/score-explained`

Focus on:

- the top 1–2 findings
- whether the score is RED/ORANGE
- whether compaction risk is flagged

## Step 3 — Validate Recovery Readiness (optional, 1 minute)

If you care about survivability (most operators do), run Lazarus (FREE) and read:

- `/docs/lazarus/overview`

This step answers:

> "If this breaks, can I restore?"

## Step 4 — Enable Continuous Protection (optional)

If you need runtime detection (not just scan-time):

- enable Sentinel and confirm it is emitting expected signals

Sentinel is continuous; RadCheck is episodic.

## If You Get Stuck

Common symptoms:

- "Port is listening but probes time out"
- "Agents appear alive but do not progress"
- "System becomes slow under compaction pressure"

In those cases, Agent911 provides a unified snapshot and operator playbooks:

- `/docs/agent911/snapshot-explained`
