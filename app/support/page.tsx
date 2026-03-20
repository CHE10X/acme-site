import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — ACME Agent Supply Co.",
  description: "How ACME handles support for its reliability products.",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[1100px] px-6 py-12 space-y-6">

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-8">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#B8782A] mb-3">Support</div>
          <h1 className="text-[34px] font-semibold text-[#E6E6E6]">How we handle support</h1>
          <p className="mt-4 max-w-[60ch] text-[16px] leading-7 text-[#9AA3AD]">
            ACME supports its own products. When something isn&apos;t working with Triage, RadCheck, Sentinel, Watchdog, Lazarus, Agent911, or Recall — we want to hear about it.
          </p>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-6 text-[#4A5E70]">
            General OpenClaw troubleshooting is outside our scope. For that, the{" "}
            <a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#9AA3AD] transition-colors">
              OpenClaw community
            </a>{" "}
            is the right place.
          </p>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-8">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#5A6A78] mb-4">How it works</div>
          <div className="space-y-6 max-w-[60ch]">
            <div>
              <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD] mb-2">Email us</div>
              <p className="text-[15px] leading-6 text-[#9AA3AD]">
                Tell us what product you&apos;re using, what you expected, and what happened instead. That&apos;s enough to start.{" "}
                <a href="mailto:support@acmeagentsupply.com" className="text-[#B8782A] hover:text-[#D98A2B] transition-colors">
                  support@acmeagentsupply.com
                </a>
              </p>
            </div>
            <div>
              <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD] mb-2">We respond to everything</div>
              <p className="text-[15px] leading-6 text-[#9AA3AD]">
                We review every message. If we need more information, we&apos;ll ask.
              </p>
            </div>
            <div>
              <div className="text-[13px] uppercase tracking-[0.2em] text-[#9AA3AD] mb-2">Paying customers get priority</div>
              <p className="text-[15px] leading-6 text-[#9AA3AD]">
                If you&apos;re on a paid plan, include your license key. Paid customers go to the front of the queue.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-8">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#5A6A78] mb-4">Before you write</div>
          <p className="text-[15px] leading-6 text-[#9AA3AD] max-w-[60ch]">
            Our product docs cover most common questions. Worth a look first.
          </p>
          <div className="mt-4">
            <a
              href="https://docs.acmeagentsupply.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
            >
              Product Docs
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
