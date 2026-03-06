import Link from "next/link";

const TIERS = [
  {
    name: "Free Tier - OCTriage",
    items: ["OCTriage", "Proof Bundles", "Basic diagnostics", "Local Observe signals"],
  },
  {
    name: "Paid Tier - Observe / Reliability",
    items: ["RadCheck", "Observe layer", "octriage -watch", "Protection reports"],
  },
  {
    name: "Enterprise Tier - Recover",
    items: ["ORP", "Agent911", "Lazarus", "Recovery readiness reporting"],
  },
];

export default function PricingPage() {
  return (
    <main className="bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Pricing</h1>
        <p className="mt-3 text-zinc-300">
          OpenClaw pricing maps to reliability outcomes: install, observe, and recover.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => (
            <article key={tier.name} className="rounded-xl border border-zinc-800/80 bg-zinc-900/55 p-4">
              <h2 className="text-base font-medium text-zinc-100">{tier.name}</h2>
              <ul className="mt-3 space-y-1 text-sm text-zinc-300">
                {tier.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Link
          href="/docs/octriage/overview"
          className="mt-6 inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
        >
          Install OCTriage
        </Link>
      </div>
    </main>
  );
}
