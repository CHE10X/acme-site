---
title: When things feel off
---

If your agents behave unexpectedly, start here.

ACME can analyze your system posture using a secure diagnostic bundle generated locally on your machine.

## Step 1 — Generate bundle

```bash
acme_support_bundle.py --zip
```

## Step 2 — Attach the zip when contacting support

What we collect:

- recent reliability signals
- protection activity
- routing posture
- compaction indicators

What we never collect:

- API keys
- tokens
- secrets
- openclaw.json

ACME operates in observational mode. No system changes are performed during analysis.
