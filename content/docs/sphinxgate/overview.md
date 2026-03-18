---
title: SphinxGate — Access Control & Policy Enforcement
product: sphinxgate
tier: CORE
layer: access-control
---

# SphinxGate — Access Control & Policy Enforcement

SphinxGate is ACME's **access control layer** — distinct from the resilience layer. It applies policy guardrails to model routing so agent systems behave predictably as provider and fallback complexity grows. It enforces which models are allowed on which workloads, prevents background agents from consuming interactive budget, and produces an auditable record of every routing decision.

> **Stack position:** SphinxGate operates at Layer 0 (access control), not inside the resilience layer. It governs what can run. The resilience layer (Sentinel, InfraWatch, Watchdog, Lazarus, Agent911) governs what's healthy and how to recover.

## What SphinxGate Does

- Enforces allow/deny policy per routing lane
- Separates interactive and background workloads at the policy layer
- Tracks token usage per routed call and writes to `tokens.log`
- Supports fail-open vs. hard-fail behavior per lane (as configured)
- Makes model behavior deterministic under budget stress
- Emits routing decision evidence for debugging and audits

## What SphinxGate Does NOT Do

- No magic routing or quality guarantees
- No hidden provider switching — every decision is logged
- No changes to `openclaw.json` or unsupported config keys
- No guarantee of provider availability — it enforces policy on the chain Transmission provides

---

## The Core Problem SphinxGate Solves

Without lane separation, a background automation job can exhaust your Claude quota while a user is waiting for a response. SphinxGate prevents this by enforcing that each workload type uses only its assigned providers.

---

## Routing Lanes

SphinxGate enforces policy across two canonical lanes:

**Interactive lane** — human-facing, quality-first. Claude leads. All providers allowed by default.

**Background lane** — batch, automation, cost-first. Claude is excluded. Starts with a capable model (gpt-4.1-mini), not a cost-minimum fallback.

> **Critical rule:** The background lane must start with a model capable of completing complex tasks. Flash-Lite and DeepSeek are valid second and third hops — not the primary fallback for heavy work.

---

## Config Reference

SphinxGate is configured per lane. Example:

```json
{
  "sphinxgate": {
    "lanes": {
      "interactive": {
        "allow_providers": ["anthropic", "openai", "google", "openrouter"],
        "deny_providers": [],
        "fail_open": false
      },
      "background": {
        "allow_providers": ["openai", "google", "openrouter"],
        "deny_providers": ["anthropic"],
        "fail_open": true
      }
    }
  }
}
```

**`fail_open: false`** (interactive) — if all allowed providers are exhausted, SphinxGate returns a structured failure. Do not silently degrade a human-facing interaction.

**`fail_open: true`** (background) — if policy exhausts the chain, SphinxGate routes with the original chain and logs a telemetry event. Background work should never dead-end.

---

## Integration with Transmission

SphinxGate runs **after** Transmission in the routing stack:

```
Transmission (builds chain) → SphinxGate (filters by policy) → Provider callers
```

Transmission decides which providers should try. SphinxGate decides which are allowed. If SphinxGate strips providers from the chain, it emits `TRANSMISSION_POLICY_REDUCED` — this is the proof that the two layers are cooperating.

---

## Output Files

| File | Contents |
|------|----------|
| `tokens.log` | Per-call token usage, lane, provider, model, timestamp |
| `model_state.json` | Current policy state, last routing decision, active lane config |

Both files are **append-only or read-only outputs**. SphinxGate never modifies `openclaw.json`.

---

## Best For

Teams using multiple LLM providers who need discipline and proof. SphinxGate is particularly valuable when:

- Regulated buyers need to answer "which model made that decision?"
- Provider fallbacks are configured and you need to verify they're behaving correctly
- Background automation is consuming more interactive budget than expected
- You need a routing audit trail for incident review

---

## Next Step

SphinxGate works in tandem with Transmission. If you haven't configured lane routing yet, see the [Transmission documentation](/docs/transmission/overview) first.
