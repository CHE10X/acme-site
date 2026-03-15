---
title: DriftGuard — Memory Integrity
product: driftguard
tier: ENTERPRISE
---

# DriftGuard — Memory Integrity

DriftGuard maintains agent memory health across sessions. It detects silent drift in agent state — the gradual divergence between what an agent is supposed to know and what it actually carries into each conversation — before that drift becomes a reliability or accuracy incident.

## The Problem DriftGuard Solves

Agent memory isn't static. Session context, tool outputs, and injected state accumulate across runs. Over time, inconsistencies build: outdated facts persist, conflicting signals compound, and agent behavior shifts in ways that aren't visible from a single session view.

Standard monitoring doesn't catch this. A gateway heartbeat tells you the agent is alive. DriftGuard tells you whether the agent is still coherent.

## What DriftGuard Does

- Monitors memory artifacts for consistency across sessions
- Detects baseline deviations — unexpected changes in agent state relative to prior known-good state
- Identifies context drift patterns that precede reliability erosion
- Surfaces memory integrity posture to Agent911 and the broader reliability stack

## What DriftGuard Does NOT Do

- No autonomous memory correction
- No destructive operations on memory artifacts
- No modification of agent context without operator action
- No guarantees about model-level behavior — DriftGuard monitors the artifacts, not the inference

---

## Signals DriftGuard Tracks

**Baseline deviation** — memory artifact content has changed in ways inconsistent with expected session-to-session evolution. Could indicate corruption, injection, or unexpected tool side effects.

**Context drift patterns** — recurring patterns in how context shifts over time. Some drift is expected; DriftGuard distinguishes normal accumulation from anomalous change.

**Memory integrity posture** — an aggregate signal (fed to Agent911) representing overall health of memory artifacts across monitored agents.

---

## Stack Position

DriftGuard is part of the **Memory Integrity layer**, alongside Elixir.

- Elixir manages the active memory surface (injection, hydration)
- DriftGuard watches for divergence in that surface over time

Together they form a detect-and-maintain loop: Elixir builds the memory state, DriftGuard confirms it stays coherent.

---

## Who Needs DriftGuard

DriftGuard is in the Enterprise tier because the risk it addresses scales with fleet size and session duration. A single short-lived agent session has low drift exposure. A fleet of long-running agents with shared memory context has significant exposure that compounds invisibly without monitoring.

If you're running:
- Agents with persistent memory across multi-day or multi-week runs
- Multiple agents sharing overlapping context artifacts
- Agents where behavioral consistency is a compliance or accuracy requirement

— DriftGuard is the layer that surfaces drift before it becomes an incident.

---

## Next Step

DriftGuard signals feed into Agent911's unified view. If you haven't set up Agent911 yet, see the [Agent911 documentation](/docs/agent911/snapshot-explained).
