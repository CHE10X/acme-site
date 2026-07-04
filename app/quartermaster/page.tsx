import type { Metadata } from "next";
import Link from "next/link";
import ProofPlate from "../components/ProofPlate";

export const metadata: Metadata = {
  title: "QuarterMaster — Council10",
  description:
    "QuarterMaster gives operators bounded, governable work with clear ownership, proof-backed closure, and intervention only when it actually matters.",
};

const CAPABILITIES = [
  {
    number: "01",
    heading: "Turn intent into structured work.",
    detail:
      "QuarterMaster takes operator intent and turns it into assignable, trackable work with clear owners, expected outcomes, and return paths.",
  },
  {
    number: "02",
    heading: "Keep ownership explicit through every handoff.",
    detail:
      "Work moves through agents, people, and systems. QuarterMaster keeps responsibility visible as work changes hands so it does not disappear into idle queues or ambiguous ownership.",
  },
  {
    number: "03",
    heading: "Reconcile progress, proof, and state.",
    detail:
      "Claimed progress, observed state, attached proof, and actual outcomes stay aligned. When they drift apart, trust disappears fast.",
  },
  {
    number: "04",
    heading: "Resolve collisions and blocked lanes.",
    detail:
      "Priority conflicts, duplicate effort, contradictory outputs, and stalled work are surfaced early so the right operator can intervene with context.",
  },
  {
    number: "05",
    heading: "Close with proof-backed outcomes.",
    detail:
      "Work is not done because it stopped moving. It is done when ownership, authority, proof, and outcome line up.",
  },
];

const AUDIT_QUESTIONS = [
  "What is actually in motion?",
  "Who owns it?",
  "What changed?",
  "What produced value?",
  "What failed?",
  "What is truly complete?",
];

const RECONCILIATION_EXAMPLES = [
  {
    title: "What reconciliation looks like in a real function",
    body:
      "In a legal team, reconciliation is the difference between work being completed and work being accepted. A contract change can return from review with notes, attachments, and a proposed resolution, but it does not close until the right reviewer has accepted the outcome. QuarterMaster keeps ownership, proof, decision, and outcome aligned so the matter does not look finished before it is actually closed.",
  },
  {
    title: "What reconciliation looks like in a coding-agent session",
    body:
      "In a development team running coding agents, reconciliation is the difference between output that was produced and output that was actually reviewed. An agent can mark work complete, but if the claimed changes do not match the observed state of the codebase, or the evidence of what ran is missing, the operator has no basis for trust. QuarterMaster keeps claimed progress, observed state, attached proof, and human review aligned before the work moves forward.",
  },
];

