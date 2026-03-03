import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";

export const metadata: Metadata = {
  title: "Privacy Policy — ACME Agent Supply Co.",
  description: "Privacy Policy for ACME Agent Supply Co. products and services.",
};

export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), "content", "legal", "privacy-policy.md");
  const raw = fs.readFileSync(filePath, "utf8");

  // Strip frontmatter
  const body = raw.replace(/^---[\s\S]*?---\n/, "");
  const htmlContent = marked(body) as string;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-zinc-400">
          <Link href="/" className="hover:text-zinc-200 transition-colors">Home</Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300">Privacy Policy</span>
        </nav>

        <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)] mb-8">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400 mb-2">
            ACME Agent Supply Co.
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-3 leading-tight">
            Privacy Policy
          </h1>
          <div className="overflow-hidden rounded">
            <span className="hazard-shimmer block h-1 w-full bg-[repeating-linear-gradient(135deg,rgba(251,191,36,0.85)_0,rgba(251,191,36,0.85)_10px,rgba(0,0,0,0.85)_10px,rgba(0,0,0,0.85)_20px)] bg-[length:24px_24px]" />
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-8 shadow-[0_0_0_1px_rgba(251,191,36,0.05)]">
          <article
            className="docs-prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div className="mt-12 pt-6 border-t border-zinc-800 flex gap-6 text-sm text-zinc-400">
            <Link href="/legal/terms" className="hover:text-zinc-200 transition-colors">
              Terms of Service →
            </Link>
            <Link href="/" className="hover:text-zinc-200 transition-colors">
              ← Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
