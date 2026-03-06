import Link from "next/link";

const UTILITIES = [
  "OCTriage",
  "RadCheck",
  "FindMyAgent",
  "Sentinel",
  "SphinxGate",
  "DriftGuard",
  "Agent911",
  "Watchdog",
  "Lazarus",
  "Transmission",
];

export default function BotShopPage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Bot Shop</h1>
        <p className="mt-3 text-zinc-300">
          Operator utilities and references for OpenClaw environments.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {UTILITIES.map((utility) => (
            <div
              key={utility}
              className="rounded-lg border border-zinc-800/80 bg-zinc-900/55 px-3 py-2 text-sm text-zinc-200"
            >
              {utility}
            </div>
          ))}
        </div>
        <Link
          href="/docs"
          className="mt-6 inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
        >
          Read the Docs
        </Link>
      </div>
    </main>
  );
}
