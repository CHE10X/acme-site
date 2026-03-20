import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { marked } from "marked";

export const metadata: Metadata = {
  title: "Customer Service — ACME Agent Supply Co.",
  description: "Get help, cancel anytime, or request a refund. ACME Agent Supply Co. customer service.",
};

export default function RefundPolicyPage() {
  const filePath = path.join(process.cwd(), "legal", "refund-policy.md");
  const raw = fs.readFileSync(filePath, "utf8");

  // Strip the H1 title and date lines — render them in the header separately
  const lines = raw.split(/\r?\n/);
  let idx = 0;
  while (lines[idx]?.trim() === "") idx++;

  let title = "Refund Policy";
  if (lines[idx]?.startsWith("# ")) {
    title = lines[idx].replace(/^#\s+/, "").trim();
    idx++;
  }
  while (lines[idx]?.trim() === "") idx++;

  let effectiveDate: string | undefined;
  let lastUpdated: string | undefined;
  while (idx < lines.length) {
    const line = lines[idx].trim();
    const bold = line.match(/^\*\*(.+?)\*\*$/);
    if (!bold) break;
    const text = bold[1].trim();
    if (/^effective date:/i.test(text)) {
      effectiveDate = text.replace(/^effective date:\s*/i, "").trim();
      idx++;
      continue;
    }
    if (/^last updated:/i.test(text)) {
      lastUpdated = text.replace(/^last updated:\s*/i, "").trim();
      idx++;
      continue;
    }
    break;
  }
  while (lines[idx]?.trim() === "") idx++;

  const body = lines.slice(idx).join("\n");
  const html = marked.parse(body) as string;

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <main className="w-full px-5 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20">
        <div className="mx-auto w-full max-w-[720px]">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight text-neutral-900 md:text-3xl">
              {title}
            </h1>
            {(effectiveDate || lastUpdated) && (
              <p className="mt-3 text-sm text-neutral-500">
                {effectiveDate && <>Effective Date: {effectiveDate}</>}
                {effectiveDate && lastUpdated && (
                  <span className="px-2 text-neutral-300">·</span>
                )}
                {lastUpdated && <>Last Updated: {lastUpdated}</>}
              </p>
            )}
          </header>

          <article
            className="
              mt-6 border-t border-neutral-200 pt-6 text-base leading-[1.75] text-neutral-800 antialiased
              [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-300 [&_a]:underline-offset-4 hover:[&_a]:opacity-90
              [&_strong]:font-semibold
              [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-neutral-900
              [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-neutral-900
              [&_p]:my-4
              [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:list-disc
              [&_ol]:my-4 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal
              [&_li::marker]:text-neutral-400
              [&_hr]:my-8 [&_hr]:border-neutral-200
            "
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
    </div>
  );
}
