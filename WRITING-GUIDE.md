# ACME Writing Guide
**Version:** 1.0  
**Owner:** Heike Homarus  
**Applies to:** All customer-facing text — website copy, product docs, support content, Bot Shop, release notes  
**Canonical location:** `CHE10X/acme-site` repo root

---

## The One Rule That Governs Everything

**Write for the operator who is working, not the investor who is browsing.**

Every sentence should help someone do something or understand something. If it doesn't do either, cut it.

---

## Surface 1 — Web Copy

*Homepage, platform page, pricing, Bot Shop, Operator's Tale, any marketing surface.*

### Voice

Operator-first. Confident without being arrogant. Direct without being cold. Some personality is allowed — ACME is a real company built by people who understand the problem. That should come through. But the work leads, not the attitude.

**The register:** A senior engineer explaining something clearly to a peer. Not a salesperson. Not a press release.

### Positive Rules

- **Lead with mechanism, not product name.** Say what it does before you say what it's called.  
  ✅ *"Captures a proof bundle before you touch anything — that's OCTriage."*  
  ❌ *"OCTriage is our first-response triage terminal."*

- **Use present tense.** Products do things now, not in theory.  
  ✅ *"RadCheck scores your stack across five domains."*  
  ❌ *"RadCheck will help you understand your reliability posture."*

- **Be specific.** Numbers, domains, sequences are more credible than adjectives.  
  ✅ *"Scores 0–100 across five risk domains."*  
  ❌ *"Comprehensive reliability assessment."*

- **Name the operator's actual situation.** Speak to what they feel at 2am, not what sounds impressive in a boardroom.  
  ✅ *"When something feels off and the logs say nothing."*  
  ❌ *"Gain unprecedented visibility into your AI infrastructure."*

- **Sentences earn their length.** Short is usually better. If a sentence needs a second clause, make sure the second clause adds something the first didn't.

- **CTAs tell you what happens next.** Not "Learn more" — say what they're learning. Not "Get started" — say what they're starting.  
  ✅ *"Run OCTriage →"* / *"See your reliability score"*  
  ❌ *"Get started"* / *"Learn more"*

### Prohibited Words and Phrases

Never use these on any customer-facing surface:

| Banned | Use instead |
|--------|------------|
| Powerful | Say what it does |
| Seamlessly | Say how it connects |
| Robust | Say what it withstands |
| Cutting-edge | Say what's new about it |
| Leverage | Use |
| Utilize | Use |
| World-class | Prove it or cut it |
| Next-generation | Say what generation means here |
| Unlock | Say what becomes possible |
| Revolutionary | Never |
| AI-powered | Everything is AI-powered. Say what the AI does. |
| Comprehensive | Say what it covers |
| Holistic | Never |
| Streamline | Say what gets faster or simpler |
| Empower | Say what the operator can now do |
| Innovative | Prove it or cut it |
| Solution | Say what it solves |
| Ecosystem | Say what connects to what |

### Amber Words (use sparingly — one per section maximum)

These aren't banned but lose power when overused: *intelligent, precise, deterministic, reliable, real-time.*

### Product Name Rules

- Product names are always capitalized: RadCheck, Sentinel, SphinxGate, DriftGuard, Agent911, Watchdog, Lazarus, Transmission, FindMyAgent, OCTriage
- Never abbreviate product names in user-facing copy
- Version numbers are required when making version-specific claims: "Agent911 v0.1" not "Agent911"
- Never use amber text for inline product name mentions — amber is reserved for CTAs and status indicators only

### Company Name Rules

**Legal entity:** Acme Agent Supply, LLC — use this exact form only in legal and quasi-legal contexts: Terms of Service, Privacy Policy, Refund Policy, order confirmations, support tickets, invoices.

**Brand names (everywhere else):** All three are acceptable and interchangeable:
- Acme Agent Supply Co. ← preferred long form
- Acme Agent Supply ← acceptable
- ACME ← acceptable shorthand

Do not call attention to the LLC structure in marketing or product copy. Do not write "Acme Agent Supply Co., LLC" — that's redundant. Use the legal name only where legal precision is required.

**Formation date:** March 3, 2026 — use this date in all policy "effective date" and "last updated" fields.

### What ACME Is and Isn't

Always write from these frames:

| We are | We are not |
|--------|-----------|
| Reliability infrastructure | A monitoring dashboard |
| The layer under every agent stack | An orchestration platform |
| Tools that work when your stack doesn't | Another observability product |
| Evidence before action | Automated remediation |

---

## Surface 2 — Product Documentation

*`/docs`, quickstarts, reference pages, CLI reference, troubleshooting.*

### The Standard

Docs have one job: get the operator to a working result. The measure is the **20-minute test** — a new operator who has never used the product reads the doc and gets something working in 20 minutes without asking anyone. If they can't, the doc isn't finished.