export default function QuarterMasterPage() {
  const earlyCapabilities = CAPABILITIES.slice(0, 2);
  const laterCapabilities = CAPABILITIES.slice(3);
  const reconciliationCapability = CAPABILITIES[2];

  return (
    <main className="bg-[#f7f8f5] text-[#181c22]">
      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="max-w-[13ch] font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.94] tracking-[-0.05em] text-[#181c22]">
                QuarterMaster is how operators run agent work like a real operation.
              </h1>
            </div>
            <div className="border-l border-[rgba(24,28,34,0.12)] pl-0 lg:pl-8">
              <div className="grid gap-3 border-b border-[rgba(24,28,34,0.12)] pb-4 text-[10px] uppercase tracking-[0.14em] text-[#6f7785] sm:grid-cols-3">
                <div>
                  <div>Subject</div>
                  <div className="mt-1 text-[#181c22]">QuarterMaster</div>
                </div>
                <div>
                  <div>Classification</div>
                  <div className="mt-1 text-[#181c22]">Operator</div>
                </div>
                <div>
                  <div>Status</div>
                  <div className="mt-1 text-[#181c22]">Available</div>
                </div>
              </div>
              <p className="max-w-[34rem] text-[1.07rem] font-light leading-8 text-[#495462]">
                Running agent work should not mean supervising every thread, answering every
                permission request, and checking results before your morning coffee.
                QuarterMaster gives operators bounded, governable work with clear ownership,
                proof-backed closure, and intervention only when it actually matters.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-[4px] bg-[#181c22] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#f7f8f5] transition hover:bg-[#262c35]"
                >
                  Talk to us about QuarterMaster
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center rounded-[4px] border border-[rgba(24,28,34,0.14)] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#181c22] transition hover:border-[rgba(24,28,34,0.28)]"
                >
                  See how it works
                </a>
              </div>
            </div>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="border-t border-[rgba(24,28,34,0.12)] pt-6">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[#6f7785]">
                Operating model
              </div>
              <p className="mt-4 max-w-[31rem] text-[1rem] leading-7 text-[#495462]">
                Most agent systems can generate activity. Too many of them also create a new
                supervision job around that activity. Agents that require constant supervision
                are overhead, not leverage.
              </p>
            </div>
            <ProofPlate
              caption="Fig. 02"
              title="Tower"
              treatment="[LOOP] 16:10"
              ratio="16 / 10"
              imageSrc="/images/Tower.png"
              imageAlt="QuarterMaster Tower overview with scoped mission visibility"
              notes={[
                "Scoped mission view already open",
                "Driving Now populated",
                "At Risk visible without noise",
                "Real-surface-first placeholder",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#6f7785]">
              Capability spine
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
              {earlyCapabilities.map((capability) => (
                <article
                  key={capability.number}
                  className="border-t border-[rgba(24,28,34,0.12)] pt-5"
                >
                  <div className="mb-3 text-[10px] uppercase tracking-[0.14em] text-[#6f7785]">
                    Capability {capability.number}
                  </div>
                  <h2 className="max-w-[18ch] font-serif text-[2rem] leading-[1.01] tracking-[-0.035em] text-[#181c22]">
                    {capability.heading}
                  </h2>
                  <p className="mt-4 max-w-[33rem] text-[1rem] leading-7 text-[#495462]">
                    {capability.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <div className="mb-3 text-[10px] uppercase tracking-[0.14em] text-[#6f7785]">
                Capability {reconciliationCapability.number}
              </div>
              <h2 className="max-w-[16ch] font-serif text-[clamp(2.2rem,4vw,3rem)] leading-[0.99] tracking-[-0.045em] text-[#181c22]">
                {reconciliationCapability.heading}
              </h2>
              <p className="mt-5 max-w-[35rem] text-[1rem] leading-7 text-[#495462]">
                {reconciliationCapability.detail}
              </p>
            </div>
            <div className="space-y-10">
              <ProofPlate
                caption="Fig. 03"
                title="Register"
                treatment="[SLOW-PAN] 4:5"
                ratio="4 / 5"
                imageSrc="/images/Register.png"
                imageAlt="QuarterMaster Register view showing governed record and review state"
                notes={[
                  "Mission: Release Compatibility Control",
                  "Evidence required before review",
                  "Closure requires owner return and reviewer acceptance",
                  "Designed prototype source",
                ]}
              />
              <aside className="border-l-2 border-[#1b7f95] pl-6">
                <div className="font-serif text-[clamp(2rem,3.5vw,3rem)] italic leading-[1.12] tracking-[-0.03em] text-[#1b7f95]">
                  Reconciliation keeps the queue truthful.
                </div>
                <p className="mt-4 max-w-[28rem] text-[0.98rem] leading-7 text-[#495462]">
                  QuarterMaster gives teams a shared operational truth instead of a pile of
                  activity that still needs interpretation.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:px-16 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
                What reconciliation looks like in practice
              </div>
            </div>
            <div className="grid gap-6">
              {RECONCILIATION_EXAMPLES.map((example) => (
                <article
                  key={example.title}
                  className="border-t border-[rgba(24,28,34,0.08)] pt-4"
                >
                  <h3 className="max-w-[24ch] font-serif text-[1.45rem] leading-[1.08] tracking-[-0.03em] text-[#181c22]">
                    {example.title}
                  </h3>
                  <p className="mt-3 max-w-[42rem] text-[0.98rem] leading-7 text-[#495462]">
                    {example.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            {laterCapabilities.map((capability) => (
              <article
                key={capability.number}
                className="border-t border-[rgba(24,28,34,0.12)] pt-5"
              >
                <div className="mb-3 text-[10px] uppercase tracking-[0.14em] text-[#6f7785]">
                  Capability {capability.number}
                </div>
                <h2 className="max-w-[18ch] font-serif text-[2rem] leading-[1.01] tracking-[-0.035em] text-[#181c22]">
                  {capability.heading}
                </h2>
                <p className="mt-4 max-w-[33rem] text-[1rem] leading-7 text-[#495462]">
                  {capability.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16">
          <div className="max-w-[46rem]">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#6f7785]">
              Environment fit
            </div>
            <p className="mt-4 text-[1rem] leading-7 text-[#495462]">
              QuarterMaster began with OpenClaw agents and now extends into ambient Claude
              Code support, with more environments coming.
            </p>
            <div className="mt-6 text-[12px] font-light uppercase tracking-[0.14em] text-[#6f7785]">
              OpenClaw · Claude Code · Multi-environment control
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#6f7785]">
                Final audit
              </div>
              <h2 className="mt-4 max-w-[15ch] font-serif text-[clamp(2rem,4vw,3rem)] leading-[0.99] tracking-[-0.045em] text-[#181c22]">
                Agent operations break down when no one can answer the basic questions.
              </h2>
            </div>
            <ol className="border-t border-[rgba(24,28,34,0.12)]">
              {AUDIT_QUESTIONS.map((question, index) => (
                <li
                  key={`${question}-closing`}
                  className="flex gap-5 border-b border-[rgba(24,28,34,0.12)] py-4 text-[1rem] leading-7 text-[#181c22]"
                >
                  <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#6f7785]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center sm:px-10 lg:px-16 lg:py-28">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#6f7785]">
            Closing
          </div>
          <div className="mx-auto mt-6 max-w-[15ch] font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.05em] text-[#181c22]">
            QuarterMaster is not another activity dashboard.
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-[4px] bg-[#181c22] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#f7f8f5] transition hover:bg-[#262c35]"
            >
              Talk to us about QuarterMaster
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-[4px] border border-[rgba(24,28,34,0.14)] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#181c22] transition hover:border-[rgba(24,28,34,0.28)]"
            >
              Back to Council10
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
