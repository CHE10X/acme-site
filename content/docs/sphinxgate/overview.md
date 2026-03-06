---
title: SphinxGate — Policy Enforcement for Routing
product: sphinxgate
tier: CORE
---

# SphinxGate — Policy Enforcement for Routing

SphinxGate applies policy guardrails to model routing so systems behave predictably as provider and fallback complexity grows. It helps ensure approved providers and models are used, and that routing behavior can be understood and proven from logs.

## What SphinxGate Does

- Enforces allow/deny policy for routing
- Provides deterministic, inspectable routing decisions
- Supports fail-open vs hard-fail policy behavior (as configured)
- Emits routing evidence for audits and debugging

## What SphinxGate Does NOT Do

- No magic routing or quality guarantees
- No hidden provider switching without policy
- No changes to gateway schema via unsupported config keys

## Outputs

Routing decision signals that show what was chosen, why it was chosen, and what policy applied.

## Best For

Teams using multi-model fallbacks who need discipline and proof.
