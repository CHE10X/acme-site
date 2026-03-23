---
title: "The Real Enterprise AI Story Isn't Tokens Spent. It's Tokens Earned."
date: "2026-03-25"
author: "Chip Ernst"
excerpt: "The CTO goes in to talk about AI progress. The CFO pulls up the token invoice. Neither of them has good language for what they're looking at."
---

There's a briefing happening in boardrooms right now that nobody is writing about.

The CTO goes in to talk about AI progress. The CFO pulls up the token invoice. Neither of them has good language for what they're looking at, and the meeting ends badly.

That's the real enterprise AI story of 2026 - not the headline version about $500k engineer token budgets and hundred-agent fleets. The real story is the CTO who has to explain to a room of skeptical executives why the bill keeps growing and the outcomes keep being... approximately the same.

They don't have a good answer yet, because the industry hasn't given them one. The dominant message has been: spend more, build faster, more tokens equal more progress. Jensen Huang said it plainly - an engineer who isn't burning through hundreds of thousands of dollars in tokens is an underperformer. Volume is the signal. Throughput is the metric.

Fine advice if you're Nvidia or OpenAI. Not useful if you're everywhere else.

---

Here's what nobody talks about in the tokenmaxxing conversation: a substantial fraction of enterprise token spend isn't producing anything.

Agents failing silently and retrying. Loops spinning on bad state. Models getting called at premium prices for tasks a much cheaper model handles fine. Agents that have drifted from their intended configuration, quietly hallucinating into production. Infrastructure events triggering cascading reprocessing because nobody detected the drift early enough to stop it.

This isn't edge-case failure. This is the normal operating condition of agent infrastructure that hasn't been built with resilience in mind.

The token bill doesn't distinguish between tokens that produced real work and tokens burned cleaning up after failure. Your CFO sees one number. You know it should be two.

---

The instinct, when facing a large and unexplained token bill, is to cut. Reduce model access. Tighten budgets. Put governors on everything. This is the wrong move. Operators who do it consistently end up with agents that are both expensive and slow.

The right move is to understand where the waste is coming from - and eliminate it at the source.

That's a different capability. It requires observability your stack probably doesn't have yet: visibility into agent health, configuration drift, silent failures, retry storms, and the difference between "this model call was justified" and "this model call happened because something upstream went wrong."

An agent fleet with that instrumentation does something interesting. It gets cheaper and faster at the same time. Not because it's doing less - because it's doing less of the wrong things.

That's what token efficiency actually means. Not "spend less." Active monitoring, active correction, active routing. The agents keep working. The waste stops.

---

So when the CFO asks "why does this cost so much?" - the wrong answer is "because we're using a lot of AI."

The right answer is: "We know exactly what we're spending and why. Here's where the inefficiency used to be. Here's what we did about it. Here's the new baseline."

The second answer requires a different kind of stack. One that knows when an agent is healthy and when it isn't. One that catches failures before they cascade into expensive retry storms. One that routes model calls to the right tier - and can deliberately escalate to full power when the task actually warrants it.

What it doesn't require is spending less. It requires spending smarter.

The operator who walks into that CFO conversation with a token efficiency story - here's what we monitor, here's what we catch, here's what the waste rate used to be, here's what it is now - that operator wins. That's a mature AI operation. That's something a board can understand.

---

One design principle worth naming directly: responsible AI operations don't mean incapable ones.

Sometimes you need to punch through. Sometimes the work actually justifies the full spend. The answer to waste isn't a permanent governor - it's a system where escalation is deliberate. Where opening it up is a conscious choice, not an accident. Where the operator knows exactly what they're doing and why.

That's the difference between an organization that's just running everything at maximum and hoping the invoice makes sense next month, and one that can account for every dollar and still move fast when it matters.

The capability is there when you need it. The waste doesn't happen when you don't.

---

We're not anti-capability. We're anti-waste. These are not the same thing, and the conflation is costing organizations real money and real credibility with their finance teams.

The enterprise pitch for AI shouldn't be "we're spending a lot, which means we're serious." It should be "we know exactly where every token goes, we've eliminated the waste, and when we need to open it up, we do - on purpose."

That's a story a CFO can understand. That's a story a board can fund. And it's a story only the operators who've built for resilience first can actually tell.

The bragging contest is for companies that can afford to lose that argument. Most enterprises can't.

Build smart. Run tight. Know when to open it up.
