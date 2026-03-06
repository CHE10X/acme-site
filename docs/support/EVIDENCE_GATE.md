# Support Evidence Gate v1.1

**Owner:** Hendrik Homarus | **Date:** 2026-03-05 | **Status:** Active

---

## Intent

Support tickets without diagnostic evidence cannot be triaged efficiently. The Evidence Gate enforces a simple rule: **no triage without evidence.**

Evidence means one of:
- OCTriage output (from running `octriage`)
- A proof bundle path (from `octriage` or `orp_run.sh`)

This prevents support chaos, reduces back-and-forth, and ensures Gerrit always starts from a deterministic diagnostic state.

---

## Required Intake Fields

All required on every support/bug issue:

| Field | Type | Notes |
|-------|------|-------|
| Contact Email | text | For follow-up |
| Product | dropdown | Controlled list — must match product catalog |
| Issue Type | dropdown | bug / install / config / performance / billing / other |
| Description | textarea | What happened, what was expected |
| OpenClaw Version | text | `openclaw --version` |
| Environment | dropdown | macOS / Linux / Docker / k8s / other |

---

## Evidence Requirement

**One of the following must be present:**

**A) OCTriage Output** — paste full terminal output of `octriage`:
```bash
octriage
```

**B) Proof Bundle Path** — path to octriage bundle or ORP report:
```
~/octriage-bundles/YYYYMMDD-HHMMSS
workspace/reports/orp_runs/orp_run_YYYYMMDDTHHMMSSZ.json
```

---

## Enforcement Rules

**RULE 1 — NONCOMPLIANT:** Required fields missing OR no evidence present
**RULE 2 — On NONCOMPLIANT:**
- Apply label: `needs-evidence`
- Post single operator comment (not repeated on edits)
- Auto-close after 24h grace window (unless `evidence-ok` is present)

**RULE 3 — On COMPLIANT:**
- Remove `needs-evidence`
- Apply `evidence-ok` + `triage-needed`
- Post confirmation comment if transitioning from noncompliant

**RULE 4 — Gate scope:** Only runs on issues with label `support`, `bug`, or `triage-needed`. Feature requests are not gated.

---

## Labels

| Label | Applied when |
|-------|-------------|
| `support` | Issue created via support_request.yml |
| `bug` | Issue created via bug_report.yml |
| `triage-needed` | Evidence compliant, awaiting triage |
| `needs-evidence` | Noncompliant — gate blocked |
| `evidence-ok` | Evidence confirmed present |

---

## Files

| File | Purpose |
|------|---------|
| `.github/ISSUE_TEMPLATE/support_request.yml` | Support intake form |
| `.github/ISSUE_TEMPLATE/bug_report.yml` | Bug report form |
| `.github/workflows/support-evidence-gate.yml` | Gate action (opens/edits) |
| `.github/workflows/support-evidence-autoclose.yml` | Auto-close (hourly cron) |
| `docs/support/EVIDENCE_GATE.md` | This document |

---

## Noncompliant Comment (canonical)

```
Support request received, but required diagnostic evidence is missing.

OpenClaw support operates on an evidence-first model.
We do not triage issues without system diagnostics.

Please run the OpenClaw triage tool and include the output.

Command:

    octriage

Then update this issue with ONE of the following:

• OCTriage terminal output
• Proof bundle path (example: ~/octriage-bundles/20260304-110938)
• ORP report path (example: reports/orp_runs/orp_run_YYYYMMDD.json)

Once evidence is attached, the issue will automatically enter the triage queue.

Issues without diagnostic evidence may be closed automatically after 24 hours.

Reference: OpenClaw Evidence-First Support Policy
```

---

## Support Agent Behavior (Gerrit)

When an issue reaches `evidence-ok` + `triage-needed`:
1. Read the OCTriage output or load the proof bundle
2. Check `protection_report.json` state if accessible
3. Draft a response using evidence-first diagnosis
4. Submit for operator approval before posting

Gerrit never responds to `needs-evidence` issues — gate handles intake.
