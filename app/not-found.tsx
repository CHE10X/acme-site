import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-zinc-100">
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8">
        <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
          Route Not Found
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-3 text-zinc-400">
          The path may have moved or the link is stale. Use Docs to jump to a
          valid operator reference.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            Go to Docs
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
