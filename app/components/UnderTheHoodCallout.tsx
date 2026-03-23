/**
 * UnderTheHoodCallout.tsx
 *
 * t12 — "Under the Hood" callout for the QM product page.
 * Shows before a user installs: confident, direct, links to Reference Stack.
 * Design: Heike | PROJ-2026-013
 */

import Link from "next/link";

const REFERENCE_STACK_URL =
  "https://docs.acmeagentsupply.com/qm/reference-stack";

export default function UnderTheHoodCallout() {
  return (
    <section className="rounded-[6px] border border-[#2E3640] bg-[#1E2630] px-6 py-5">
      {/* Eyebrow */}
      <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">
        Under the Hood
      </div>

      {/* Headline */}
      <h2 className="mt-2 text-[18px] font-semibold text-[#E6E6E6]">
        We know you want to understand what this touches before you install it.
      </h2>

      {/* Body */}
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8A9BAD]">
        QM modifies specific files in your workspace — INBOXes, mission
        manifests, BOOT.md — and nothing else. Every change is labeled,
        logged, and reversible. The Reference Stack documents the exact
        pattern, file by file, so you know what you're committing to before
        you commit.
      </p>

      {/* Key facts — three scannable bullets */}
      <ul className="mt-4 space-y-2 text-sm text-[#8A9BAD]">
        {[
          "Workspace files only. Gateway config, secrets, and crons are never touched by QM automatically.",
          "Every injection is attributed with a comment block so you know what changed and why.",
          "Full removal instructions are in the docs. Clean uninstall is a first-class feature.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-[#D98A2B]">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-5 flex items-center gap-4">
        <Link
          href={REFERENCE_STACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#3A4E60] bg-[#151C24] px-4 py-2 text-sm font-medium text-[#E6E6E6] transition-colors hover:border-[#D98A2B] hover:text-[#D98A2B]"
        >
          Read the Reference Stack
          <span className="opacity-60">→</span>
        </Link>
        <span className="text-xs text-[#4A5E70]">
          Exact file structure, schema, and scope boundaries — no abstraction.
        </span>
      </div>
    </section>
  );
}
