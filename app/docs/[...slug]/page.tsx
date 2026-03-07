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
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[1100px] px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-[13px]">
          <Link
            href="/"
            className="text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]"
          >
            Home
          </Link>
          <span className="text-[#3A4048]">/</span>
          <Link
            href="/docs"
            className="text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]"
          >
            Docs
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span className="text-[#3A4048]">/</span>
              {crumb.isLast ? (
                <span className="capitalize text-[#E6E6E6]">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="capitalize text-[#9AA3AD] transition-colors hover:text-[#E6E6E6]"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <div className="rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 shadow-[0_0_0_1px_rgba(217,138,43,0.06)]">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
            <div>
              <div className="mb-2 text-[13px] uppercase tracking-[0.32em] text-[#D98A2B]">
                ACME Agent Supply Co.
              </div>
              {title && (
                <h1 className="mb-3 text-[40px] font-semibold leading-tight text-[#E6E6E6]">
                  {title}
                </h1>
              )}
            </div>
            <div className="hidden rounded-xl border border-[#3A4048] bg-[#2C3238] p-2 md:block">
              <img
                src="/brand/agent911-support-badge.png"
                alt="Agent911 Support Badge"
                className="h-32 w-auto opacity-80"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="overflow-hidden rounded">
              <span className="hazard-shimmer block h-1 w-full bg-[repeating-linear-gradient(135deg,rgba(217,138,43,0.8)_0,rgba(217,138,43,0.8)_10px,rgba(30,34,38,0.8)_10px,rgba(30,34,38,0.8)_20px)] bg-[length:24px_24px]" />
            </div>
            <div className="hidden rounded bg-[#2C3238] md:block" />
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 shadow-[0_0_0_1px_rgba(217,138,43,0.05)]">
          {/* Content */}
          <article
            className="docs-prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Back link */}
          <div className="mt-12 border-t border-[#3A4048] pt-6">
            <Link
              href="/docs"
              className="text-[18px] text-[#9AA3AD] transition-colors hover:text-[#D98A2B]"
            >
              ← Back to Docs
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
