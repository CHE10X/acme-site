import type { Metadata } from "next";
import styles from "./OperatorsTale.module.css";

export const metadata: Metadata = {
  title: "Operator's Briefing — ACME Agent Supply Co.",
  description:
    "How Chip Ernst built a company on his laptop — and why it became ACME Agent Supply Co.",
};

export default function OperatorsTalePage() {
  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <div className={styles.classification}>
          Operator's Briefing · Field Document
        </div>

        <header className={styles.titleBlock}>
          <div className={styles.docLabel}>by Chip Ernst</div>
          <h1 className={styles.title}>I Built This&hellip;Thing&hellip;With OpenClaw</h1>
        </header>

        <p>I built this...thing...with OpenClaw. And I can imagine there are a lot of people like me out there.</p>

        <p>I know a little about coding. I've worked in tech companies my whole career — the last 10 or 15 years with venture-funded startups selling into the dev space and enterprise markets. I know what it takes to build good software. And I'm the kind of person who likes to know how things actually work. At least well enough to be competent, to be able to defend how these systems are operating, to see it firsthand. I don't like depending on too many technical resources if I can help it. Let's say I'm thrifty.</p>

        <p>So when OpenClaw came out, I recognized it as an inflection point. I thought back to when I was a kid getting my hands on a PC for the first time. And more recently, when ChatGPT launched — that same feeling: this is a pattern change in how we can work and leverage technology. You either get on board and learn it, or it passes you by. And that's the fear, right? If we don't embrace this and master it, maybe our careers won't have the same velocity. Maybe we get displaced. I think about my kids — if they don't learn how to use these tools, their careers will suffer too.</p>

        <p>So with some time on my hands, I saw this as a chance to upskill. To really understand how AI models, modern development platforms, and modern work style fit together — and more importantly, how they'll work once OpenClaw and tools like it are mainstream and stable.</p>

        <p>So I started building.</p>

        <p>Early February, I did my first install. All command line — the GUI was pretty quirky at the time and I wanted to understand what was actually happening underneath. I had ChatGPT as a guide, and very soon after, Claude Code as well. Two AI systems, several dedicated threads in each for different disciplines — context management, organizational focus, the usual reasons.</p>

        <p>But the reason I needed all that structure was simple: I couldn't keep OpenClaw running.</p>

        <p>It kept breaking. A reset here, a channel conflict there, a config mismatch with WhatsApp or whatever I was trying to connect. I tried everything. I might get six hours — sometimes twelve — of great runtime, and then I'd spend three days trying to get back to that point.</p>

        <p>But I'm a technologist. So I thought: let me build something to fix this. And then fix the next thing. And the next. My small solutions kept accumulating, and they were all about the same thing — resilience, stability, hardening the underlying environment so the thing would actually work.</p>

        <p>Step by step, I got there.</p>

        <hr className={styles.rule} />

        <p>So what did I set out to build?</p>

        <p>In the beginning, I honestly wasn't thinking about use cases. That came later. What I was afraid of — and I think this is beautiful in hindsight — was the instability. The unpredictability. The recklessness of early OpenClaw. I was scared to commit a real use case to something that unreliable. So I didn't.</p>

        <p>Coming from enterprise software, knowing the rigors of real dev teams, I wanted my OpenClaw to be predictable first. My initial goal was strictly hardening. But as a proof exercise — a thought exercise — I asked myself: what if I approached this like a learning curve? For my own growth, following the arc of skills I believed would matter in this new era.</p>

        <p>I thought: can I build a company on my laptop?</p>

        <p>What is a company, really? Process. A mission. Organization, discipline, defined roles, clear goals. Can I do that in OpenClaw — and make OpenClaw resilient in the process?</p>

        <p>So every step I took followed a career's worth of best practice. What I'd learned from dev teams. From people management. From building startups. I approached it like a venture-funded company. I built out the teams, resourced them, divided responsibility. I was strict about process, strict about documentation, strict about accountability and feedback loops. Iterative improvements to the foundation — not the fun end-game of use cases, which wasn't plausible yet until I could count on what was underneath.</p>

        <p>And as I did that, I increasingly respected just how powerful this thing was.</p>

        <p>I would find myself just stopping — making statements of awe, sometimes genuine disbelief, about how fast and tireless and capable this team was becoming. What a pleasure to lead this kind of organization. I kept them moving: 14, 16-hour days. Never felt so happy on so little sleep.</p>

        <p>I was building a company of quality. A company of excellence. That was the exercise.</p>

        <p>It wasn't necessarily to launch an actual company — until it became a question of: why not? It's actually a good company. On my laptop. And my agents are excellent. I've seen what they can deliver when you've taught them how to work together, when you've built the structure and the software to govern them as a team.</p>

        <p>And that's where the vision landed.</p>

        <hr className={styles.rule} />

        <p>As I got better at building and polishing these solutions, my ambitions grew. I started to realize this wasn't just tinkering with an AI harness. This is how I think people will work. They'll manage agents — in plural. And that's exactly what I was doing: improving my environment so I could run more agents, reliably.</p>

        <p>As OpenClaw has matured, the issue has shifted. It's no longer just the harness — it's what you can do with your agents. Can you keep them working? Can you keep them disciplined? Healthy? Coordinated?</p>

        <p>And I realized: this is exactly like managing people.</p>

        <p>I've managed people my whole career, and I've been an individual contributor too — different roles, different companies. But one thing is certain: managing AI agents is just like managing people. They have the same quirks, the same limitations. They forget. They drift. They can get unruly or distracted. Coordinating them is a real challenge.</p>

        <p>You might wonder — why not just have one super-agent? Same reason you don't hire one person to run your operations, your development, your marketing, and your accounting. Jack of all trades doesn't work for people, and it doesn't work for agents either. When you manage agents by discipline, you can align them to the right models, the right memory, the right purpose. They perform better. I'm sure a lot of you have figured this out already. It's part of the learning curve, and honestly, it's been a lot of fun.</p>

        <p>So. You've got a stable environment. You've got multiple specialized agents. Now what?</p>

        <p>I'm not a sit-at-my-desk person. I move — between meetings, between cities, sometimes in the car. And OpenClaw is addictive. I don't want to leave my keyboard, but sometimes I have to. So I started asking: how do I keep my three, five, seven agents — now ten — working when I'm not there? How do I keep them coordinating, complementing each other, challenging each other's work, escalating when something needs a human?</p>

        <p>If I'm not present, work stops. That's not sustainable.</p>

        <p>So I started building the operator interface for a multi-agent environment. How do you communicate with a team of agents without burning your entire token budget on a single group meeting? (I tried that. You can laugh. It did not go well.) How do you give agents shared context without constant overhead? How do you help a human operator — driving between meetings — know which agent to talk to, who's working on what, when to step in and when to stand back?</p>

        <p>These aren't solved problems. There's no doctrine for this yet.</p>

        <p>So I've been building it. The resilience layer. The dispatch layer. The coordination layer. The operator interface that ties it all together.</p>

        <hr className={styles.rule} />

        <p>Which brings me to the contradiction I want to address: I keep saying managing agents is like managing people — and then I say it's not quite the same. Both are true.</p>

        <p>The differences are real. But they're bridgeable. And that's become my mission: how do you make it seamless for a human operator? How do you build the tools so that if you're a good people manager, you can be a good Stack Driver?</p>

        <p>I told this to a friend I ran into over St. Patrick's Day weekend — over some beers. He was scared. Worried about his career, about what AI was going to do to his job, his future prospects. I looked at him and said: don't worry about the technology. That'll meet you at your doorstep.</p>

        <p>Sure, today it's a mess. It's fireworks. It blows up, it's a laugh. But it'll get there. And when it does, you won't need to know what a context window is, or what a race condition looks like, or how to configure memory. If you're a good people manager — experienced, know how to lead, keep a team disciplined and on mission — you'll be able to manage agents. Full stop.</p>

        <p>That's the talent pool waiting to be unlocked. People who know how to lead, who've spent careers learning how to get the best out of a team. They'll be great at this. If we can bring the tools to the doorstep.</p>

        <p>Because when this all works — and it will, in the next phase of how we work and how our kids will work — it won't look like managing OpenClaw. It'll just look like managing a team.</p>

        <p>A team of agents.</p>

        <p>That's the stack I'm driving. That's what I'm building.</p>

        <blockquote className={styles.quote}>
          <p>Curious what you&apos;re doing.</p>
        </blockquote>

        <footer className={styles.pageFooter}>
          <div className={styles.footerBrand}>
            Chip Ernst · Founder, Acme Agent Supply Co.
          </div>
          <div className={styles.footerSerial}>Building reliability infrastructure for multi-agent operators.</div>
        </footer>

      </main>
    </div>
  );
}
