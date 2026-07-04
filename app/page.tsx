import Link from "next/link";
import ProofPlate from "./components/ProofPlate";
import RecognitionGrid from "./components/RecognitionGrid";

const PROOF_POINTS = [
  "See what agent work is actually producing.",
  "Catch waste before it compounds.",
  "Answer leadership with evidence, not guesswork.",
];

const RECOGNITION_BLOCKS = [
  {
    title: "RevOps",
    body:
      "Deal desk approvals, forecast reviews, and territory decisions should move with context attached, ownership clear, and no guessing about what is waiting on whom.",
  },
  {
    title: "Legal",
    body:
      "Contract review, policy exceptions, and cross-team approvals need governed handoffs, attached evidence, and closure that means the work was accepted, not just marked done.",
  },
  {
    title: "Engineering / Operations",
    body:
      "Runtime changes, production hardening, and incident follow-up require ownership you can see, progress you can trust, and intervention only when the work truly needs a human decision.",
  },
  {
    title: "Development / Coding Agents",
    body:
      "Coding agents run across open-ended sessions and produce real changes with real consequences. QuarterMaster gives teams a shared view of what ran, what it produced, where it drifted, and what needs a human decision before it goes further.",
  },
];

export default function Home() {
  return (
    <main className="bg-[#f7f8f5] text-[#181c22]">
      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[#6f7785]">
                Council10 makes AI initiatives answer for themselves.
              </div>
              <h1 className="max-w-[10ch] font-serif text-[clamp(3rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-[#181c22]">
                Your AI initiative is running. Is it working?
              </h1>
              <p className="mt-8 max-w-[33rem] text-[1.08rem] font-light leading-8 text-[#495462]">
                QuarterMaster gives teams the visibility, accountability, and control to turn
                agent work into reliable results across OpenClaw, Claude Code, and the next
                wave of agent environments.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-[4px] bg-[#181c22] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#f7f8f5] transition hover:bg-[#262c35]"
                >
                  Talk to us about your AI initiative
                </Link>
                <Link
                  href="/quartermaster"
                  className="inline-flex items-center rounded-[4px] border border-[rgba(24,28,34,0.14)] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#181c22] transition hover:border-[rgba(24,28,34,0.28)]"
                >
                  Explore QuarterMaster
                </Link>
              </div>
            </div>
            <ProofPlate
              caption="Fig. 01"
              title="Command"
              treatment="[LOOP] 16:9"
              ratio="16 / 9"
              imageSrc="/images/Command.png"
              imageAlt="QuarterMaster Command surface showing release gate and decision flow"
              notes={[
                "Calm queue already populated",
                "One item blocked on approval",
                "Evidence attached before the decision",
                "One decision clears the lane",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.98fr_0.82fr] lg:items-start">
            <div>
              <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
                Recognition
              </div>
              <p className="text-[1.05rem] leading-8 text-[#495462]">
                Your agents are running. Costs are real. Leadership is paying attention. But
                when someone asks what the initiative actually produced, the honest answer is
                still vague.
              </p>
              <p className="mt-6 text-[1.05rem] leading-8 text-[#495462]">
                Some of the work is useful. Some of it stalls. Some of it creates cleanup you
                only see later. The problem is not a lack of activity. The problem is the gap
                between activity and results.
              </p>
              <div className="mt-10 border-l-2 border-[#1b7f95] pl-6">
                <div className="max-w-[46rem] font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.03] tracking-[-0.04em] text-[#181c22]">
                  A team can watch agents run all week and still be unable to say which work
                  moved the initiative forward and which work created drag.
                </div>
              </div>
              <p className="mt-8 text-[1.05rem] leading-8 text-[#495462]">
                QuarterMaster closes that gap.
              </p>
            </div>
            <RecognitionGrid />
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:px-16 lg:py-18">
          <div className="max-w-[42rem]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
              The real problem
            </div>
            <p className="mt-4 text-[1.08rem] leading-8 text-[#495462]">
              A well-prompted agent can produce impressive output in a single run.
              Reproduce it tomorrow, with slightly different context, and the results
              change.
            </p>
            <p className="mt-6 text-[1.08rem] leading-8 text-[#495462]">
              This is not a model problem. It is a process problem. Durable work does
              not come from dumping intent into a system and hoping consistency falls
              out. It comes from breaking work into governed stages, challenging each
              step, and closing only when the outcome is real.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="space-y-10">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785] lg:col-span-3">
                Proof
              </div>
              {PROOF_POINTS.map((point, index) => (
                <div key={point} className="border-t border-[rgba(24,28,34,0.12)] pt-4">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#6f7785]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 max-w-[18ch] font-serif text-[1.8rem] leading-[1.08] tracking-[-0.03em] text-[#181c22]">
                    {point}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
                Fig. 02 · Tower · Surface orientation
              </div>
              <div className="mt-4">
                <ProofPlate
                  caption="Fig. 02"
                  title="Tower"
                  treatment="[STATIC] 16:10"
                  ratio="16 / 10"
                  showCaption={false}
                  imageSrc="/images/Tower.png"
                  imageAlt="QuarterMaster Tower overview showing agent workstreams and risk states"
                  notes={[
                    "Scoped mission view already open",
                    "Driving Now visible",
                    "At Risk visible without chaos",
                    "Stay oriented without babysitting",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
                Where QM shows up
              </div>
              <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.05] tracking-[-0.03em] text-[#181c22]">
                The work looks different. The problem doesn&apos;t.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {RECOGNITION_BLOCKS.map((block) => (
                <article
                  key={block.title}
                  className="border-t border-[rgba(24,28,34,0.12)] pt-4"
                >
                  <h3 className="max-w-[18ch] font-serif text-[1.55rem] leading-[1.04] tracking-[-0.03em] text-[#181c22]">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[#495462]">
                    {block.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(24,28,34,0.12)]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="max-w-[46rem]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
              Environment
            </div>
            <p className="mt-4 text-[1rem] leading-7 text-[#495462]">
              QuarterMaster supports OpenClaw agents, ambient Claude Code workflows, and
              the next wave of agent environments already arriving.
            </p>
            <div className="mt-6 text-[12px] font-light uppercase tracking-[0.14em] text-[#6f7785]">
              OpenClaw · Claude Code · Next-wave environments
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-24 text-center sm:px-10 lg:px-16 lg:py-28">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#6f7785]">
            Outcome
          </div>
          <div className="mx-auto mt-6 max-w-[13ch] font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.055em] text-[#181c22]">
            Not more activity. Real operational results.
          </div>
          <p className="mx-auto mt-8 max-w-[35rem] text-[1rem] leading-7 text-[#495462]">
            If your AI initiative is producing activity but not enough clarity,
            QuarterMaster is built for that moment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-[4px] bg-[#181c22] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#f7f8f5] transition hover:bg-[#262c35]"
            >
              Talk to us about your AI initiative
            </Link>
            <Link
              href="/quartermaster"
              className="inline-flex items-center rounded-[4px] border border-[rgba(24,28,34,0.14)] px-5 py-3 text-[13px] uppercase tracking-[0.12em] text-[#181c22] transition hover:border-[rgba(24,28,34,0.28)]"
            >
              Explore QuarterMaster
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
