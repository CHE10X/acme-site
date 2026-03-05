import PricingCheckoutButton from "../components/PricingCheckoutButton";
import { fetchPrices } from "../lib/fetchPrices";
import { SUPPORT_EMAIL } from "../lib/stripeProducts";

export default async function PricingPage() {
  const PRICES = await fetchPrices();
  const checkoutAvailable = Boolean(process.env.STRIPE_SECRET_KEY);
  const runtimeLine = "per runtime / month";

  const fallbackCta = (
    <div className="mt-4 space-y-2 text-sm">
      <div className="text-zinc-300">Checkout unavailable on this deployment.</div>
      <a
        href={`mailto:${SUPPORT_EMAIL}?subject=ACME%20Pricing%20Early%20Access`}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-2 text-zinc-200 transition hover:border-zinc-500 hover:text-zinc-100"
      >
        Contact support for early access
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:gap-12">
        <div className="rounded-2xl border border-zinc-700/90 bg-zinc-900/80 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400 mb-2">
            ACME Agent Supply Co.
          </div>
          <h1 className="text-3xl font-bold text-zinc-100 mb-3">Modules</h1>
          <p className="text-zinc-300">
            A clear path from scan-time evidence to continuous protection.
          </p>
        </div>

        {/* Section A — Start Free */}
        <section className="order-2 rounded-2xl border-t border-zinc-700/80 bg-zinc-900/75 px-6 py-6 md:order-1">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-300">
            Start Free
          </div>
          <p className="mt-2 text-sm text-zinc-300">
            Read-only evidence tools to understand system risk before enabling
            continuous protection.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "RadCheck",
                unit: "RADIATION SCAN UNIT",
                tier: "FREE",
                price: PRICES["free"],
              },
              {
                title: "Lazarus Lite",
                unit: "REANIMATION UNIT",
                tier: "FREE",
                price: PRICES["free"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-700/90 bg-zinc-800/70 px-5 py-5 transition hover:border-zinc-600/90 hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                      {item.unit}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
                      {item.title}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-zinc-200">
                      {item.price} {runtimeLine}
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/80 border border-white/10 bg-white/5 px-2 py-1 rounded-full">
                    {item.tier}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section B — Standard Issue Modules */}
        <section className="order-1 rounded-2xl border-t border-zinc-700/80 bg-zinc-900/75 px-6 py-6 md:order-2">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-300">
                Standard Issue Modules
              </div>
              <p className="mt-2 text-sm text-zinc-300">
                Runtime ={" "}
                <span
                  className="text-zinc-200"
                  title="Runtime means one active OpenClaw agent host."
                >
                  one active OpenClaw agent host
                </span>
                .
              </p>
              <div className="mt-3 text-sm text-zinc-200">
                Operator purchase - runs in your environment
              </div>
              <div className="mt-1 text-sm text-zinc-300">
                You remain in full control. No hosted lock-in. No hidden telemetry.
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="order-first rounded-2xl border border-amber-400/20 bg-amber-500/5 px-6 py-6 lg:col-span-2 lg:col-start-2 lg:row-span-1 lg:translate-y-[-4px] lg:order-1">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-300">
                  Operator Kit
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-amber-300 border border-amber-400/30 bg-amber-500/10 px-2 py-1 rounded-full">
                  MOST COMMON LOADOUT
                </div>
              </div>
              <div className="mt-3 text-sm text-zinc-400">
                Includes 5 core reliability modules
              </div>
              <div className="mt-3 text-sm font-semibold text-zinc-200">
                {PRICES["operator-kit"]} {runtimeLine}
              </div>
              <div className="mt-4 space-y-2 text-sm text-zinc-300">
                <div>• Sentinel</div>
                <div>• Watchdog — Included as part of the reliability foundation.</div>
                <div>• SphinxGate</div>
                <div>• DriftGuard</div>
                <div>• Transmission</div>
              </div>
              {checkoutAvailable ? (
                <PricingCheckoutButton
                  productKey="operator-kit"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-amber-300/40 bg-amber-400/12 px-4 py-2 text-sm font-medium text-amber-100 transition hover:border-amber-200/50 hover:bg-amber-400/16"
                >
                  Get Operator Kit
                </PricingCheckoutButton>
              ) : (
                fallbackCta
              )}
            </div>

            <div className="relative rounded-xl border border-amber-400/45 bg-zinc-800/75 px-5 py-5 lg:order-2">
              <div className="absolute top-4 right-4 text-[10px] tracking-[0.28em] uppercase bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                Continuous Guardrails
              </div>
              <div className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
                Sentinel
              </div>
              <p className="mt-2 text-sm text-zinc-200">
                Always-on protection that flags trouble early and keeps
                instability from growing quietly.
              </p>
              <div className="mt-2 text-sm font-semibold text-zinc-200">
                {PRICES["sentinel"]} {runtimeLine}
              </div>
              {checkoutAvailable ? (
                <PricingCheckoutButton
                  productKey="sentinel"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                >
                  Enable Sentinel
                </PricingCheckoutButton>
              ) : (
                fallbackCta
              )}
              <div className="mt-4 border-t border-amber-400/20 pt-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300">
                  Proof Artifacts
                </div>
                <div className="mt-2 text-xs text-zinc-400">
                  What Sentinel produces while it’s guarding.
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[11px] text-zinc-300">
                  <li>Guardrail events (operator-readable)</li>
                  <li>Silent failure flags</li>
                  <li>Proof bundle snapshots</li>
                  <li>Protection history markers</li>
                  <li>Early trouble signals</li>
                </ul>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  Evidence you can save, share, and audit. Observational by
                  design.
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-700/90 bg-zinc-800/65 px-5 py-5 transition hover:border-zinc-600/90 hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)] lg:order-3">
              <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                Policy Enforcement
              </div>
              <div className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
                SphinxGate
              </div>
              <p className="mt-2 text-sm text-zinc-200">
                Token discipline and lane enforcement with audit-friendly
                routing history.
              </p>
              <div className="mt-2 text-sm font-semibold text-zinc-200">
                {PRICES["sphinxgate"]} {runtimeLine}
              </div>
              {checkoutAvailable ? (
                <PricingCheckoutButton
                  productKey="sphinxgate"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
                >
                  Enable SphinxGate
                </PricingCheckoutButton>
              ) : (
                fallbackCta
              )}
            </div>

            <div className="rounded-xl border border-zinc-700/90 bg-zinc-800/65 px-5 py-5 transition hover:border-zinc-600/90 hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)] lg:order-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                    Drift Monitoring
                  </div>
                  <div className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
                    DriftGuard
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 border border-zinc-700/80 bg-zinc-900/70 px-2 py-1 rounded-full">
                  Advanced
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-200">
                Long-horizon drift signals and audit-ready traces.
              </p>
              <div className="mt-2 text-sm font-semibold text-zinc-200">
                {PRICES["driftguard"]} {runtimeLine}
              </div>
              {checkoutAvailable ? (
                <PricingCheckoutButton
                  productKey="driftguard"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
                >
                  Enable DriftGuard
                </PricingCheckoutButton>
              ) : (
                fallbackCta
              )}
            </div>

            <div className="rounded-xl border border-zinc-700/90 bg-zinc-800/65 px-5 py-5 transition hover:border-zinc-600/90 hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)] lg:order-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-400">
                    Signal Routing
                  </div>
                  <div className="mt-2 text-lg font-semibold text-zinc-100 md:text-xl">
                    Transmission
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-400 border border-zinc-700/80 bg-zinc-900/70 px-2 py-1 rounded-full">
                  Advanced / multi-agent
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-200">
                Multi-agent routing guardrails and priority rules.
              </p>
              <div className="mt-2 text-sm font-semibold text-zinc-200">
                {PRICES["transmission"]} {runtimeLine}
              </div>
              {checkoutAvailable ? (
                <PricingCheckoutButton
                  productKey="transmission"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
                >
                  Enable Transmission
                </PricingCheckoutButton>
              ) : (
                fallbackCta
              )}
            </div>
          </div>
        </section>

        {/* Section D — Agent911 */}
        <section className="order-3 rounded-2xl border-t border-zinc-700/80 bg-zinc-900/75 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-zinc-300">
            Agent911
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-100">
            The control plane for agent reliability.
          </h2>
          <p className="mt-3 text-[15px] text-zinc-200 leading-relaxed">
            Agent911 unifies system stability, Sentinel protection activity, and
            FindMyAgent visibility into one operational surface — so you know
            what your agents are doing, and when to act.
          </p>
          <div className="mt-3 text-sm font-semibold text-zinc-200">
            {PRICES["agent911"]} {runtimeLine}
          </div>
          <ul className="mt-4 space-y-2 text-[15px] text-zinc-200">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>unified reliability snapshot</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>FindMyAgent visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>protection proofs and history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>guided triage workflows</span>
            </li>
          </ul>
          <div className="mt-4 text-xs uppercase tracking-[0.28em] text-zinc-500">
            Observational by design. No autonomous changes.
          </div>
          {checkoutAvailable ? (
            <PricingCheckoutButton
              productKey="agent911"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
            >
              Enable Agent911
            </PricingCheckoutButton>
          ) : (
            fallbackCta
          )}
        </section>
      </main>
    </div>
  );
}
