import Link from "next/link";

type SiteFooterProps = {
  showRefund: boolean;
};

export default function SiteFooter({ showRefund }: SiteFooterProps) {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 sm:hidden">
          <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">Launch Docs</div>
          <p className="mt-2 text-sm text-zinc-300">
            Start here. Field guides and first-response doctrine.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
            >
              Open Docs
            </Link>
            <Link
              href="/support/first-response"
              className="inline-flex items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              Start with Triage
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 sm:mt-0 lg:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400">ACME Agent Supply Co.</div>
            <p className="mt-2 text-sm text-zinc-400">
              Field supply for autonomous builders. Tools to keep your agents predictable when real workloads begin.
            </p>
          </div>

          <nav aria-label="Primary footer navigation" className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">Primary</div>
            <Link href="/pricing" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Pricing</Link>
            <Link href="/docs" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Docs</Link>
            <Link href="/support" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Support</Link>
            <Link href="/bot-shop" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Bot Shop</Link>
            <Link href="/operators-tale" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Operator&apos;s Tale</Link>
          </nav>

          <nav aria-label="Legal footer navigation" className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">Legal</div>
            <Link href="/legal/terms-of-service" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Terms</Link>
            <Link href="/legal/privacy-policy" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Privacy</Link>
            {showRefund ? (
              <Link href="/legal/refund-policy" className="block rounded px-1 py-1 text-sm text-zinc-300 transition-colors hover:text-zinc-100">Refund</Link>
            ) : null}
          </nav>
        </div>

        <div className="mt-8 border-t border-zinc-800/80 pt-4 text-xs text-zinc-500">
          © 2026 ACME Agent Supply Co.
        </div>
      </div>
    </footer>
  );
}
