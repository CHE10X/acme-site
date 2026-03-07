import PricingCheckoutButton from "../components/PricingCheckoutButton";
import { fetchPrices } from "../lib/fetchPrices";
import { getCheckoutPaymentLink } from "../lib/stripeProducts";
import Link from "next/link";

function PriceLine({ price }: { price: string }) {
  return (
    <div className="mt-2 text-[18px] font-semibold text-[#E6E6E6]">
      {price} / runtime / month{" "}
      <span
        title="Runtime means one active OpenClaw agent host."
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#9AA3AD] text-[13px] font-normal text-[#9AA3AD]"
      >
        ?
      </span>
    </div>
  );
}

export default async function PricingPage() {
  const prices = await fetchPrices();

  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:gap-10">
        <section className="rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 shadow-[0_0_0_1px_rgba(217,138,43,0.08)]">
          <div className="text-[13px] uppercase tracking-[0.32em] text-[#D98A2B]">
            ACME Agent Supply Co.
          </div>
          <h1 className="mt-2 text-[40px] font-semibold text-[#E6E6E6]">Pricing</h1>
          <p className="mt-3 text-[18px] text-[#E6E6E6]">
            A clear path from scan-time evidence to continuous protection.
          </p>
          <p className="mt-2 text-[18px] text-[#9AA3AD]">
            Runtime ={" "}
            <span
              className="text-[#E6E6E6]"
              title="Runtime means one active OpenClaw agent host."
            >
              one active OpenClaw agent host
            </span>
            .
          </p>
        </section>

        <section className="order-2 rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 md:order-1">
          <div className="text-[13px] uppercase tracking-[0.3em] text-[#9AA3AD]">
            Start Free
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              { name: "RadCheck", unit: "RADIATION SCAN UNIT", price: prices.free },
              { name: "Lazarus Lite", unit: "REANIMATION UNIT", price: prices.free },
            ].map((tool) => (
              <article
                key={tool.name}
                className="rounded-md border border-[#3A4048] bg-[#2C3238] px-5 py-5 transition hover:border-[#9AA3AD] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[13px] uppercase tracking-[0.24em] text-[#9AA3AD]">
                      {tool.unit}
                    </div>
                    <h3 className="mt-2 text-[22px] font-semibold text-[#E6E6E6]">
                      {tool.name}
                    </h3>
                    <PriceLine price={tool.price} />
                  </div>
                  <div className="rounded-full border border-[#4A9E6B]/40 bg-[#4A9E6B]/10 px-2 py-1 text-[13px] uppercase tracking-[0.22em] text-[#4A9E6B]">
                    Free
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="order-1 rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6 md:order-2">
          <div className="text-[13px] uppercase tracking-[0.3em] text-[#9AA3AD]">
            Standard Issue
          </div>
          <p className="mt-2 text-[18px] text-[#E6E6E6]">
            Operator purchase - runs in your environment. You remain in full
            control. No hosted lock-in. No hidden telemetry.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <article className="order-1 rounded-2xl border border-[#D98A2B]/40 bg-[#D98A2B]/10 px-6 py-7 lg:order-2 lg:col-span-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[22px] font-semibold text-[#E6E6E6]">
                  Operator Kit
                </h3>
                <div className="rounded-full border border-[#D98A2B]/45 bg-[#D98A2B]/20 px-2 py-1 text-[13px] uppercase tracking-[0.2em] text-[#E6E6E6]">
                  MOST COMMON LOADOUT
                </div>
              </div>
              <p className="mt-2 text-[18px] text-[#E6E6E6]">
                Includes 5 core reliability modules
              </p>
              <PriceLine price={prices["operator-kit"]} />
              <ul className="mt-4 list-disc space-y-1 pl-5 text-[18px] text-[#E6E6E6]">
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
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#D98A2B]/60 bg-[#D98A2B]/20 px-4 py-2 text-[15px] font-semibold text-[#E6E6E6] transition hover:border-[#D98A2B]/80 hover:bg-[#D98A2B]/24"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>

            <article className="order-2 rounded-md border border-[#D98A2B]/55 bg-[#2C3238] px-5 py-5 lg:order-1 lg:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[22px] font-semibold text-[#E6E6E6]">
                  Sentinel
                </h3>
                <div className="rounded-full border border-[#D98A2B]/45 bg-[#D98A2B]/20 px-2 py-1 text-[13px] uppercase tracking-[0.2em] text-[#E6E6E6]">
                  MOST POPULAR
                </div>
              </div>
              <p className="mt-2 text-[18px] text-[#E6E6E6]">
                Active protection that flags instability early and keeps failures
                from compounding.
              </p>
              <PriceLine price={prices.sentinel} />
              <div className="mt-3 border-t border-[#D98A2B]/35 pt-3">
                <div className="text-[13px] uppercase tracking-[0.24em] text-[#D98A2B]">
                  Proof artifacts
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[18px] text-[#E6E6E6]">
                  <li>Deterministic protection history</li>
                  <li>Early warning flags (before visible failure)</li>
                  <li>Operator-readable proofs (no screenshots)</li>
                </ul>
                <Link
                  href="/docs/sentinel/overview"
                  className="mt-2 inline-block text-[15px] text-[#D98A2B] underline underline-offset-4"
                >
                  Sentinel docs
                </Link>
              </div>
              <PricingCheckoutButton
                productKey="sentinel"
                priceLabel={`${prices.sentinel} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("sentinel")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#D98A2B] px-4 py-2 text-[15px] font-semibold text-[#1E2226] transition hover:bg-[#C47A22]"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>

            <article className="order-3 rounded-md border border-[#3A4048] bg-[#2C3238] px-5 py-5 transition hover:border-[#9AA3AD] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:col-span-2">
              <h3 className="text-[22px] font-semibold text-[#E6E6E6]">
                SphinxGate
              </h3>
              <p className="mt-2 text-[18px] text-[#E6E6E6]">
                Policy enforcement and audit-friendly routing posture.
              </p>
              <PriceLine price={prices.sphinxgate} />
              <PricingCheckoutButton
                productKey="sphinxgate"
                priceLabel={`${prices.sphinxgate} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("sphinxgate")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
              >
                Add module
              </PricingCheckoutButton>
            </article>

            <article className="order-4 rounded-md border border-[#3A4048] bg-[#2C3238] px-5 py-5 transition hover:border-[#9AA3AD] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:col-span-2">
              <h3 className="text-[22px] font-semibold text-[#E6E6E6]">
                DriftGuard
              </h3>
              <p className="mt-2 text-[18px] text-[#E6E6E6]">
                Drift deltas and baseline deviations for predictable runtimes.
              </p>
              <PriceLine price={prices.driftguard} />
              <PricingCheckoutButton
                productKey="driftguard"
                priceLabel={`${prices.driftguard} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("driftguard")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
              >
                Add module
              </PricingCheckoutButton>
            </article>

            <article className="order-5 rounded-md border border-[#3A4048] bg-[#2C3238] px-5 py-5 transition hover:border-[#9AA3AD] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:col-span-2">
              <h3 className="text-[22px] font-semibold text-[#E6E6E6]">
                Transmission
              </h3>
              <p className="mt-2 text-[18px] text-[#E6E6E6]">
                Multi-agent delivery discipline and routing reliability signals.
              </p>
              <PriceLine price={prices.transmission} />
              <PricingCheckoutButton
                productKey="transmission"
                priceLabel={`${prices.transmission} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("transmission")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
              >
                Add module
              </PricingCheckoutButton>
            </article>
          </div>
        </section>

        <section className="order-3 rounded-2xl border border-[#3A4048] bg-[#242A30] px-6 py-6">
          <div className="text-[13px] uppercase tracking-[0.3em] text-[#9AA3AD]">
            Control Plane
          </div>
          <article className="mt-4 rounded-2xl border border-[#3A4048] bg-[#2C3238] px-6 py-6">
            <h2 className="text-[30px] font-semibold text-[#E6E6E6]">Agent911</h2>
            <p className="mt-3 text-[18px] text-[#E6E6E6]">
              Agent911 unifies system stability, Sentinel protection activity,
              and FindMyAgent visibility into one operational surface.
            </p>
            <PriceLine price={prices.agent911} />
            <ul className="mt-4 space-y-2 text-[18px] text-[#E6E6E6]">
              <li>Unified reliability snapshot</li>
              <li>FindMyAgent visibility</li>
              <li>Proofs and history</li>
              <li>Guided triage workflows</li>
            </ul>
            <div className="mt-3 text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">
              Observational by design. No autonomous changes.
            </div>
            <PricingCheckoutButton
              productKey="agent911"
              priceLabel={`${prices.agent911} / runtime / month`}
              fallbackUrl={getCheckoutPaymentLink("agent911")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
            >
              Subscribe
            </PricingCheckoutButton>
          </article>
        </section>
      </main>
    </div>
  );
}
