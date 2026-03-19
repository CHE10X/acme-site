import Link from "next/link";
import PricingCheckoutButton from "../components/PricingCheckoutButton";
import { fetchPrices } from "../lib/fetchPrices";
import { getCheckoutPaymentLink } from "../lib/stripeProducts";

function PriceLine({ price, sub = "/ month" }: { price: string; sub?: string }) {
  if (!price) return null;
  return (
    <div className="mt-4 text-[28px] font-semibold leading-none text-[#E6E6E6]">
      {price}
      {sub && <span className="ml-2 text-[15px] font-medium text-[#9AA3AD]">{sub}</span>}
    </div>
  );
}

function MaturityDots({ count }: { count: 1 | 2 | 3 }) {
  return (
    <div className="inline-flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${index < count ? "bg-[#D98A2B]" : "bg-[#3A4048]"}`}
        />
      ))}
    </div>
  );
}

function IncludesList({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="mt-5 rounded-md border border-[#3A4048] bg-[#1E2226] px-3 py-3">
      <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-[#9AA3AD]">{title}</div>
      <ul className="mt-2 space-y-1 text-[14px] text-[#C7CDD4]">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function PricingPage() {
  const prices = await fetchPrices();

  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto flex w-full max-w-[1100px] flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">

        {/* Header */}
        <div className="flex items-baseline justify-between gap-4 border-b border-[#2E3640] pb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">ACME Agent Supply Co.</div>
            <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-[#E6E6E6]">Pricing</h1>
          </div>
          <p className="hidden text-[14px] text-[#5A6E80] sm:block">Start free. Add protection as you need it.</p>
        </div>

        {/* 3-column tier grid */}
        <section>
          <div className="grid gap-4 lg:grid-cols-3">

            {/* Free */}
            <article className="flex flex-col rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-6 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">Free Access</div>
                <MaturityDots count={1} />
              </div>
              <h3 className="mt-3 text-[22px] font-semibold text-[#E6E6E6]">Triage + RadCheck</h3>
              <p className="mt-3 text-[15px] text-[#C7CDD4]">
                Something feels wrong. You need to see what&apos;s happening before you touch anything.
              </p>
              <PriceLine price="$0" sub="/ forever" />
              <IncludesList
                title="Includes"
                lines={["Triage — works when OpenClaw doesn't", "RadCheck — reliability score 0–100"]}
              />
              <Link
                href="/docs/octriage/overview"
                className="mt-auto pt-5 flex h-10 w-full items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[15px] font-medium text-[#E6E6E6] transition-colors hover:border-[#9AA3AD]"
              >
                Start Free
              </Link>
            </article>

            {/* $19 — Agent911 */}
            <article className="flex flex-col rounded-[6px] border border-[#D98A2B]/55 bg-[#2C3238] p-6 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[#D98A2B]">Incident Response</div>
                <MaturityDots count={2} />
              </div>
              <h3 className="mt-3 text-[22px] font-semibold text-[#E6E6E6]">Agent911</h3>
              <p className="mt-3 text-[15px] text-[#C7CDD4]">
                Something broke at 2am. You need a recovery cockpit, not a chatbot.
              </p>
              <PriceLine price={prices.agent911} />
              <IncludesList
                title="Includes"
                lines={[
                  "Agent911 — recovery cockpit, read-only",
                  "Recall — manual fleet intervention",
                  "Lazarus — recovery readiness verification (free)",
                ]}
              />
              <PricingCheckoutButton
                productKey="agent911"
                priceLabel={`${prices.agent911} / month`}
                fallbackUrl={getCheckoutPaymentLink("agent911")}
                className="mt-auto pt-5 flex h-10 w-full items-center justify-center rounded-lg bg-[#D98A2B] px-4 text-[15px] font-medium text-[#1E2226] transition-colors hover:bg-[#C47A22]"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>

            {/* $29 — Operator Bundle */}
            <article className="flex flex-col rounded-[6px] border border-[#4A9E6B]/55 bg-[#2C3238] p-6 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[#4A9E6B]">Full Resilience Layer</div>
                <MaturityDots count={3} />
              </div>
              <h3 className="mt-3 text-[22px] font-semibold text-[#E6E6E6]">Operator Bundle</h3>
              <p className="mt-3 text-[15px] text-[#C7CDD4]">
                The complete wired layer. Detection fires. Readiness confirms. Recovery runs. You get a report.
              </p>
              <PriceLine price={prices["operator-bundle"] ?? "$29"} />
              <IncludesList
                title="Includes everything, wired end-to-end"
                lines={[
                  "Sentinel — silent failure detection",
                  "InfraWatch — infra config drift",
                  "Watchdog — heartbeat + liveness",
                  "Lazarus — recovery readiness",
                  "Agent911 — recovery cockpit",
                  "Recall — manual intervention",
                ]}
              />
              <PricingCheckoutButton
                productKey="operator-kit"
                priceLabel={`${prices["operator-bundle"] ?? "$29"} / month`}
                fallbackUrl={getCheckoutPaymentLink("operator-kit")}
                className="mt-auto pt-5 flex h-10 w-full items-center justify-center rounded-lg border border-[#4A9E6B] px-4 text-[15px] font-medium text-[#E6E6E6] transition-colors hover:bg-[#1E3A28]"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>
          </div>

          {/* Standalone add-ons */}
          <div className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-5 py-5 sm:px-6">
            <div className="text-[13px] uppercase tracking-[0.24em] text-[#9AA3AD]">Standalone Products</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* Sentinel */}
              <article className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5">
                <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD]">Detection</div>
                <h4 className="mt-2 text-[20px] font-semibold text-[#E6E6E6]">Sentinel</h4>
                <p className="mt-2 text-[14px] text-[#C7CDD4]">Continuous silent failure detection. The always-on layer.</p>
                <PriceLine price={prices.sentinel} />
                <PricingCheckoutButton
                  productKey="sentinel"
                  priceLabel={`${prices.sentinel} / month`}
                  fallbackUrl={getCheckoutPaymentLink("sentinel")}
                  className="mt-4 inline-flex h-9 min-w-[140px] items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[14px] font-medium text-[#E6E6E6] transition-colors hover:border-[#9AA3AD]"
                >
                  Subscribe
                </PricingCheckoutButton>
              </article>

              {/* SphinxGate */}
              <article className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5">
                <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD]">Access Control</div>
                <h4 className="mt-2 text-[20px] font-semibold text-[#E6E6E6]">SphinxGate</h4>
                <p className="mt-2 text-[14px] text-[#C7CDD4]">Policy enforcement for model routing. Lane discipline.</p>
                <PriceLine price={prices.sphinxgate} />
                <PricingCheckoutButton
                  productKey="sphinxgate"
                  priceLabel={`${prices.sphinxgate} / month`}
                  fallbackUrl={getCheckoutPaymentLink("sphinxgate")}
                  className="mt-4 inline-flex h-9 min-w-[140px] items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[14px] font-medium text-[#E6E6E6] transition-colors hover:border-[#9AA3AD]"
                >
                  Add
                </PricingCheckoutButton>
              </article>

              {/* Transmission — coming soon */}
              <article className="rounded-[6px] border border-dashed border-[#3A4048] bg-[#222830] p-5 opacity-80">
                <div className="text-[13px] uppercase tracking-[0.2em] text-[#4A5E70]">Coming Soon</div>
                <h4 className="mt-2 text-[20px] font-semibold text-[#C8D4E0]">Transmission</h4>
                <p className="mt-2 text-[14px] text-[#7A8EA0]">
                  Task-aware model routing. Right model, right cost, every time. Patent pending.
                </p>
                <div className="mt-4 text-[13px] font-mono text-[#4A5E70]">Pricing TBD</div>
                <Link
                  href="/docs/transmission/overview"
                  className="mt-4 inline-flex h-9 min-w-[140px] items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[14px] font-medium text-[#5A6E80] transition-colors hover:border-[#4A5E70]"
                >
                  Learn more →
                </Link>
              </article>

              {/* Stack page link */}
              <article className="rounded-[6px] border border-[#3A4048] bg-[#1E2630] p-5 flex flex-col justify-between">
                <div>
                  <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD]">Full Picture</div>
                  <h4 className="mt-2 text-[20px] font-semibold text-[#E6E6E6]">The Stack</h4>
                  <p className="mt-2 text-[14px] text-[#C7CDD4]">See v1, v2, and full vision. How everything connects.</p>
                </div>
                <Link
                  href="/stack"
                  className="mt-4 inline-flex h-9 min-w-[140px] items-center justify-center rounded-lg border border-[#D98A2B] px-4 text-[14px] font-medium text-[#D98A2B] transition-colors hover:bg-[#2C3238]"
                >
                  View the Stack →
                </Link>
              </article>

            </div>
          </div>
        </section>

        {/* PLG funnel explainer */}
        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-5 py-6 sm:px-6 sm:py-7">
          <h2 className="text-[20px] font-semibold text-[#E6E6E6]">How operators adopt ACME</h2>
          <p className="mt-3 max-w-[78ch] text-[15px] leading-7 text-[#C7CDD4]">
            Most operators start with Triage — free, no install friction, immediate value. From there the pattern is consistent:
            Sentinel catches what Triage surfaces, Agent911 handles what Sentinel escalates, and the Operator Bundle wires everything into one automatic layer.
            You don&apos;t have to buy the full stack on day one. Start where the pain is.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[13px] text-[#9AA3AD]">
            <span className="rounded bg-[#1E2226] px-2 py-1 text-[#4A9E6B]">Triage (free)</span>
            <span>→</span>
            <span className="rounded bg-[#1E2226] px-2 py-1 text-[#D98A2B]">Sentinel ($5)</span>
            <span>→</span>
            <span className="rounded bg-[#1E2226] px-2 py-1 text-[#D98A2B]">Agent911 ($19)</span>
            <span>→</span>
            <span className="rounded bg-[#1E2226] px-2 py-1 text-[#4A9E6B]">Bundle ($29)</span>
          </div>
        </section>

      </main>
    </div>
  );
}
