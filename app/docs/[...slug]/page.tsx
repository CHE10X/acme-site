import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

function getAllDocSlugs(): string[][] {
  const result: string[][] = [];
  function walk(dir: string, prefix: string[] = []) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name]);
      } else if (entry.name.endsWith(".md")) {
        result.push([...prefix, entry.name.replace(/\.md$/, "")]);
      }
    }
  }
  walk(DOCS_DIR);
  return result;
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

function parseFrontmatter(raw: string): { title?: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { body: raw };
  const titleMatch = match[1].match(/^title:\s*(.+)$/m);
  return { title: titleMatch?.[1]?.trim(), body: match[2] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(DOCS_DIR, ...slug) + ".md";
  if (!fs.existsSync(filePath)) return { title: "Not Found — ACME Docs" };
  const { title } = parseFrontmatter(fs.readFileSync(filePath, "utf-8"));
  return {
    title: title ? `${title} — ACME Docs` : `Docs — ACME Agent Supply Co.`,
  };
}

export default async function DocsArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const filePath = path.join(DOCS_DIR, ...slug) + ".md";

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { title, body } = parseFrontmatter(raw);
  const htmlContent = await marked(body, { async: true });

  const breadcrumbs = slug.map((segment, i) => ({
    label: segment.replace(/-/g, " "),
    href: "/docs/" + slug.slice(0, i + 1).join("/"),
    isLast: i === slug.length - 1,
  }));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm flex-wrap mb-8">
          <Link
            href="/"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Home
          </Link>
          <span className="text-zinc-700">/</span>
          <Link
            href="/docs"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Docs
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span className="text-zinc-700">/</span>
              {crumb.isLast ? (
                <span className="text-zinc-300 capitalize">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-zinc-400 hover:text-zinc-200 transition-colors capitalize"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <img
            src="/brand/agent911-support-badge.png"
            alt="Agent911 Support Badge"
            className="hidden md:block absolute top-2 right-6 h-40 w-auto opacity-80"
          />
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400 mb-2">
            ACME Agent Supply Co.
          </div>
          {title && (
            <h1 className="text-3xl font-bold text-zinc-100 mb-3 leading-tight">
              {title}
            </h1>
          )}
          <div className="overflow-hidden rounded">
            <span className="hazard-shimmer block h-1 w-full bg-[repeating-linear-gradient(135deg,rgba(251,191,36,0.85)_0,rgba(251,191,36,0.85)_10px,rgba(0,0,0,0.85)_10px,rgba(0,0,0,0.85)_20px)] bg-[length:24px_24px]" />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.05)]">
          {/* Content */}
          <article
            className="docs-prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Back link */}
          <div className="mt-12 pt-6 border-t border-zinc-800">
            <Link
              href="/docs"
              className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
            >
              ← Back to Docs
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
