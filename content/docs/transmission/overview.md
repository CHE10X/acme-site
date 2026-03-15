---
title: Transmission — Deterministic Model Routing
product: transmission
tier: CORE
status: roadmap
---

# Transmission — Deterministic Model Routing

> **Status:** Transmission is in active development. The architecture and config spec below reflect the planned MVP. This page documents the design so operators can prepare — not something you can install today.

Transmission is the routing fabric for OpenClaw-class agent stacks. It separates *what work is being done* from *which model executes it* — the abstraction most agent systems are currently hand-patching around.

If SphinxGate is the policy firewall and RadCheck is the diagnostic scanner, Transmission is the gearbox.

---

## The Core Problem

Without lane discipline, model routing in agent stacks degrades in predictable ways:

- Background automation consumes interactive budget
- Fallback order is implicit and untested until a provider goes down
- "Which model ran this task?" becomes unanswerable
- Cost optimization requires rewriting routing logic every time

Transmission makes routing explicit, observable, and testable.

---

## The 2-Lane Model

Transmission routes all work through two canonical lanes:

**Interactive lane** — human-facing, quality-first. Claude leads. All allowed providers in priority order.

**Background lane** — batch, automation, cost-first. No Claude. Starts with a capable model (gpt-4.1-mini) for heavy work, falls back to Flash-Lite and DeepSeek for throughput.

> **Critical rule:** Background lane must start with a model capable of completing complex tasks. Flash-Lite is not the first heavy-work fallback — it's the second hop.

---

## Config Reference (MVP Spec)

Transmission reads from `~/.openclaw/watchdog/transmission_config.json`:

```json
{
  "lanes": {
    "interactive": {
      "chain": [
        "anthropic/claude-sonnet-4-6",
        "google/gemini-2.5-flash-lite",
        "openai/gpt-4-turbo"
      ]
    },
    "background": {
      "chain": [
        "openai/gpt-4.1-mini",
        "google/gemini-2.5-flash-lite",
        "openrouter/deepseek-v3"
      ]
    }
  },
  "defaults": {
    "lane": "interactive"
  }
}
```

Lane selection priority at runtime:
1. Explicit `route()` parameter
2. Agent metadata
3. `OPENCLAW_LANE` environment variable
4. Config default (`interactive`)

---

## How Transmission and SphinxGate Work Together

Transmission runs before SphinxGate:

```
Transmission (build chain) → SphinxGate (filter by policy) → Provider callers
```

Transmission decides which providers should try. SphinxGate decides which are allowed. If SphinxGate strips providers from the built chain, it emits `TRANSMISSION_POLICY_REDUCED` — the proof record that both layers cooperated.

---

## Observability

Transmission logs every routing decision to `~/.openclaw/watchdog/transmission_events.log` (NDJSON):

| Event | Meaning |
|-------|---------|
| `TRANSMISSION_LANE_RESOLVED` | Lane determined for this call |
| `TRANSMISSION_CHAIN_BUILT` | Provider chain materialized |
| `TRANSMISSION_PROVIDER_ATTEMPT` | Individual provider being tried |
| `TRANSMISSION_FAILOVER` | Falling back to next provider in chain |
| `TRANSMISSION_SUCCESS` | Call completed |
| `TRANSMISSION_EXHAUSTED` | All providers failed — structured failure returned to caller |
| `TRANSMISSION_POLICY_REDUCED` | SphinxGate removed providers from chain |

`TRANSMISSION_EXHAUSTED` is a hard contract. Transmission never silently succeeds when all providers fail.

---

## Performance Targets

Transmission adds routing overhead, not execution overhead:

| Operation | Target |
|-----------|--------|
| Lane resolution | < 2 ms |
| Chain build | < 3 ms |
| Total added overhead | < 10 ms |
| Hot path blocking I/O | Zero |

---

## What Ships in MVP

1. Two-lane deterministic routing (Interactive / Background)
2. SphinxGate policy integration + reduced-chain logging
3. Full observability event stream
4. Structured failure contract (no silent exhaustion)

**Post-MVP (not in v1):** `cheap` lane (simple/low-stakes tasks), `rescue` lane (always-respond when degraded), TUI dashboard, per-lane cost accounting.

---

## Next Step

Transmission is on the roadmap. In the meantime, SphinxGate can enforce lane policy directly — see the [SphinxGate documentation](/docs/sphinxgate/overview) for current routing configuration options.
