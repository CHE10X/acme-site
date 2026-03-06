import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import OpenClawStackDiagram from "@/src/components/OpenClawStackDiagram";

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
  const isReliabilityStackPage = slug.join("/") === "architecture/reliability-stack";

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

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06)]">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-amber-400">
                ACME Agent Supply Co.
              </div>
              {title && (
                <h1 className="mb-3 text-3xl font-bold leading-tight text-zinc-100">
                  {title}
                </h1>
              )}
            </div>
            <div className="hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2 md:block">
              <img
                src="/brand/agent911-support-badge.png"
                alt="Agent911 Support Badge"
                className="h-32 w-auto opacity-80"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="overflow-hidden rounded">
              <span className="hazard-shimmer block h-1 w-full bg-[repeating-linear-gradient(135deg,rgba(251,191,36,0.8)_0,rgba(251,191,36,0.8)_10px,rgba(0,0,0,0.78)_10px,rgba(0,0,0,0.78)_20px)] bg-[length:24px_24px]" />
            </div>
            <div className="hidden rounded bg-zinc-900/55 md:block" />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.05)]">
          {/* Content */}
          <article
            className="docs-prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {isReliabilityStackPage ? (
            <figure className="mt-8 rounded-2xl border border-zinc-700/80 bg-zinc-900/70 p-4">
              <OpenClawStackDiagram />
              <figcaption className="mt-3 text-sm text-zinc-400">
                OpenClaw combines deterministic agent rehydration, runtime
                hygiene, diagnostics, and autonomous recovery into a single
                reliability stack for AI agent systems.
              </figcaption>
            </figure>
          ) : null}

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
