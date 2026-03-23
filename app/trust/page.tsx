/**
 * Trust & Transparency — ACME Agent Supply Co.
 * PROJ-2026-013 / t14
 *
 * Design intent: minimal, factual, scannable.
 * Audience: skeptical technical buyer, pre-commitment.
 * Tone: policy page with teeth — not marketing copy.
 * Copy placeholder — Soren writes final copy (t13 precedes this).
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust & Transparency — ACME Agent Supply Co.",
  description:
    "What ACME products touch in your environment, what they don't, and how to remove them. Every change is labeled, logged, and reversible.",
};

type TrustItem = {
  id: string;
  heading: string;
  body: string;
  link?: { label: string; href: string; external?: boolean };
};

const ITEMS: TrustItem[] = [
  {
    id: "01",
    heading: "What the QM wizard modifies — and what it doesn't",
    body:
      "The setup wizard writes to four places: BOOT.md (per agent), INBOX.md (per agent), mission_manifest.json, and one openclaw.json config patch. Nothing else. No model assignments, no gateway config, no secrets. Every section the wizard adds carries an attribution block that identifies it, explains why it's there, links to the docs, and tells you how to remove it.",
    link: {
      label: "Full provisioning manifest",
      href: "https://docs.acmeagentsupply.com/qm/reference-stack#what-the-wizard-touches",
      external: true,
    },
  },
  {
    id: "02",
    heading: "Scope boundary — what QM will never touch",
    body:
      "QM never acquires gateway access. It cannot touch your credentials, secrets, model router config, or agent workspaces outside the INBOX and DONE protocol scope. When a fix requires gateway access, QM escalates to a human instead of acting. That's a design constraint, not a capability gap.",
    link: {
      label: "Remediation playbook",
      href: "https://docs.acmeagentsupply.com/qm/remediation-playbook",
      external: true,
    },
  },
  {
    id: "03",
    heading: "Attribution standard — every change is labeled",
    body:
      "Every section QM writes into your files includes:\n<!-- ACME QM: added by setup wizard -->\n<!-- Required for Quartermaster task tracking to function correctly. -->\n<!-- Reference: https://acmeagentsupply.com/docs/qm/done-protocol -->\n<!-- To remove: delete this section and uninstall QM. -->\nYou open your own files, you see exactly what changed, why it's there, and how to undo it. No unexplained modifications.",
  },
  {
    id: "04",
    heading: "How to remove any ACME product cleanly",
    body:
      "Uninstall is documented, not assumed. For QM: delete the attributed sections in BOOT.md and INBOX.md per agent, revert the openclaw.json config patch, and remove the mission files. Git history shows every change QM made — use it to verify the revert is complete. For other products: each has a documented removal path in the Reference Stack.",
    link: {
      label: "Clean removal guide",
      href: "https://docs.acmeagentsupply.com/qm/reference-stack#clean-removal",
      external: true,
    },
  },
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#1A2028] text-[#E6E6E6]">
      <main className="mx-auto max-w-3xl px-6 py-14">

        {/* Header */}
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#5A7080] mb-3">
            ACME Agent Supply Co.
          </div>
          <h1 className="text-[26px] font-semibold text-[#E6E6E6] tracking-tight">
            Trust &amp; Transparency
          </h1>
          <p className="mt-3 max-w-xl text-[14px] leading-6 text-[#7A8EA0]">
            What our products touch in your environment, what they don&apos;t, and how to remove them.
            This is for the reader who wants to understand before committing — you should.
          </p>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-[#252C38]" />

        {/* Items */}
        <div className="space-y-8">
          {ITEMS.map((item) => (
            <div key={item.id} className="grid grid-cols-[36px_1fr] gap-5">
              {/* Index */}
              <div className="pt-0.5 text-[11px] font-mono text-[#3A4E60]">{item.id}</div>

              {/* Content */}
              <div>
                <h2 className="text-[14px] font-semibold text-[#C8D4E0] leading-snug">
                  {item.heading}
                </h2>
                {item.id === "03" ? (
                  // Code block treatment for attribution example
                  <div className="mt-3 space-y-2">
                    <p className="text-[13px] text-[#7A8EA0] leading-6">
                      Every section QM writes into your files includes:
                    </p>
                    <pre className="overflow-x-auto rounded border border-[#2A3240] bg-[#151C24] px-4 py-3 text-[11px] text-[#5A9A70] font-mono leading-5 whitespace-pre-wrap">
{`<!-- ACME QM: added by setup wizard -->
<!-- Required for Quartermaster task tracking to function correctly. -->
<!-- Reference: https://acmeagentsupply.com/docs/qm/done-protocol -->
<!-- To remove: delete this section and uninstall QM. -->`}
                    </pre>
                    <p className="text-[13px] text-[#7A8EA0] leading-6">
                      You open your own files, you see exactly what changed, why it&apos;s there, and how to undo it. No unexplained modifications.
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-[13px] text-[#7A8EA0] leading-6">{item.body}</p>
                )}
                {item.link && (
                  <div className="mt-3">
                    {item.link.external ? (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-[#4A6E80] hover:text-[#D98A2B] transition"
                      >
                        {item.link.label} →
                      </a>
                    ) : (
                      <Link
                        href={item.link.href}
                        className="text-[12px] text-[#4A6E80] hover:text-[#D98A2B] transition"
                      >
                        {item.link.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8 h-px bg-[#252C38]" />

        {/* Footer note */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#3A4E60] leading-5 max-w-sm">
            Questions about what a specific product touches?{" "}
            <a
              href="mailto:support@acmeagentsupply.com"
              className="text-[#4A6E80] hover:text-[#D98A2B] transition"
            >
              support@acmeagentsupply.com
            </a>
          </p>
          <div className="flex gap-5 text-[11px]">
            <Link href="/products/quartermaster" className="text-[#4A6E80] hover:text-[#D98A2B] transition">
              Quartermaster →
            </Link>
            <Link href="/products" className="text-[#4A6E80] hover:text-[#D98A2B] transition">
              All Products →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
