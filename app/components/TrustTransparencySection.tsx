/**
 * TrustTransparencySection.tsx
 *
 * t14 — "Trust & Transparency" section for the Acme site.
 * Minimal, factual, scannable. For the skeptical technical buyer.
 * NOT a marketing section — a policy signal with teeth.
 * Design: Heike | PROJ-2026-013
 *
 * Usage: drop into any Acme page below product CTAs.
 * Soren owns copy (t13); this component uses placeholder copy until t13 ships.
 * Wire Soren's final copy here when t13 is complete.
 */

const ITEMS = [
  {
    label: "What the wizard touches",
    body: "QM setup creates INBOX.md for each named agent, injects pulse crons, and seeds your first mission manifest. That's it. No gateway config. No secrets. No network calls during setup.",
    tag: "Scope",
  },
  {
    label: "Our scope boundary policy",
    body: "QM investigates autonomously. It acts only when you authorize it. Gateway config, cron scheduling outside its own pulse, and secrets are always escalated to the operator — QM never reaches those on its own.",
    tag: "Authorization",
  },
  {
    label: "Attribution standard",
    body: "Every block QM injects into your files includes a comment with the source, what it does, the docs URL, and how to remove it. You will never find an unexplained edit.",
    tag: "Transparency",
  },
  {
    label: "Clean removal",
    body: "Uninstalling is documented as a first-class step, not an afterthought. Every QM-managed file is labeled so removal is exact, not approximate.",
    tag: "Reversibility",
  },
];

export default function TrustTransparencySection() {
  return (
    <section
      aria-label="Trust and Transparency"
      className="border-t border-[#2E3640] bg-[#151C24] py-10"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-7">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#4A5E70]">
            Trust &amp; Transparency
          </div>
          <h2 className="mt-1.5 text-[20px] font-semibold text-[#C8D4DC]">
            Exactly what we will and won&rsquo;t do.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#5A6E7A]">
            We show you the limits because the limits matter. A tool that&rsquo;s
            honest about what it won&rsquo;t touch is easier to trust than one
            that claims to do everything.
          </p>
        </div>

        {/* Item grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="rounded-[6px] border border-[#2E3640] bg-[#1A2028] px-5 py-4"
            >
              {/* Tag pill */}
              <span className="inline-block rounded-[3px] bg-[#1E2E3A] px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-[#4A5E70]">
                {item.tag}
              </span>

              {/* Label */}
              <h3 className="mt-2.5 text-sm font-medium text-[#C8D4DC]">
                {item.label}
              </h3>

              {/* Body */}
              <p className="mt-1.5 text-sm leading-6 text-[#5A6E7A]">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-[#3A4A56]">
          Full scope boundaries documented in the{" "}
          <a
            href="https://docs.acmeagentsupply.com/qm/reference-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A6070] underline underline-offset-2 hover:text-[#8A9BAD]"
          >
            QM Reference Stack
          </a>
          . Questions?{" "}
          <a
            href="/contact"
            className="text-[#4A6070] underline underline-offset-2 hover:text-[#8A9BAD]"
          >
            Contact us.
          </a>
        </p>
      </div>
    </section>
  );
}
