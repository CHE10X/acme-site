import Link from "next/link";

type SiteFooterProps = {
  showRefund: boolean;
};

export default function SiteFooter({ showRefund }: SiteFooterProps) {
  return (
    <footer className="border-t border-[#3A4048] bg-[#1E2226] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-[#3A4048] bg-[#242A30] p-4 sm:hidden">
          <div className="text-[13px] uppercase tracking-[0.28em] text-[#9AA3AD]">Launch Docs</div>
          <p className="mt-2 text-[18px] text-[#E6E6E6]">
            Start here. Field guides and first-response doctrine.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center rounded-lg bg-[#D98A2B] px-4 py-2 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
            >
              Open Docs
            </Link>
            <Link
              href="/support/first-response"
              className="inline-flex items-center rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
            >
              Start with Triage
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 sm:mt-0 lg:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[13px] uppercase tracking-[0.32em] text-[#D98A2B]">ACME Agent Supply Co.</div>
            <p className="mt-2 text-[18px] text-[#9AA3AD]">
              Field supply for autonomous builders. Tools to keep your agents predictable when real workloads begin.
            </p>
          </div>

          <nav aria-label="Primary footer navigation" className="space-y-2">
            <div className="text-[13px] uppercase tracking-[0.28em] text-[#9AA3AD]">Primary</div>
            <Link href="/pricing" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Pricing</Link>
            <Link href="/docs" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Docs</Link>
            <Link href="/support" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Support</Link>
            <Link href="/bot-shop" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Operator Utilities</Link>
            <Link href="/operators-tale" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Operator&apos;s Tale</Link>
          </nav>

          <nav aria-label="Legal footer navigation" className="space-y-2">
            <div className="text-[13px] uppercase tracking-[0.28em] text-[#9AA3AD]">Legal</div>
            <Link href="/legal/terms-of-service" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Terms</Link>
            <Link href="/legal/privacy-policy" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Privacy</Link>
            {showRefund ? (
              <Link href="/legal/refund-policy" className="block rounded px-1 py-1 text-[15px] text-[#E6E6E6] transition-colors hover:text-[#D98A2B]">Refund</Link>
            ) : null}
          </nav>
        </div>

        <div className="mt-8 border-t border-[#3A4048] pt-4 text-[13px] text-[#9AA3AD]">
          © 2026 ACME Agent Supply Co.
        </div>
      </div>
    </footer>
  );
}
