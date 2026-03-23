/**
 * QMUnderTheHood — "Under the Hood" callout for QM product page
 * PROJ-2026-013 / t12
 *
 * Design intent: confident, not defensive. Earns trust at a glance.
 * Links to Reference Stack on Mintlify docs.
 * Copy placeholder — Soren writes final copy (t11 precedes this).
 */

import Link from "next/link";

type Bullet = {
  label: string;
  detail: string;
};

const BULLETS: Bullet[] = [
  {
    label: "What QM reads",
    detail:
      "Mission manifest, task JSONs, agent INBOXes. Nothing else. No model configs, no secrets, no gateway settings.",
  },
  {
    label: "What QM writes",
    detail:
      "TEAM_BOARD updates, INBOX nudges, enforcement log entries. Every write carries an attribution block — labeled, timestamped, reversible.",
  },
  {
    label: "What QM will never touch",
    detail:
      "Your gateway configuration, credentials, model assignments, or anything outside the mission manifest scope.",
  },
];

export default function QMUnderTheHood() {
  return (
    <div className="rounded-[6px] border border-[#2E3640] bg-[#1A2028] overflow-hidden">
      {/* Header bar */}
      <div className="border-b border-[#2E3640] bg-[#151C24] px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Icon: subtle eye / scope */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-[#D98A2B]"
          >
            <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M1.5 9C1.5 9 4.5 3.5 9 3.5C13.5 3.5 16.5 9 16.5 9C16.5 9 13.5 14.5 9 14.5C4.5 14.5 1.5 9 1.5 9Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#D98A2B] font-medium">
            Under the Hood
          </span>
        </div>
        <Link
          href="https://docs.acmeagentsupply.com/qm/reference-stack"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#5A7080] hover:text-[#D98A2B] transition whitespace-nowrap"
        >
          Full Reference Stack →
        </Link>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-[13px] text-[#9AA3AD] leading-6 max-w-2xl">
          QM touches specific files in your workspace. Here&apos;s exactly what, and exactly what it won&apos;t.
          Every modification is labeled, logged, and reversible.
        </p>

        {/* Bullet rows */}
        <div className="mt-4 space-y-0 divide-y divide-[#222C38]">
          {BULLETS.map((b) => (
            <div key={b.label} className="grid grid-cols-[160px_1fr] gap-4 py-3">
              <div className="text-[12px] font-medium text-[#C8D4E0] pt-0.5">{b.label}</div>
              <div className="text-[12px] text-[#7A8EA0] leading-5">{b.detail}</div>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-4 pt-4 border-t border-[#222C38] flex items-center justify-between gap-4">
          <span className="text-[11px] text-[#3A4E60]">
            Scope boundary, attribution standard, and clean removal — documented in full.
          </span>
          <Link
            href="https://docs.acmeagentsupply.com/qm/reference-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 rounded border border-[#3A4048] px-3 py-1.5 text-[11px] text-[#E6E6E6] hover:border-[#D98A2B] hover:text-[#D98A2B] transition"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reference Stack
          </Link>
        </div>
      </div>
    </div>
  );
}
