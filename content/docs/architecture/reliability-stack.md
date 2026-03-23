---
title: The Reliability Stack — How the Pieces Fit
product: architecture
tier: CORE
---

# The Reliability Stack — How the Pieces Fit

ACME is building a reliability layer for agent infrastructure. The core model is:

**Detect → Diagnose → Govern → Recover → Operate → Orchestrate**

This is the story the market will eventually understand.

## Detect (Scan-time)

**RadCheck**

Fast, read-only inspection to surface early risk signals before failures become incidents.

## Diagnose (Evidence + Attribution)

RadCheck findings and incident evidence build an operator-readable picture of:

- stall risk
- silence gaps
- compaction pressure
- operational hygiene

## Govern (Policy Discipline)

**SphinxGate**

Enforces routing and provider policy guardrails. It helps ensure systems behave predictably as model/provider complexity increases. (Policy enforcement is real; no "magic routing.")

## Recover (Operator-Driven)

**Agent911**

Read-only cockpit and incident surface that provides deterministic recovery guidance and operator-driven playbooks. (v0.1 does not autonomously heal.)

## Operate (Continuous Protection)

**Sentinel / Watchdog**

Always-on monitoring and guardrails. These surfaces detect runtime anomalies that scans cannot.

## Orchestrate (Emerging)

**Transmission** (early access)

Task-aware model routing — right model, right cost, every call. Reduces input token footprint 85–90% via ToolFilterAdapter. Circuit breaker prevents rate-limit walls. Patent pending.

## Key Truths (Launch Discipline)

- No overclaims: evidence-based, operator-driven recovery
- Compaction is presented as risk posture + playbook, not "solved"
- RadCheck is scan-time; Sentinel is continuous runtime
