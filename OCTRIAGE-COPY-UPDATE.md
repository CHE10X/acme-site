# OCTriage Copy Updates — 2026-03-08
**Approved by:** Chip Ernst  
**Prepared by:** Heike Homarus  
**For:** Codex — implement on homepage, Operator Utilities, Support page

---

## 1. Homepage — Operator Console (OCTriage) Section

### Hero label (keep):
`OPERATOR CONSOLE`

### Card heading:
`Operator Console (OCTriage)`

### Body copy (replace current):
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

### Command (keep):
`octriage -watch`

### CTA (keep):
`Install OCTriage`

---

## 2. Operator Utilities Page — Registry Table Row

### OCTriage row, Function column (replace current):
`Captures system state before you touch anything. Runs independently of the stack it's diagnosing.`

*(Layer column stays: Diagnostics)*

---

## 3. Support Page — Insert callout block ABOVE "SUPPORT PROTOCOL" section

Insert this as a styled callout/panel block directly above "STEP 1 — GENERATE BUNDLE":

### Block heading:
`Why evidence comes before action`

### Block body:
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

### Block disclaimer (small text, beneath body):
`Read-only. No configuration changes. No system modifications.`

### Styling:
- Background: #161A1E (inset panel)
- Border: 1px solid #3A4048, left border 3px solid #D98A2B (amber accent)
- Font: body 16-17px, disclaimer 13px muted (#9AA3AD)

---

## Notes for Codex
- Do NOT change the support protocol steps themselves — only add the callout ABOVE them
- Do NOT change the Agent911 copy on the support page
- The OCTriage card on homepage should retain the telemetry/readout elements already present
- Truth constraint: OCTriage is read-only, captures evidence only, does NOT execute recovery
