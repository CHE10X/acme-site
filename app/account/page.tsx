import Link from "next/link";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import {
  getEntitlementByCustomerId,
  getEntitlementByEmail,
  parseEntitlements,
} from "../lib/entitlementsStore";

type AccountPageProps = {
  searchParams: Promise<{
    email?: string;
    customer?: string;
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const email = params.email?.trim().toLowerCase() ?? "";
  const customerId = params.customer?.trim() ?? "";
  const record = customerId
    ? await getEntitlementByCustomerId(customerId)
    : email
      ? await getEntitlementByEmail(email)
      : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-6">
          <div className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">
            Account
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-zinc-100">
            Subscription status
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">
            Until sign-in exists, look up billing status by the operator email used
            at checkout or by Stripe customer ID.
          </p>

          <form action="/account" className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-400">Billing email</span>
              <input
                type="email"
                name="email"
                defaultValue={email}
                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-amber-400/40"
                placeholder="operator@company.com"
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-lg border border-white/10 px-4 text-sm text-zinc-200 transition hover:border-white/20 hover:text-zinc-100"
              >
                Look up status
              </button>
            </div>
          </form>

          {record ? (
            <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-zinc-400">Current plan</div>
                  <div className="mt-2 text-2xl font-semibold text-zinc-100">
                    {record.tier ? `${record.tier} subscription` : "Subscription"}
                  </div>
                  <div className="mt-2 text-sm text-zinc-300">
                    Status: <span className="text-zinc-100">{record.status}</span>
                  </div>
                </div>
                <div className="text-sm text-zinc-400">
                  Updated {new Date(record.updated_at).toLocaleString()}
                </div>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-zinc-500">Stripe customer</dt>
                  <dd className="mt-1 break-all text-sm text-zinc-200">
                    {record.stripe_customer_id}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-zinc-500">Period end</dt>
                  <dd className="mt-1 text-sm text-zinc-200">
                    {record.current_period_end
                      ? new Date(record.current_period_end).toLocaleString()
                      : "Not available"}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <div className="text-sm text-zinc-400">Entitlements</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {parseEntitlements(record.entitlements_json).map((entitlement) => (
                    <span
                      key={entitlement}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                    >
                      {entitlement}
                    </span>
                  ))}
                </div>
              </div>

              <ManageSubscriptionButton
                customerId={record.stripe_customer_id}
                email={record.customer_email}
              />
            </div>
          ) : email || customerId ? (
            <div className="mt-8 rounded-xl border border-amber-400/20 bg-amber-500/5 p-5 text-sm text-zinc-300">
              No subscription record was found for that lookup yet. If checkout
              completed recently, wait for the Stripe webhook or contact support.
            </div>
          ) : null}

          <div className="mt-8 text-sm text-zinc-400">
            <Link href="/pricing" className="text-zinc-200 underline underline-offset-4">
              Return to pricing
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
