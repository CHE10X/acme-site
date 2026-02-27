---
title: RadCheck — What the Score Means
product: radcheck
tier: FREE
---

# RadCheck — What the Score Means

RadCheck is a fast, **read-only** scan that surfaces early reliability risks in an OpenClaw-style agent stack. It does **not** change your runtime. It produces a score to help you decide what deserves operator attention first.

## What RadCheck Measures

RadCheck score reflects a risk posture across common failure precursors:

- **Stall risk signals** (systems appear "up" but stop making progress)
- **Silence gaps** (missing expected activity/heartbeat evidence)
- **Compaction pressure** (patterns correlated with multi-minute stalls)
- **Operational hygiene** (backup posture, log continuity, safety boundaries)

This is a diagnostic indicator, not a guarantee.

## Score Bands

- **80–100 (GREEN):** Low immediate risk. Keep monitoring and baseline.
- **60–79 (YELLOW):** Moderate risk. Address top findings soon.
- **40–59 (ORANGE):** High risk. Expect flaky/slow behavior under load.
- **0–39 (RED):** Critical risk. Incident likelihood is elevated.

## Velocity (Score Trend)

RadCheck becomes more valuable over time as you collect repeat scans.

- **Rising score:** risk posture improving (good)
- **Falling score:** new instability signals detected (investigate)
- **Volatile score:** environment is changing frequently; stabilize inputs

Velocity should be monotonic in time (no backwards timestamps). Regressions should be logged.

## What RadCheck Does NOT Claim

RadCheck does not claim:

- that your system is "safe"
- that stalls are eliminated
- that failure will not occur
- that recovery is automatic

It helps you prioritize the next best operator action.

## Recommended Next Steps

If RadCheck reports elevated risk:

1. **Run Quickstart**: `/docs/quickstart/5-minute`
2. **Enable continuous monitoring** (Sentinel) if you need runtime detection
3. **Validate recovery readiness** (Lazarus) before incidents force the test
4. Review governance needs (SphinxGate) if multi-model routing is involved
