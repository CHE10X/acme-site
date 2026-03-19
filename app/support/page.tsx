import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[1100px] px-6 py-12">

        {/* Hero */}
        <section className="rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#B8782A]">Support</div>
          <h1 className="mt-2 text-[34px] font-semibold text-[#E6E6E6]">
            When something feels off
          </h1>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-7 text-[#9AA3AD]">
            Start with evidence. Run a support bundle, then send it with a short description of what you observed.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/support/first-response"
              className="inline-flex items-center gap-2 rounded-lg bg-[#B8782A] px-4 py-2 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#A06820]"
            >
              First Response Guide
            </Link>
            <Link
              href="/docs/support/when-things-feel-off"
              className="inline-flex items-center gap-2 rounded-lg border border-[#3A4048] px-4 py-2 text-[15px] text-[#E6E6E6] transition hover:border-[#9AA3AD]"
            >
              Run Support Bundle
            </Link>
          </div>
        </section>

        {/* How to get help */}
        <section className="mt-6 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
          <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">How to get help</div>
          <div className="mt-4 space-y-5">
            <div>
              <div className="text-[13px] uppercase tracking-[0.22em] text-[#5A7080]">Step 1 — Generate a bundle</div>
              <div className="mt-2 rounded-lg bg-[#161A1E] px-4 py-3 font-mono text-[15px] text-[#B8782A]">
                acme_support_bundle.py -zip
              </div>
              <p className="mt-2 text-[14px] text-[#6A7A88]">Read-only. No system changes. Secrets redacted automatically.</p>
            </div>
            <div>
              <div className="text-[13px] uppercase tracking-[0.22em] text-[#5A7080]">Step 2 — Email us</div>
              <p className="mt-2 text-[15px] text-[#E6E6E6]">
                Attach the zip and describe what you observed.{" "}
                <a href="mailto:support@acmeagentsupply.com" className="text-[#B8782A] hover:text-[#A06820] transition">
                  support@acmeagentsupply.com
                </a>
              </p>
            </div>
            <div>
              <div className="text-[13px] uppercase tracking-[0.22em] text-[#5A7080]">Step 3 — We respond</div>
              <p className="mt-2 text-[15px] text-[#9AA3AD]">
                We review the bundle and reply with next steps. No guessing, no back-and-forth asking for screenshots.
              </p>
            </div>
          </div>
        </section>

        {/* What's in the bundle */}
        <section
          id="support-contents"
          className="mt-6 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6"
        >
          <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">What the bundle captures</div>
          <ul className="mt-4 space-y-2 text-[15px] text-[#9AA3AD]">
            <li>· Agent911 snapshot</li>
            <li>· Recent ops events</li>
            <li>· Routing and protection posture</li>
            <li>· Compaction signals</li>
            <li>· Redacted logs — secrets never included</li>
          </ul>
          <p className="mt-4 text-[13px] text-[#4A5E70]">
            Observational only. No configuration changes are performed.
          </p>
        </section>

        {/* Docs */}
        <section className="mt-6 rounded-[6px] border border-[#3A4048] bg-[#242A30] px-6 py-6">
          <div className="text-[13px] uppercase tracking-[0.32em] text-[#9AA3AD]">Documentation</div>
          <p className="mt-3 text-[15px] text-[#9AA3AD]">
            Most issues are documented. Check the docs before opening a support ticket.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/docs" className="text-[15px] text-[#B8782A] hover:text-[#A06820] transition">
              Docs →
            </Link>
            <Link href="/support/first-response" className="text-[15px] text-[#6A7A88] hover:text-[#9AA3AD] transition">
              First Response Guide →
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
