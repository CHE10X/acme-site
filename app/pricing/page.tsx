import PricingCheckoutButton from "../components/PricingCheckoutButton";
import { fetchPrices } from "../lib/fetchPrices";
import { getCheckoutPaymentLink } from "../lib/stripeProducts";

function PriceLine({ price }: { price: string }) {
  return (
    <div className="mt-2 text-base font-semibold text-zinc-100">
      {price} / runtime / month{" "}
      <span
        title="Runtime means one active OpenClaw agent host."
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500 text-[10px] font-normal text-zinc-300"
      >
        ?
      </span>
    </div>
  );
}

export default async function PricingPage() {
  const prices = await fetchPrices();

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:gap-10">
        <section className="rounded-2xl border border-zinc-700/90 bg-zinc-900/80 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400">
            ACME Agent Supply Co.
          </div>
          <h1 className="mt-2 text-3xl font-bold text-zinc-100">Pricing</h1>
          <p className="mt-3 text-zinc-300">
            A clear path from scan-time evidence to continuous protection.
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Runtime ={" "}
            <span
              className="text-zinc-100"
              title="Runtime means one active OpenClaw agent host."
            >
              one active OpenClaw agent host
            </span>
            .
          </p>
        </section>

        <section className="order-2 rounded-2xl border-t border-zinc-700/80 bg-zinc-800/55 px-6 py-6 md:order-1">
          <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-300">
            Start Free
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              { name: "RadCheck", unit: "RADIATION SCAN UNIT", price: prices.free },
              { name: "Lazarus Lite", unit: "REANIMATION UNIT", price: prices.free },
            ].map((tool) => (
              <article
                key={tool.name}
                className="rounded-xl border border-zinc-700/95 bg-zinc-800/75 px-5 py-5 transition hover:border-zinc-600 hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                      {tool.unit}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
                      {tool.name}
                    </h3>
                    <PriceLine price={tool.price} />
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-emerald-200/80">
                    Free
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="order-1 rounded-2xl border-t border-zinc-700/80 bg-zinc-800/55 px-6 py-6 md:order-2">
          <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-300">
            Standard Issue
          </div>
          <p className="mt-2 text-sm text-zinc-300">
            Operator purchase - runs in your environment. You remain in full
            control. No hosted lock-in. No hidden telemetry.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <article className="order-1 rounded-2xl border border-amber-400/30 bg-amber-500/7 px-6 py-7 lg:order-2 lg:col-span-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-zinc-100 md:text-xl">
                  Operator Kit
                </h3>
                <div className="rounded-full border border-amber-400/35 bg-amber-500/12 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-amber-200">
                  MOST COMMON LOADOUT
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                Includes 5 core reliability modules
              </p>
              <PriceLine price={prices["operator-kit"]} />
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                <li>Sentinel</li>
                <li>Watchdog</li>
                <li>SphinxGate</li>
                <li>DriftGuard</li>
                <li>Transmission</li>
              </ul>
              <PricingCheckoutButton
                productKey="operator-kit"
                priceLabel={`${prices["operator-kit"]} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("operator-kit")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-amber-300/45 bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-400/18"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>

            <article className="order-2 rounded-xl border border-amber-400/45 bg-zinc-800/80 px-5 py-5 lg:order-1 lg:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-zinc-100 md:text-xl">
                  Sentinel
                </h3>
                <div className="rounded-full border border-amber-400/35 bg-amber-500/12 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-amber-200">
                  MOST POPULAR
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-200">
                Active protection that flags instability early and keeps failures
                from compounding.
              </p>
              <PriceLine price={prices.sentinel} />
              <div className="mt-3 border-t border-amber-400/25 pt-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300">
                  Proof artifacts
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                  <li>Deterministic protection history</li>
                  <li>Early warning flags (before visible failure)</li>
                  <li>Operator-readable proofs (no screenshots)</li>
                </ul>
                <a
                  href="/docs/sentinel/overview"
                  className="mt-2 inline-block text-xs text-amber-200 underline underline-offset-4"
                >
                  Sentinel docs
                </a>
              </div>
              <PricingCheckoutButton
                productKey="sentinel"
                priceLabel={`${prices.sentinel} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("sentinel")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>

            <article className="order-3 rounded-xl border border-zinc-700/95 bg-zinc-800/75 px-5 py-5 transition hover:border-zinc-600 hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:col-span-2">
              <h3 className="text-lg font-semibold text-zinc-100 md:text-xl">
                SphinxGate
              </h3>
              <p className="mt-2 text-sm text-zinc-200">
                Policy enforcement and audit-friendly routing posture.
              </p>
              <PriceLine price={prices.sphinxgate} />
              <PricingCheckoutButton
                productKey="sphinxgate"
                priceLabel={`${prices.sphinxgate} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("sphinxgate")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
              >
                Add module
              </PricingCheckoutButton>
            </article>

            <article className="order-4 rounded-xl border border-zinc-700/95 bg-zinc-800/75 px-5 py-5 transition hover:border-zinc-600 hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:col-span-2">
              <h3 className="text-lg font-semibold text-zinc-100 md:text-xl">
                DriftGuard
              </h3>
              <p className="mt-2 text-sm text-zinc-200">
                Drift deltas and baseline deviations for predictable runtimes.
              </p>
              <PriceLine price={prices.driftguard} />
              <PricingCheckoutButton
                productKey="driftguard"
                priceLabel={`${prices.driftguard} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("driftguard")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
              >
                Add module
              </PricingCheckoutButton>
            </article>

            <article className="order-5 rounded-xl border border-zinc-700/95 bg-zinc-800/75 px-5 py-5 transition hover:border-zinc-600 hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:col-span-2">
              <h3 className="text-lg font-semibold text-zinc-100 md:text-xl">
                Transmission
              </h3>
              <p className="mt-2 text-sm text-zinc-200">
                Multi-agent delivery discipline and routing reliability signals.
              </p>
              <PriceLine price={prices.transmission} />
              <PricingCheckoutButton
                productKey="transmission"
                priceLabel={`${prices.transmission} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("transmission")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
              >
                Add module
              </PricingCheckoutButton>
            </article>
          </div>
        </section>

        <section className="order-3 rounded-2xl border-t border-zinc-700/80 bg-zinc-800/55 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.35em] text-zinc-300">
            Control Plane
          </div>
          <article className="mt-4 rounded-2xl border border-zinc-700/95 bg-zinc-800/80 px-6 py-6">
            <h2 className="text-2xl font-semibold text-zinc-100">Agent911</h2>
            <p className="mt-3 text-zinc-200">
              Agent911 unifies system stability, Sentinel protection activity,
              and FindMyAgent visibility into one operational surface.
            </p>
            <PriceLine price={prices.agent911} />
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              <li>Unified reliability snapshot</li>
              <li>FindMyAgent visibility</li>
              <li>Proofs and history</li>
              <li>Guided triage workflows</li>
            </ul>
            <div className="mt-3 text-xs uppercase tracking-[0.28em] text-zinc-500">
              Observational by design. No autonomous changes.
            </div>
            <PricingCheckoutButton
              productKey="agent911"
              priceLabel={`${prices.agent911} / runtime / month`}
              fallbackUrl={getCheckoutPaymentLink("agent911")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
            >
              Subscribe
            </PricingCheckoutButton>
          </article>
        </section>
      </main>
    </div>
  );
}
