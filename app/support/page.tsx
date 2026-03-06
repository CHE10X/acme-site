import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Support</h1>
        <p className="mt-3 text-zinc-300">
          Support workflows remain evidence-first: start with OCTriage output,
          proof bundle path, and ORP report.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/support/first-response"
            className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
          >
            First Response
          </Link>
          <Link
            href="/docs/support/when-things-feel-off"
            className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Support Runbook
          </Link>
        </div>
      </div>
    </main>
  );
}
