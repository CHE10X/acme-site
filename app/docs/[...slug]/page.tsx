import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCS_BY_SLUG, DOCS_ENTRIES } from "../docsData";

export function generateStaticParams() {
  return DOCS_ENTRIES.map((entry) => ({ slug: entry.slug.split("/") }));
}

export default async function DocsEntryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolved = await params;
  const key = resolved.slug.join("/");
  const entry = DOCS_BY_SLUG.get(key);

  if (!entry) {
    notFound();
  }

  const isArchitecture = key === "architecture/reliability-stack";

  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
        <div className="mb-3 text-[11px] uppercase tracking-[0.35em] text-zinc-500">
          Docs
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
          {entry.title}
        </h1>
        <p className="mt-3 text-zinc-300">{entry.summary}</p>

        <div className="mt-5 space-y-3 text-zinc-300">
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {isArchitecture ? (
          <figure className="mt-6 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/80">
            <Image
              src="/diagrams/openclaw-reliability-stack.svg"
              alt="Layered diagram of the OpenClaw reliability stack showing runtime, memory integrity, monitoring, diagnostics, and recovery."
              width={1400}
              height={1000}
              className="h-auto w-full"
            />
          </figure>
        ) : null}

        <Link
          href="/docs"
          className="mt-8 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
        >
          Back to Docs
        </Link>
      </div>
    </main>
  );
}
