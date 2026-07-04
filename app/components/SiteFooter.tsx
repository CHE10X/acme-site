import Image from "next/image";
import Link from "next/link";

type SiteFooterProps = {
  showRefund: boolean;
};

export default function SiteFooter({ showRefund }: SiteFooterProps) {
  return (
    <footer className="border-t border-[rgba(26,24,20,0.12)] bg-[#ede9e0] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" aria-label="Council10 home" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/site-brand/council10-wordmark-dark-960.png"
                alt="Council10"
                width={1160}
                height={260}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[32rem] text-[0.98rem] leading-7 text-[#3d3a34]">
              Council10 makes AI initiatives answer for themselves. QuarterMaster is the
              governed execution layer for teams that need agent work to stay attributable,
              controllable, and real.
            </p>
          </div>

          <nav aria-label="Primary footer navigation" className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#7a7569]">
              Navigate
            </div>
            <Link
              href="/"
              className="block text-[13px] uppercase tracking-[0.12em] text-[#1a1814] transition-colors hover:text-[#1d9e75]"
            >
              Council10
            </Link>
            <Link
              href="/quartermaster"
              className="block text-[13px] uppercase tracking-[0.12em] text-[#1a1814] transition-colors hover:text-[#1d9e75]"
            >
              QuarterMaster
            </Link>
            <Link
              href="/docs"
              className="block text-[13px] uppercase tracking-[0.12em] text-[#1a1814] transition-colors hover:text-[#1d9e75]"
            >
              Docs
            </Link>
            <Link
              href="/contact"
              className="block text-[13px] uppercase tracking-[0.12em] text-[#1a1814] transition-colors hover:text-[#1d9e75]"
            >
              Contact
            </Link>
          </nav>

          <nav aria-label="Legal footer navigation" className="space-y-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#7a7569]">
              Legal
            </div>
            <Link
              href="/legal/terms-of-service"
              className="block text-[13px] uppercase tracking-[0.12em] text-[#1a1814] transition-colors hover:text-[#1d9e75]"
            >
              Terms
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="block text-[13px] uppercase tracking-[0.12em] text-[#1a1814] transition-colors hover:text-[#1d9e75]"
            >
              Privacy
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-[rgba(26,24,20,0.12)] pt-5 text-[12px] uppercase tracking-[0.1em] text-[#7a7569]">
          <span>© 2026 Council10</span>
          {showRefund && (
            <Link
              href="/legal/refund-policy"
              className="transition-colors hover:text-[#1a1814]"
            >
              Customer Service
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
