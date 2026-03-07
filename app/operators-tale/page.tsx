import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import styles from "./OperatorsTale.module.css";

export const metadata: Metadata = {
  title: "Operator's Tale — ACME Agent Supply Co.",
  description:
    "How this reliability stack was built and why it stays operator-safe.",
};

const STACK_ITEMS = [
  {
    name: "RadCheck",
    desc: "Surfaces early instability signals before the system stalls.",
  },
  {
    name: "OCTriageUnit",
    desc: "Creates a read-only proof bundle for first-response triage.",
  },
  {
    name: "Sentinel",
    desc: "Continuous detection for silent failures and drift signals that don't make it to the operator surface.",
  },
  {
    name: "SphinxGate",
    desc: "Token discipline and lane enforcement so background work can't quietly consume foreground budget.",
  },
  {
    name: "Drift Guard",
    desc: "Baseline comparison and drift analysis when predictability starts eroding over time.",
  },
  {
    name: "Lazarus",
    desc: "Recovery readiness verification so \"we can restore\" isn't a guess.",
  },
  {
    name: "Watchdog",
    desc: "Heartbeat supervision when liveness signals exist but the system isn't truly alive.",
  },
];

const FIELD_NOTES = [
  "Capture evidence before recovery - proof beats memory.",
  "Deterministic bundles beat screenshots - structure survives postmortems.",
  "Systems drift before they fail - drift is the early signal.",
  "Operators need clarity, not dashboards - fewer panels, more answers.",
  "Heartbeats lie - port up does not mean healthy.",
  "Recovery readiness degrades silently - verify it before you need it.",
];

export default function OperatorsTalePage() {
  const octriageDocsPath = path.join(
    process.cwd(),
    "content",
    "docs",
    "octriage",
    "overview.md",
  );
  const nextHref = fs.existsSync(octriageDocsPath)
    ? "/docs/octriage/overview"
    : "/docs";

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <div className={styles.classification}>
          Field Document · Operator Origin Record
        </div>

        <header className={styles.titleBlock}>
          <div className={styles.docLabel}>About This Stack</div>
          <h1 className={styles.title}>An Operator&apos;s Tale</h1>
          <p className={styles.subtitle}>
            How this reliability stack was built - and why it stays
            operator-safe.
          </p>
        </header>

        <p>Most reliability failures don&apos;t start with alarms.</p>
        <p>
          They start with doubt: something feels off, but nothing is clearly
          broken.
        </p>
        <p>
          In agent systems, &quot;port up&quot; and &quot;process alive&quot; often mean very
          little. Throughput can collapse while everything still looks green.
          State can drift without producing obvious errors. Compaction pressure
          can rise silently until the system feels haunted.
        </p>
        <p>The first job of an operator isn&apos;t recovery. It&apos;s evidence.</p>

        <hr className={styles.rule} />

        <section>
          <div className={styles.sectionLabel}>
            Field Log · Entry 001 - The Problem
          </div>
          <p>
            Small systems fail quietly. Before dashboards. Before alerts. Before
            anyone is sure what they&apos;re looking at.
          </p>
          <p>
            When that happens, the first question isn&apos;t &quot;how do I fix
            it?&quot; It&apos;s &quot;what is actually true right now?&quot;
          </p>
          <p>
            Operators need a calm first move that is safe under stress and
            useful even when the control plane is degraded.
          </p>
        </section>

        <hr className={styles.rule} />

        <section>
          <div className={styles.sectionLabel}>
            Field Log · Entry 002 - The Early Failure Patterns
          </div>
          <p>
            This stack grew out of real, persistent agent workloads - not demos,
            not sandboxes - systems that had to remain coherent across days and
            weeks.
          </p>
          <p>
            The failures were rarely dramatic. That was the danger.
          </p>
          <p>
            Agents would stall mid-run. Gateways would report healthy while the
            system quietly froze underneath. Watchdog loops would confirm
            liveness while actual work had stopped.
          </p>
          <p>
            The logs looked normal. The port was open. The process was
            &quot;fine.&quot;
          </p>
          <p>The system was lying.</p>
        </section>

        <hr className={styles.rule} />

        <section>
          <div className={styles.sectionLabel}>
            Field Log · Entry 003 - First Response Doctrine
          </div>
          <p>
            Out of those failures came a doctrine we now treat as
            non-negotiable:
          </p>

          <blockquote className={styles.quote}>
            <p>
              Never recover first. Capture evidence first. Recovery without
              proof is just hoping the problem doesn&apos;t come back.
            </p>
          </blockquote>

          <p>
            OpenClaw Triage Unit exists to make that doctrine easy. It produces a
            deterministic, timestamped proof bundle before anyone starts
            changing things. No screenshot archaeology. No ad-hoc log grepping.
            A structured artifact that survives the postmortem.
          </p>
          <p>Evidence first. Recovery second.</p>
        </section>

        <hr className={styles.rule} />

        <section>
          <div className={styles.sectionLabel}>
            Field Log · Entry 004 - How the Stack Emerged
          </div>
          <p>
            Each tool was built the same way: a failure pattern became visible,
            got named, and then got a purpose-built response.
          </p>
          <p>There was no roadmap. There was forensics.</p>

          <div className={styles.stackList}>
            {STACK_ITEMS.map((item) => (
              <article key={item.name} className={styles.stackItem}>
                <h3 className={styles.stackItemName}>{item.name}</h3>
                <p className={styles.stackItemDesc}>{item.desc}</p>
              </article>
            ))}
          </div>

          <p>
            The sequence matters. Detect → observe → control → prove → recover.
            That order is not marketing. It is what operators actually need at
            2am.
          </p>
        </section>

        <hr className={styles.rule} />

        <section>
          <div className={styles.sectionLabel}>
            Field Log · Entry 005 - Why ACME Exists
          </div>
          <p>
            These tools were built to survive our own systems first - to make
            failures explainable and recoveries repeatable.
          </p>
          <p>
            If you&apos;ve operated agent systems long enough, you already know the
            feeling this stack is for.
          </p>
          <p>
            If you haven&apos;t yet - this is the set of tools we wished existed
            before the first long night.
          </p>
        </section>

        <section className={styles.fieldNotes}>
          <div className={styles.fieldNotesHeader}>Field Notes</div>
          <ul>
            {FIELD_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <footer className={styles.pageFooter}>
          <div className={styles.footerBrand}>
            ACME Agent Supply Co. · Field Supply Division
          </div>
          <div className={styles.footerSerial}>DOC-OPS-TALE-001</div>
        </footer>

        <p className={styles.nextLine}>
          Next: <Link href={nextHref}>Start with OpenClaw Triage Unit</Link> to
          capture evidence before recovery.
        </p>
      </main>
    </div>
  );
}