Docs are not marketing. They do not need to be interesting, compelling, or brand-expressive. They need to be correct, complete, and navigable.

### Voice

Imperative. Precise. Neutral. The reader is working — they're trying to accomplish something. Write for that person, not for someone browsing.

**The register:** A technical manual. Clear. No personality required. No personality wanted.

### Positive Rules

- **Use imperative voice for instructions.**  
  ✅ *"Run `radcheck --scan`."*  
  ❌ *"You can run `radcheck --scan` to initiate a scan."*  
  ❌ *"Users should run `radcheck --scan`."*

- **Show every command verbatim.** No paraphrasing. No `<your-value>` without explicit explanation of what to substitute.

- **Show expected output.** Every step that produces output must show what that output looks like. If the output is long, show a trimmed version with `...` markers.

- **State what the product does NOT do.** Every overview and quickstart must include an explicit "What this does not do" section. Version-attributed.  
  ✅ *"Agent911 v0.1 does not modify your configuration. It is read-only."*

- **One thing per step.** If a step requires two actions, make it two steps.

- **Define terms on first use.** Don't assume the operator knows what "proof bundle," "runtime hygiene," or "drift delta" means. Define it once, at first use.

- **Link forward, not backward.** If the reader needs to do X before Y, say so at the top of the Y doc — don't assume they read X first.

### What Docs Are Never Allowed to Say

- No marketing language from Surface 1's prohibited list — doubly banned in docs
- No future tense for current capability: never "RadCheck will score" — say "RadCheck scores"
- No "easy," "simple," "just," "straightforward" — if it were easy, they wouldn't need the doc
- No vague success criteria: never "your agent should be working" — say exactly what working looks like and how to verify it
- No undocumented options: if a config field exists, it's in the docs. No exceptions.

### Required Sections by Doc Type

**Overview (`overview.md`):**
- What it is (one sentence, no adjectives)
- What it does (mechanism, not marketing)
- What it does NOT do (version-attributed)
- Who it's for
- Where it fits in the stack
- Prerequisites

**Quickstart (`quickstart.md`):**
- Time estimate + end state ("In ~10 minutes you will have X running and see Y")
- Prerequisites checklist
- Numbered steps, each with command + expected output
- Verification step ("How to confirm it's working")
- Next steps (links to configuration reference, how-it-works)

**Reference docs (`configuration.md`, `cli-reference.md`, `output-reference.md`):**
- Every option documented — no exceptions
- Type, default, valid values for every field
- Example for every flag/option

**Troubleshooting (`troubleshooting.md`):**
- Lead with a diagnostic command — run this first, always
- Each issue: symptom → cause → fix (exact commands)
- If the fix doesn't work: escalation path

### Code Block Rules

- Every command in a code block. No inline `code` for commands.
- Language specified on every code block: ` ```bash `, ` ```yaml `, ` ```json `
- Comments in code blocks explain *what* the line does, not *that* it does it  
  ✅ `# scan all active agent sessions`  
  ❌ `# run this command`

---

## Version Attribution

Any claim about what a product does or doesn't do must be attributable to a specific version.

**Rule:** If a product version is v0.x, it is explicitly pre-production. Any claim about its capabilities must include the version number.

✅ *"Agent911 v0.1 is a read-only cockpit."*  
❌ *"Agent911 is a read-only cockpit."* (ages poorly as the product evolves)

This rule applies to all surfaces — web copy and docs alike.

---

## The Hard List (non-negotiable across all surfaces)

These are product-level truth constraints. Violating them is a factual error, not a style issue.

| Product | Never say |
|---------|-----------|
| Agent911 v0.1 | Self-healing, autonomous recovery, automated remediation, fixes itself |
| RadCheck | Monitors (it scans — point-in-time, not continuous) |
| Lazarus | Recovers (it verifies recoverability — it doesn't execute recovery) |
| OCTriage | Fixes, remediates, changes anything (it is read-only capture only) |
| Any product | Does something it doesn't currently do in the shipped version |

When in doubt: ask Soren. He is the source of truth for product capability claims.

---

## Review Process

| Surface | Who reviews |
|---------|------------|
| Web copy | Heike (tone) → Chip (approval before publishing) |
| Product docs | Soren (accuracy) → Heike (tone) → Hendrik (technical accuracy on CLI/output files) |
| Support copy | Heike (tone) → Gerrit (accuracy for support workflows) |
| Release notes | Soren (accuracy) → Heike (tone) |

Nothing ships externally without completing its review chain.

---

*ACME Writing Guide v1.0 — Heike Homarus 🦀 — 2026-03-08*  
*Questions on web copy tone: Heike. Questions on product accuracy: Soren. Questions on technical accuracy: Hendrik.*
