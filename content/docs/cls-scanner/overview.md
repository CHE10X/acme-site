---
title: CLS Scanner — Context Load Score
product: cls-scanner
tier: CORE
status: concept
---

# CLS Scanner

> **Status:** Concept — spec complete, build pending.

The Context Load Score (CLS) Scanner measures not just *how big* an agent session is, but *what kind of big* — and whether it's a risk.

Session size alone is a poor proxy for danger. A 100k-token session dominated by boot prompts and workspace file injections behaves very differently from a 100k-token session dominated by tool outputs and repeated log dumps. The CLS Scanner tells you the difference.

---

## The Problem

Session bloat degrades agent performance before it shows up as a rate limit error. An overloaded session produces slower responses, higher costs, and eventually degraded output quality — often silently. By the time an operator notices something is wrong, the session has been impaired for hours.

Worse: org-level TPM pool pressure means one heavy session can starve other agents running at the same time. A critical-weight Hendrik session can rate-limit a small Gwen session that's done nothing wrong.

The CLS Scanner makes session burden visible and machine-readable — so Transmission and Quartermaster can act on it automatically.

---

## Five Dimensions

The CLS Scanner scores each agent session across five dimensions (0–100 each), then produces a composite score.

### 1. Size Score
Raw session weight: file size, line count, estimated tokens, and token growth rate over the past hour. A fast-growing session scores higher — growth rate matters, not just current size.

### 2. Composition Score
What *kind* of content is filling the session?

| Category | Risk level |
|----------|-----------|
| System / boot prompt | Expected — low risk |
| Workspace file injections | Medium — large if many files |
| Operator messages | Low |
| Agent responses | Low |
| Tool outputs | High — can explode quickly |
| Copied logs / transcripts | High — often duplicated |
| Repeated / duplicated content | Very high |

A session that's 60% tool output scores much higher than one that's 60% structured workspace files — even at the same total size.

### 3. Churn Score
Write frequency and pattern: writes per hour, large writes, retries, repeated near-identical messages, file-read bursts. High churn indicates thrashing — the agent is cycling, not making progress.

### 4. Risk Score (Predictive)
Leading indicators of impending overload: repeated large tool outputs, archive reinjection, repeated file loads, rapid token growth after wake, too many files touched per task. This score predicts trouble before it arrives.

### 5. Dependency Score
Continuity risk: can the agent answer correctly after a compaction or session reset? Does it reference context that exists only in session history — not in structured memory? High dependency scores indicate an agent that can't survive a reset without losing critical state.

---

## Severity Scale

| Score | Severity | Meaning |
|-------|----------|---------|
| 0–20 | Light | Normal operations |
| 21–40 | Healthy | Monitor passively |
| 41–60 | Elevated | Watch for growth |
| 61–80 | Heavy | Compact soon |
| 81–100 | Critical | Compact now — performance already degraded |

---

## Output

### Human-Readable Report

```
Session Weight Report — Hendrik
• Total Score: 84  CRITICAL
• Size: 72  |  Composition: 88  |  Churn: 91  |  Risk: 95  |  Dependency: 76

Top drivers:
• large workspace injections
• repeated log/tool output
• prior-task resume attempts
• missing promotion to working memory

Composition:
• 22% system/startup
• 18% injected files
• 9% operator messages
• 14% agent responses
• 31% tool/log output
• 6% duplicated/repeated context

Recommendation: compact and split workload
```

### Machine-Readable JSON (`cls_scores.ndjson`)

One record per scan per agent, appended to `~/.openclaw/watchdog/cls_scores.ndjson`:

```json
{
  "agent": "hendrik",
  "session_id": "...",
  "score_total": 84,
  "severity": "critical",
  "estimated_tokens": 182000,
  "composition": {
    "system": 0.22,
    "files": 0.18,
    "user": 0.09,
    "agent": 0.14,
    "tool_output": 0.31,
    "duplicate": 0.06
  },
  "risk_flags": [
    "large_tool_output",
    "resume_after_failure",
    "high_token_burst"
  ],
  "recommendation": "compact and split workload"
}
```

---

## How the Fleet Uses CLS Scores

CLS scores feed two downstream systems automatically:

**Transmission Load Governor** reads `cls_scores.ndjson` to compute fleet-level CLS pressure. High aggregate session burden contributes to PRESSURED and CRITICAL load states — even when provider 429 rates are low.

**Quartermaster v2** incorporates session burden into mission health projections. An agent running at CRITICAL session weight affects mission health scores for all tasks assigned to that agent.

---

## Expected Healthy Profiles by Agent

Different agents have different natural session profiles. The CLS Scanner uses agent-specific benchmarks — a document-heavy Gwen session should look different from a working-memory-heavy Hendrik session.

| Agent | Expected Profile |
|-------|-----------------|
| Gwen | Document-heavy, low churn — high composition, low risk |
| Gerrit | Playbook-heavy, low duplicate output |
| Hendrik | Working-memory heavy — should NOT be tool/log heavy |
| Quartermaster | Tiny, almost all structured state — should stay Light |
| Soren | File-heavy but stable — moderate size, low churn |

An agent whose actual profile deviates significantly from its expected profile is worth investigating.

---

## v1 Instrumentation

CLS v1 uses file-system and log-based inputs only. No runtime hooks required.

All inputs are file-system observable:

- Session file size and line count
- Estimated token count (character-based approximation)
- Timestamps (growth rate calculation)
- Text pattern matching (tool output detection, duplicate detection, archive reinjection detection)

v1 does not require access to live session memory or provider APIs. It reads what's already on disk.

---

## What CLS Doesn't Do

**It doesn't compact sessions.** CLS identifies risk; the operator (or a future automated hygiene layer) acts on it.

**It doesn't rate-limit agents.** That's Transmission's Load Governor — it reads CLS as an input to load state computation.

**It doesn't make routing decisions.** Transmission routes based on task complexity (RCI). CLS feeds fleet pressure signals, not per-call routing.

---

## Related

- [Transmission — Load Governor](/docs/transmission/load-governor) — primary consumer of CLS fleet pressure scores
- [Quartermaster v2](/docs/quartermaster/overview) — uses CLS burden in mission health projections
- [Sentinel](/docs/sentinel/overview) — per-agent runtime monitoring (different layer — Sentinel watches liveness, CLS watches session burden)
