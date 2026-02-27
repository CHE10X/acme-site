---
title: Agent911 — Reliability Snapshot Explained
product: agent911
tier: RECOVERY
---

# Agent911 — Reliability Snapshot Explained

Agent911 is a **read-only reliability cockpit** and incident surface for agent stacks. It aggregates signals, highlights risk state, and provides operator-driven recovery playbooks. Agent911 v0.1 **does not autonomously heal** your system.

## What a "Snapshot" Means

A snapshot is a unified view of:

- current health signals (liveness, silence, stalls)
- recent anomalies and correlations (including compaction pressure)
- routing / governance status (when available)
- recovery readiness indicators (backup posture, restore assumptions)

It is designed to answer:

> "What is happening right now, and what should I do next?"

## What Agent911 Does

- Aggregates and surfaces reliability evidence
- Provides deterministic recovery guidance
- Produces operator-ready proof bundles (logs/excerpts, event traces)
- Maintains a system-of-record view for incidents

## What Agent911 Does NOT Do (v0.1 Truth)

- No autonomous recovery
- No self-healing
- No config mutation by default
- No "magic fixes" without operator intent

## When to Use Agent911

Use Agent911 when:

- the gateway is "up" but behavior is stuck
- the system is slow, flaky, or unresponsive
- you need a unified incident view for decision-making
- you need a repeatable recovery playbook and proof artifacts

## Next Step

If you're new, start with the 5-minute path:

- `/docs/quickstart/5-minute`
