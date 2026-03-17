---
title: Transmission — Task-Aware Model Routing
product: transmission
tier: CORE
status: launching-soon
---

# Transmission

> **Status:** Phase 1 launching soon. Early access signups open — [get notified when it ships](#early-access).

**The short version:** Your agent is using a $20-per-million-token model to answer a yes/no question. Transmission fixes that automatically.

Transmission is ACME's task-aware model router. It sits between your agent stack and your model providers and makes one decision on every call: *which model should handle this, at what token footprint, with which tools?*

If SphinxGate is the policy firewall and RadCheck is the diagnostic scanner, Transmission is the gearbox.

---

## The Problem

Without routing discipline, agent stacks degrade in predictable ways:

- Every task hits the same model, regardless of complexity
- Input context bloats with tool schemas the model doesn't need for this task
- Rate limit walls appear without warning — the call fails, context is lost
- Cost is invisible until the bill arrives

The result: a solo operator runs a weekly rent survey on Claude Opus, spends $160 in two weeks, and wonders what went wrong. Nothing went wrong with the model. The routing was wrong.

---

## How Transmission Works

Transmission addresses three distinct problems. Phase 1 ships all three together.

### 1. ToolFilterAdapter — 85–90% input token reduction

Most agent calls include the full tool schema whether or not those tools are relevant to the task. A context that's 10,000 tokens becomes 2,000–3,000 tokens once irrelevant tool schemas are stripped.

Transmission's ToolFilterAdapter classifies each task and passes only the tools the model actually needs. This happens before the model call. No AI required — pure classification and filtering.

**Impact:** Input token footprint drops 85–90% per call on typical agent workloads.

### 2. Circuit Breaker — proactive model health monitoring

The standard approach to model failures is reactive: the call fails, then you fallback. By then it's too late — the task was interrupted, context may be lost, and the user felt it.

Transmission's circuit breaker monitors model health scores continuously and routes *before* the failure hits. Three states:

| State | Meaning | Behavior |
|-------|---------|----------|
| **CLOSED** | Model healthy | Route normally |
| **HALF_OPEN** | Degraded, watching | Lightweight tasks only, ready to trip |
| **OPEN** | Unhealthy | Route away entirely, 10-minute cooldown, then probe |

**Example:** If a provider rate-limits after ~20 requests in a window, Transmission trips at 15. You never see the wall.

Circuit breaker profiles are model-specific — built from empirical field testing, not generic retry logic.

### 3. Token efficiency reporting

Every session produces a Transmission report:

```
Transmission Session Report — Last 30 days

EFFICIENCY
  Token reduction: 78% (vs naive-Sonnet + full schema baseline)
  Calls by tier: 12 orchestrator / 8 workhorse / 89 bulk / 34 free

RELIABILITY
  Circuit trips: 3 (avg recovery 8min, 0 unrecovered)
  Tier escalations: 4 (bulk → workhorse after failure)
  Filter errors: 0 (tool stripped that was needed)

HEALTH
  Models currently: 5 CLOSED / 0 HALF_OPEN / 0 OPEN
```

The efficiency score (0–100%) measures token reduction against a naive baseline (always-Sonnet + full schema). It's always accurate and comparable session-to-session — no pricing assumptions, no stale numbers.

Token counts are auditable: you can verify them against your own provider logs.

Dollar estimates are opt-in. Configure your own per-token rates and Transmission will calculate estimated spend using your numbers. If you don't configure it, dollar figures don't appear. Provider pricing is too volatile and too variable (subscriptions, middlemen, negotiated rates) for ACME to own that number on your behalf.

---

## What This Isn't

**Not failover.** Failover is reactive — something breaks, then you switch. Transmission is proactive. It routes before the failure based on task complexity and live model health scores.

**Not a claim that LLMs are deterministic.** They aren't. That's not the promise. The promise: you'll never pay orchestrator prices for a task that runs fine on a bulk-tier model, and you'll never hit a rate limit wall because nobody was watching.

**Not a replacement for the reliability stack.** Sentinel, Watchdog, and Agent911 remain your monitoring and recovery layer. Transmission is the economics layer.

---

## The Model Tiers

Transmission routes across four tiers based on task complexity (RCI score):

| Tier | Use case | Examples |
|------|----------|---------|
| **Orchestrator** | High-stakes reasoning, architecture decisions | Sonnet, Opus |
| **Workhorse** | Standard agent tasks, multi-step workflows | GPT-4 class |
| **Bulk** | High-volume, simple tasks | Haiku, Flash, Step Flash |
| **Free** | Heartbeats, simple Q&A, status checks | Local / free tier models |

Tier selection is automatic. The RCI (Routing Complexity Index) classifier reads the task and routes it. You don't configure per-task — you configure the model profiles once, and Transmission handles the rest.

---

## Where Transmission Fits

```
PLG funnel:
Free tools (RadCheck, OCTriage, Lazarus)
  → Transmission  ← economics layer, acquisition hook
  → Sentinel      ← first paid monitoring, retention layer
  → Agent911      ← expansion
```

Most operators find ACME because something broke or costs ran away. Transmission is the answer to the cost problem. Sentinel and Agent911 are why they stay.

---

## Early Access

Transmission Phase 1 is in active development (~2 weeks to ship). Leave your email to be first on the launch list — you'll get access before public announcement.

[Early access form — coming shortly]

---

## Integration

Transmission installs as a middleware hook into OpenClaw's dispatch layer. No public API changes required. OpenClaw handles routing internally.

Full install guide and config reference will be published at launch.

---

## Related

- [SphinxGate](/docs/sphinxgate/overview) — policy enforcement layer (runs after Transmission in the call chain)
- [RadCheck](/docs/radcheck/score-explained) — health scan, good starting point before wiring in Transmission
- [Sentinel](/docs/sentinel/overview) — continuous runtime monitoring
