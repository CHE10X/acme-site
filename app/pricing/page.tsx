import Link from "next/link";
import PricingCheckoutButton from "../components/PricingCheckoutButton";
import { fetchPrices } from "../lib/fetchPrices";
import { getCheckoutPaymentLink } from "../lib/stripeProducts";

function PriceLine({ price }: { price: string }) {
  return (
    <div className="mt-4 text-[28px] font-semibold leading-none text-[#E6E6E6]">
      {price}
      <span className="ml-2 text-[15px] font-medium text-[#9AA3AD]">/ runtime / month</span>
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

function SignalStrip({ title, lines }: { title: string; lines: string[] }) {
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
        {/* Lean header — pricing page, get out of the way */}
        <div className="flex items-baseline justify-between gap-4 border-b border-[#2E3640] pb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B]">ACME Agent Supply Co.</div>
            <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-[#E6E6E6]">Pricing</h1>
          </div>
          <p className="hidden text-[14px] text-[#5A6E80] sm:block">Start free. Add protection as you need it.</p>
        </div>

        <section>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="flex flex-col rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-6 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">Free Access</div>
                <MaturityDots count={1} />
              </div>
              <h3 className="mt-3 text-[22px] font-semibold text-[#E6E6E6]">RadCheck + Lazarus Lite</h3>
              <p className="mt-3 text-[15px] text-[#C7CDD4]">
                When something feels wrong and you need to see what is happening.
              </p>
              <PriceLine price={prices.free} />
              <SignalStrip
                title="Includes"
                lines={["Triage", "RadCheck", "Lazarus Lite"]}
              />
              <Link
                href="/docs/quickstart/5-minute"
                className="mt-auto pt-5 flex h-10 w-full items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[15px] font-medium text-[#E6E6E6] transition-colors hover:border-[#9AA3AD]"
              >
                Start Free
              </Link>
            </article>

            <article className="flex flex-col rounded-[6px] border border-[#D98A2B]/55 bg-[#2C3238] p-6 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[#D98A2B]">Standard Issue</div>
                <MaturityDots count={2} />
              </div>
              <h3 className="mt-3 text-[22px] font-semibold text-[#E6E6E6]">Operator Kit</h3>
              <p className="mt-3 text-[15px] text-[#C7CDD4]">
                When agent systems run continuously and reliability signals matter.
              </p>
              <PriceLine price={prices["operator-kit"]} />
              <SignalStrip
                title="Signals"
                lines={[
                  "Reliability Score",
                  "Protection Events",
                  "Runtime Hygiene",
                  "Drift Alerts",
                ]}
              />
              <PricingCheckoutButton
                productKey="operator-kit"
                priceLabel={`${prices["operator-kit"]} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("operator-kit")}
                className="mt-auto pt-5 flex h-10 w-full items-center justify-center rounded-lg bg-[#D98A2B] px-4 text-[15px] font-medium text-[#1E2226] transition-colors hover:bg-[#C47A22]"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>

            <article className="flex flex-col rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-6 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] uppercase tracking-[0.22em] text-[#9AA3AD]">Control Plane</div>
                <MaturityDots count={3} />
              </div>
              <h3 className="mt-3 text-[22px] font-semibold text-[#E6E6E6]">Agent911</h3>
              <p className="mt-3 text-[15px] text-[#C7CDD4]">
                When production systems require deterministic recovery.
              </p>
              <PriceLine price={prices.agent911} />
              <SignalStrip
                title="Includes"
                lines={[
                  "Control Plane Visibility",
                  "Recovery Readiness",
                  "Guided Triage Workflow",
                ]}
              />
              <PricingCheckoutButton
                productKey="agent911"
                priceLabel={`${prices.agent911} / runtime / month`}
                fallbackUrl={getCheckoutPaymentLink("agent911")}
                className="mt-auto pt-5 flex h-10 w-full items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[15px] font-medium text-[#E6E6E6] transition-colors hover:border-[#9AA3AD]"
              >
                Subscribe
              </PricingCheckoutButton>
            </article>
          </div>

          <div className="mt-8 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-5 py-5 sm:px-6">
            <div className="text-[13px] uppercase tracking-[0.24em] text-[#9AA3AD]">Module Add-ons</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  name: "Sentinel",
                  price: prices.sentinel,
                  desc: "Protection events and instability warnings before visible failure.",
                  productKey: "sentinel" as const,
                  cta: "Subscribe",
                },
                {
                  name: "SphinxGate",
                  price: prices.sphinxgate,
                  desc: "Policy routing discipline with audit-friendly trace behavior.",
                  productKey: "sphinxgate" as const,
                  cta: "Add module",
                },
                {
                  name: "DriftGuard",
                  price: prices.driftguard,
                  desc: "Long-horizon drift stabilization for predictable runtime behavior.",
                  productKey: "driftguard" as const,
                  cta: "Add module",
                },
                {
                  name: "Transmission",
                  price: prices.transmission,
                  desc: "Multi-agent transport discipline and control-lane reliability.",
                  productKey: "transmission" as const,
                  cta: "Add module",
                },
              ].map((module) => (
                <article key={module.name} className="rounded-[6px] border border-[#3A4048] bg-[#2C3238] p-5">
                  <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD]">Module</div>
                  <h4 className="mt-2 text-[22px] font-semibold text-[#E6E6E6]">{module.name}</h4>
                  <p className="mt-2 text-[15px] text-[#C7CDD4]">{module.desc}</p>
                  <PriceLine price={module.price} />
                  <PricingCheckoutButton
                    productKey={module.productKey}
                    priceLabel={`${module.price} / runtime / month`}
                    fallbackUrl={getCheckoutPaymentLink(module.productKey)}
                    className="mt-4 inline-flex h-10 min-w-[150px] items-center justify-center rounded-lg border border-[#3A4048] px-4 text-[15px] font-medium text-[#E6E6E6] transition-colors hover:border-[#9AA3AD]"
                  >
                    {module.cta}
                  </PricingCheckoutButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-5 py-6 sm:px-6 sm:py-7">
          <h2 className="text-[22px] font-semibold text-[#E6E6E6]">Tier Comparison</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#3A4048] text-[#9AA3AD]">
                  <th className="pb-2 pr-4 font-medium">Feature</th>
                  <th className="pb-2 pr-4 font-medium">Free</th>
                  <th className="pb-2 pr-4 font-medium">Standard</th>
                  <th className="pb-2 font-medium">Control Plane</th>
                </tr>
              </thead>
              <tbody className="text-[#C7CDD4]">
                {[
                  ["Triage", "Yes", "Yes", "Yes"],
                  ["Reliability Score", "Basic", "Full", "Full"],
                  ["Runtime Hygiene", "Limited", "Yes", "Yes"],
                  ["Protection Events", "No", "Yes", "Yes"],
                  ["Recovery Readiness", "Simulation", "Guided", "Deterministic"],
                  ["Recovery Automation", "No", "No", "Yes"],
                  ["Control Plane Visibility", "No", "Partial", "Full"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-[#3A4048] last:border-b-0">
                    <td className="py-2 pr-4 text-[#E6E6E6]">{row[0]}</td>
                    <td className="py-2 pr-4">{row[1]}</td>
                    <td className="py-2 pr-4">{row[2]}</td>
                    <td className="py-2">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-5 py-6 sm:px-6 sm:py-7">
          <h2 className="text-[22px] font-semibold text-[#E6E6E6]">Operator Adoption Pattern</h2>
          <p className="mt-3 max-w-[78ch] text-[16px] leading-7 text-[#C7CDD4]">
            Most operators begin with Triage. From there, systems naturally adopt additional utilities as
            reliability requirements increase. You do not need to commit to the full platform on day one.
          </p>
        </section>
      </main>
    </div>
  );
}
