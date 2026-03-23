---
title: "Span of Control"
date: "2026-03-25"
author: "Chip Ernst"
excerpt: "The management paradigm for an age of agent teams."
---

There's a new performance metric spreading through Silicon Valley, and it's exactly as absurd as it sounds: how many tokens did you burn this week?

Kevin Roose at the New York Times calls it "tokenmaxxing." Meta and OpenAI apparently have internal leaderboards - engineers competing on AI consumption. One OpenAI engineer burned through 210 billion tokens in a single stretch. Volume of AI used has reportedly become an actual input into performance reviews at some of these shops. Use more, get rewarded. Use less, get chastened.

Jensen Huang more or less blessed this instinct on the All-In Podcast last week. He said if an engineer making $500,000 didn't spend at least $250,000 in tokens by year end, he'd be deeply alarmed. Tokens as leverage, not cost. Under-utilization as the sin. Every engineer will eventually have 100 agents working for them.

I don't think Jensen's wrong. I think he's answering a different question than the one that actually matters to most people building right now.

Because let's be clear about who tokenmaxxing actually describes. Meta, OpenAI, Nvidia - a handful of companies where spending $250k per engineer on AI actually pencils out. Maybe five, maybe ten organizations on the planet. Everyone else is watching. They want the leverage. They're not going to get there by out-spending FAANG. They're not going to try.

Jensen is thinking about this from the compute side. The question he's answering is how much can the machine produce. That's exactly the right question for Nvidia. It's not the right question for the operator trying to run an effective agent team on a real budget.

The real question is: how well can you lead this?

---

The constraint was never compute. It's span of control.

Decades of management research, military science, and organizational psychology have already worked this out. Span of control is the number of direct reports a manager can effectively oversee before something starts slipping - before the overhead of managing exceeds the value produced. The ceiling is consistent: twelve is generous, seven to nine is where most strong managers actually peak. Push past that and quality degrades, things fall through the cracks, the manager becomes the bottleneck.

This isn't soft stuff. Managing takes real time and real attention. Good managers don't just assign and wait - they're keeping things moving, catching drift before it compounds, reviewing decisions at the right level of detail. That budget is finite. It doesn't scale linearly.

I spent ten years at GE and went through their management training program. This wasn't theory I picked up from a business book — it was the operating system I worked inside. GE built entire management philosophies around this. Every functional organization that actually scaled did so not by expanding the manager's span, but by building structure underneath: hierarchy, delegation, clear accountability at each level. You don't manage 100 people. You manage seven people who each manage seven people. That's how you get to 100 without losing your mind.

Applied to agent teams, this isn't a limitation. It's the design. You don't run 100 agents flat. You run a structured org: a chief of staff managing a cluster of specialists, each with their own focused sub-agents. You stay at the top, steering your direct reports. The hierarchy does what hierarchies have always done - multiplies effective capacity without multiplying cognitive load.

---

Here's where the analogy breaks in an interesting way.

In human organizations, hierarchy creates opacity. You trust your direct reports to manage their teams well. You lose visibility two levels down. You're flying blind - dependent on filtered reports and whatever happens to escalate up. You're betting on the manager, not seeing the work.

With agents, you don't have to accept that trade-off. The data is there. Task wait times, gate frequencies, whether sub-agents are moving or blocked - all of it is observable if you build the right instrumentation on top. You can see not just what your direct reports deliver, but how they delegate.

That capability doesn't exist in human management. A manager who micromanages their sub-agents - blocking them on every small decision, keeping them waiting - you can surface that. An agent running sub-agents blind, letting drift compound silently - you can surface that too. The signal isn't just output. It's delegation quality.

Imagine expanding a chief-of-staff node and seeing their sub-agents listed - a flow indicator per agent, a delegation health score at the parent level: green, amber, red. The data underneath isn't complicated: task wait time, gate frequency, block rate, completion ratio. You're not watching every sub-agent task. You're getting the confidence signal that tells you whether the layer below is running the way it should.

That's a coaching surface human management almost never has. "Your sub-agents are spending 40% of their time waiting on your review - loosen the gate." That conversation only happens when you can see delegation health, not just output.

---

So what does running 100 agents actually look like?

Not a flat team with a leaderboard. I run a 12-agent team through 7 direct reports right now. Not hypothetically — today. Seven direct reports, each managing up to fourteen sub-agents, with visibility and coaching at every delegation layer. Achievable at any budget level - because the limiting factor was never tokens. It was always structure.

This is good news for the 95% who aren't at Meta or OpenAI. You don't need a $250k token budget. You need a better org chart. A clear hierarchy. A way to see whether the layer below you is moving in the right direction.

The engineer who wins in an agentic world isn't the one burning the most tokens. It's the one who delegates well, catches drift early, and knows when to tighten the gate and when to trust the structure below.

Tokenmaxxing measures how much you spent. Span of control is about how well you led.
