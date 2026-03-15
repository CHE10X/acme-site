---
title: recall
---

# recall

`recall` is the manual intervention surface of the Acme control plane. It is the operator's hand on the system — the ability to act immediately, precisely, and safely when automated recovery is insufficient or you need direct control.

`recall` is an Acme Agent Supply product. It requires an Acme account.

## Installation

```bash
curl -fsSL https://acmeagentsupply.com/install/recall | bash
```

Installs the `recall` command globally at `/usr/local/bin/recall`.

## The Operator Mental Model

```
stall   =  pause the brain, keep the ears open
sleep   =  disconnect
freeze  =  stop spawning only
stun    =  full intervention (heavy)
reset   =  safe gateway restart
```

**`recall stall` is the dominant operator command in real production.**

Most incidents are not catastrophic. They are agents stepping on each other, message storms beginning, config edits mid-flight. You rarely need to kill an agent — you need to pause it.

`recall stall <agent>` stops the agent from acting but keeps it listening. Investigate. Then decide: `recall wake` (minor issue) or `recall stun` (truly broken).

`recall stun` is heavy — it kills sub-agents, archives sessions, compacts memory. Use it when something is genuinely broken, not as a first response.

## Command Reference

### System Commands

```
recall lockdown
```
Activate global lockdown. No new model calls, tool executions, or sub-agent spawning across the entire system. Existing in-progress work drains normally. Use first in a runaway storm.

```
recall unlock
```
Lift global lockdown. System returns to normal operation.

```
recall status
```
Fleet state snapshot — all agents, their states, active locks.

### Agent State Commands

```
recall stall <agent>           Pause execution. Agent keeps receiving messages.
recall stall --all             Emergency brake. Pauses the entire fleet.

recall freeze <agent>          Block sub-agent spawning only. Agent stays active.
recall unfreeze <agent>        Restore sub-agent spawning.

recall sleep <agent>           Disconnect from all channels.
recall sleep <agent> --channel <id>    Disconnect from one channel.
recall sleep --all

recall stun <agent>            Full intervention: disconnect, drain, kill sub-agents,
                               archive session, compact memory.

recall quarantine <agent>      Isolate for inspection. Memory read-only, no execution.

recall wake <agent>            Reverse most recent sleep/stall (or stun after recover).
recall wake --all
```

### Recovery Commands

```
recall recover <agent>
```
Post-stun recovery wizard. Shows memory diff from before the stun, allows quarantine of suspect entries, confirms readiness before reconnect. Operator confirmation required.

```
recall reset
```
Safe gateway restart. Captures a triage bundle, flushes memory, takes a snapshot, runs backup, announces to active sessions, restarts, verifies health.

### Focus Commands

```
recall focus <agent>
```
Single-leader mode. The named agent acts; all others are stalled. Use when agents are stepping on each other — parallel decision-making failures, conflicting memory writes, tool contention, duplicated work.

Output on activation:
```
Fleet Focus Active
primary_agent: hendrik
stalled_agents: heike, gerrit, soren
```

```
recall unfocus
```
Release focus. All stalled agents return to their pre-focus state.

### Observation Commands

```
recall log <agent>
```
Full intervention history for an agent.

## Standard Incident Response

```bash
openclaw watch          # something looks odd
recall stall heike      # pause the agent immediately
radcheck risk           # assess reliability score
triage                  # capture proof bundle
agent911 diagnose       # classify the incident

# If minor:
recall wake heike

# If serious:
recall stun heike
recall recover heike
recall wake heike
```

## Lockdown Workflow (Runaway Storm)

```bash
openclaw watch          # signals runaway tokens / alert storm
recall lockdown         # freeze the whole system first
recall stun heike       # surgical per-agent cleanup
recall stun hendrik     # (if multiple agents involved)
recall status           # confirm all clear
recall unlock           # restore normal operation
recall recover heike    # review, then wake
recall wake heike
```

Lockdown makes surgical intervention safe. Without it, stunning one agent can trigger other agents to investigate — amplifying the storm.

## Reversibility

| Command | Reversal | What is Restored |
|---------|----------|-----------------|
| `lockdown` | `unlock` | Full system execution |
| `freeze` | `unfreeze` | Sub-agent spawning |
| `stall` | `wake` | Processing; queued messages delivered |
| `sleep` | `wake` | Channel connections |
| `stun` | `wake` (after `recover`) | Channels; clean session |
| `quarantine` | `recover` → `wake` | Full active state |
| `reset` | n/a (non-destructive) | Triage bundle + backup exist |

Session context is not restored after stun. If the session caused the problem, restoring it restores the problem. Archived sessions remain available for operator review.

## Integration with the Reliability Stack

`recall` sits in the Acme reliability stack alongside RadCheck, triage, and Agent911:

```
triage      →  what was the system state when it broke?
radcheck    →  what is the current reliability score?
agent911    →  automated: diagnose → plan → execute
recall      →  manual: operator-commanded intervention
```

`recall stun` calls Agent911 primitives directly — same primitives, manual trigger. No divergence between automated and manual recovery paths.

Every `recall` operation emits a control plane event, ingested by Bonfire and visible in `openclaw watch`, RadCheck signals, triage bundles, and Agent911 diagnosis context.
