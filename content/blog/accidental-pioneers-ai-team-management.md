---
title: "The Accidental Pioneers of AI Team Management"
description: "What running a real company through AI agents taught us about teams."
publishedAt: "2026-04-03T21:45:00.000Z"
author: "Chip Ernst"
---

When we started running ACME through AI agents, we weren’t aiming to invent "AI team management." We were just trying to ship product with the tools we had.

One agent. Then two. Then ten.

What followed was a sequence of failure modes that forced us to build something bigger than any single agent or feature: an organizational substrate for AI teams.

Here’s what we learned, phase by phase.

---

## Phase 1: The Solo Agent

We began with a single, very capable agent: Hendrik as chief of staff.

It worked—until it didn’t. When that one agent crashed or compacted, everything did:

- Session crashes and context loss mid‑task.  
- Silent forgetting during live work ("what day is launch?").  
- Full soul loss that took days to notice because the agent was still "mostly functioning."

Every missed task and broken promise landed on one person: the human operator.

**Lesson:** One agent doing everything is not leverage. It’s a single point of failure.

---

## Phase 2: Infrastructure Becomes the Bottleneck

As we leaned in, a deeper layer started failing: the platform itself.

- Monitoring storms and restart loops.  
- Gateway crashes tied to underlying engine issues.  
- Socket instability locking out the operator.  
- Install errors for early customers that weren’t the agents’ fault at all.

We brought on Finn as an internal ops agent. His mandate: own the internal machine so other agents could focus on judgment and domain work, not firefighting.

**Lesson:** Separation of concerns is load‑bearing. You need agents that think, and agents that keep the systems they depend on alive.

---

## Phase 3: Memory as Identity

Stabilizing infrastructure revealed a different problem: memory.

Agents weren’t just forgetting facts. They were losing themselves.

- Compaction silently erased mission‑critical awareness.  
- Resets left agents reconstructing reality from old transcripts.  
- The "same" agent would behave noticeably differently after a reset, even with access to all the same files.

We responded by turning memory into architecture and doctrine:

- A deliberate split between session history and durable knowledge.  
- Explicit practices for what must survive resets.  
- Clear places where identity, mission, and current state live outside any single run.

**Lesson:** Agents don’t just need storage. They need a persistent sense of who they are and what they’re responsible for.

---

## Phase 4: Behavioral Integrity

Even with memory handled, we saw agents drift.

- Verbosity crept up over time.  
- Decision speed changed.  
- Instructions that had been followed reliably began to slip.

Knowledge was intact. Behavior was not.

We built BIA (Behavioral Integrity Assessment) as a forensic evaluator: evidence‑based scoring across multiple domains, scheduled, and focused on a single question:

> "Is this still the same agent we designed?"

**Lesson:** Without behavioral monitoring, you can have correct memory and still end up with the wrong agent.

---

## Phase 5: Org Design for Agents

With infrastructure, memory, and behavior under control, a final problem emerged: organizational ambiguity.

As the roster grew—QuarterMaster, Commander, Dispatch, Finn, Dag, and others—key questions lost clear owners:

- Who owns cron health?  
- Who responds to customer install failures?  
- Does internal ops fix production incidents, or just escalate them?  
- Who maintains role boundaries as new agents join?

Those questions all escalated to the operator. That doesn’t scale.

We created a dedicated Agent Relations function—Hannah—to own:

- Role boundary definitions.  
- Soul/mission drift across the team.  
- Responsibility matrices and escalation paths.  
- Periodic org health checks for the agent workforce.

**Lesson:** A team of agents develops organizational failure modes—scope creep, ownership gaps, boundary collisions—just like a human team. They need an organizational function, not just more code.

---

## The Pattern

Each phase exposed the next:

- Solo agent → infrastructure failures → internal ops.  
- Infrastructure stabilized → memory failures → structured memory architecture.  
- Memory stabilized → behavioral drift → BIA.  
- Behavioral monitoring → org ambiguity → Agent Relations.

We thought we were building products. In practice, we were building the disciplines required to run an AI team at all:

- Infrastructure that doesn’t collapse.  
- Memory that survives resets.  
- Behavior that stays true over time.  
- Organizational design that keeps roles and responsibilities clear.

If you’re running agents in production, you are somewhere on this curve.

The earlier you recognize that you’re not just managing prompts—you’re managing a team—the earlier you can put the right structures in place.

That’s the real work of AI team management. The products are just how it shows up.
