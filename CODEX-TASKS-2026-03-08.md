# CODEX TASKS — 2026-03-08
**Issued by:** Heike Homarus (Marketing)  
**Approved by:** Chip Ernst  
**Based on:** Site audit 2026-03-08 + OCTriage copy direction  
**Reference:** AUDIT-2026-03-06.md, OCTRIAGE-COPY-UPDATE.md  

Complete tasks in priority order. Do not combine unrelated changes into one commit.

---

## P0 — Fix before anything else

---

### TASK-01 · Pricing — fix Sentinel / Operator Kit card overlap

**File:** `app/pricing/page.tsx` (or equivalent component)  
**Problem:** In the Standard Issue row, the Sentinel card and Operator Kit card are z-fighting. The `MOST POPULAR` badge on Sentinel is clipped behind Operator Kit. Cards overlap instead of sitting side-by-side.  
**Fix:** Remove any `absolute` or negative-margin positioning causing the overlap. Cards should be standard grid siblings with equal height. Badges should sit inside their own card container.  
**Verify:** Standard Issue row shows Sentinel and Operator Kit as distinct, non-overlapping cards at all viewport widths.

---

### TASK-02 · Docs — remove orphaned icon from hero

**File:** `app/docs/page.tsx` or docs hero component  
**Problem:** An orange circular badge/image renders in the top-right corner of the docs page hero. It does not belong there.  
**Fix:** Find and remove the element. It appears to be a misplaced product logo or imported image component.  
**Verify:** Docs hero shows only title ("Documentation"), subtitle, and eyebrow. No icon.

---

### TASK-03 · Docs — remove dashed amber dot-line below header

**File:** `app/docs/page.tsx` or docs hero component  
**Problem:** A horizontal row of dashed amber dots renders below the docs page header. It is unexplained and looks broken.  
**Fix:** Find and remove the element. It may be a loading indicator, decorative element, or leftover component.  
**Verify:** Docs header flows cleanly into the architecture diagram section with no decorative line between them.

---

## P1 — OCTriage copy (approved direction — see OCTRIAGE-COPY-UPDATE.md)

---

### TASK-04 · Homepage — rewrite OCTriage card body copy

**File:** Homepage component containing the Operator Console / OCTriage section  
**Problem:** Current copy leads with "first-response triage terminal" — this doesn't communicate the core insight.  
**Replace current body copy with:**
```
Your debugging tools run on the system that's broken.

When an agent stack degrades, native diagnostics are the first to become unreliable.
Logs need a running process. Dashboards need a responding system. If the control plane
is unhealthy, the tools that depend on it go dark too.

OCTriage runs independently. It captures a deterministic, read-only proof bundle —
timestamps, state, signals — before you touch anything. Once you start changing things,
that evidence is gone.

Run OCTriage first. Every time.
```
**Keep:** command (`octriage -watch`), CTA button, telemetry readout elements, card structure.  
**Do not change:** any other homepage sections.

---

### TASK-05 · Operator Utilities — update OCTriage table description

**File:** `app/operator-utilities/page.tsx` or bot-shop equivalent  
**Find:** OCTriage row in the Utility Registry table  
**Current Function column text:** `"Generates deterministic diagnostics and proof bundles."`  
**Replace with:** `"Captures system state before you touch anything. Runs independently of the stack it's diagnosing."`  
**Keep:** Layer column (`Diagnostics`), Command column (`octriage`), all other rows unchanged.

---

### TASK-06 · Support page — add callout block above protocol steps

**File:** `app/support/page.tsx` or support page component  
**Location:** Insert directly above the `SUPPORT PROTOCOL` / `STEP 1 — GENERATE BUNDLE` section  
**Insert this block:**

Heading: `Why evidence comes before action`

Body:
```
The instinct when something breaks is to start fixing — restart the agent, check the
config, dig through logs. That instinct will cost you the one thing you actually need:
an accurate picture of what was happening when it broke.

Native monitoring tools run on top of the system they're observing. When that system
is unhealthy, they become unreliable or go dark entirely. You can't debug a broken
system with tools that depend on it working.

Step 1 is always generate the bundle. Not because it's process — because it's the
only time you can. The state is observable right now, before intervention changes it.
```

Footer disclaimer (small, muted): `Read-only. No configuration changes. No system modifications.`

**Styling:**
- Background: `#161A1E`
- Border: `1px solid #3A4048`, left border `3px solid #D98A2B`
- Body font: 16px, color `#C8D4E0`
- Disclaimer font: 13px, color `#9AA3AD`

**Do not change:** the protocol steps, code blocks, or any other support page content.

---

## P2 — Visual polish

---

### TASK-07 · Pricing — style "Add module" links as buttons

**File:** Pricing page component  
**Problem:** SphinxGate, DriftGuard, and Transmission "Add module" text are plain links with no click affordance.  
**Fix:** Style as outlined buttons: `border: 1px solid #3A4048`, `border-radius: 4px`, `padding: 6px 14px`, `font-size: 13px`, `color: #9AA3AD`. On hover: `border-color: #D98A2B`, `color: #D98A2B`.  
**Do not use amber fill** — amber is reserved for primary CTAs only. These are secondary actions.

---

### TASK-08 · Support page — fix Human / AI toggle button styling

**File:** Support page component  
**Problem:** "AI" tab has amber filled background; "Human" is plain unstyled text. Inconsistent.  
**Fix:** Make both tabs match as outlined pill buttons. Active state: `background: #2C3238`, `border: 1px solid #D98A2B`, `color: #E6E6E6`. Inactive state: `background: transparent`, `border: 1px solid #3A4048`, `color: #9AA3AD`.

---

### TASK-09 · Operator's Tale — upgrade bottom CTA from plain text to panel

**File:** Operator's Tale page component  
**Problem:** The bottom CTA "Get started with OpenClaw Triage Unit to capture evidence before recovery" renders as plain small text — no visual weight.  
**Fix:** Wrap in a full-width amber CTA panel. Background: `#D98A2B`. Text: dark (`#18202A`), `font-weight: 600`, `font-size: 16px`. Button style, not just text. Add `→` arrow at end.

---

## P3 — Homepage terrain map (coordinate with Chip before implementing)

---

### TASK-10 · Homepage — replace Codex-built terrain with operator-terrain-v2.html

**File:** Homepage terrain section component (`OperatorTerrainSection.tsx` or equivalent)  
**Problem:** Current terrain is a custom-built simplified React component — basic SVG nodes and circles. The actual terrain file (`operator-terrain-v2.html`) is in the repo at `public/fieldmap/operator-terrain-v2.html` and is not being used.  
**Options (pick one, confirm with Chip):**
- **Option A (recommended):** Extract the SVG + embedded CSS + JS from `operator-terrain-v2.html` and render inline inside the section component. Full-bleed, no iframe scroll trapping.
- **Option B:** Serve via full-bleed `<iframe src="/fieldmap/operator-terrain-v2.html">` with `scrolling="no"`, `height="620px"`, and CSS `pointer-events` handling.
**Do not rebuild from scratch.** The file exists. Use it.  
**Note:** This task is P3 — confirm approach with Chip before starting.

---

## GUARDRAILS

- Do NOT edit `app/legal/**`
- Do NOT add `--webpack` to any build script
- Do NOT remove `output: "export"` from `next.config.ts`
- Do NOT change Agent911 copy anywhere — v0.1 scope is precisely defined, any change needs Soren + Chip sign-off
- Build verify before pushing: `npm run build` must pass clean

---
*Heike Homarus 🦀 — 2026-03-08*
