import Link from "next/link";
import { DOCS_ENTRIES } from "./docsData";

const ORDER = [
  "octriage/overview",
  "architecture/reliability-stack",
  "radcheck/score-explained",
  "sentinel/overview",
  "sphinxgate/overview",
  "driftguard/overview",
  "watchdog/overview",
  "agent911/snapshot-explained",
  "lazarus/overview",
  "transmission/overview",
  "findmyagent/overview",
  "orp/overview",
  "support/when-things-feel-off",
];

const entries = ORDER.map((slug) =>
  DOCS_ENTRIES.find((entry) => entry.slug === slug),
).filter((entry): entry is (typeof DOCS_ENTRIES)[number] => Boolean(entry));

export default function DocsPage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4">
          <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
            Docs Navigation
          </div>
          <nav className="mt-4 space-y-1">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/docs/${entry.slug}`}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
              >
                {entry.title}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
            Documentation
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Architecture, diagnostics, and deterministic recovery workflows for
            OpenClaw operators.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/docs/${entry.slug}`}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              >
                <h2 className="text-base font-medium text-zinc-100">
                  {entry.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-300">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
