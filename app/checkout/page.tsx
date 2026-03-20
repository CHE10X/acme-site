import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started Free — ACME Agent Supply Co.",
  description: "Triage + RadCheck — free software to diagnose and score your agent stack.",
};

export default function CheckoutFreePage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[560px] px-6 py-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B] mb-2">Free Access</div>
        <h1 className="text-[28px] font-semibold text-[#E6E6E6]">Triage + RadCheck</h1>
        <p className="mt-3 text-[15px] text-[#9AA3AD]">
          Free to install. No payment required. Just run.
        </p>

        <div className="mt-8 rounded-[6px] border border-[#2E3640] bg-[#242A30] p-6 space-y-4">
          <div>
            <div className="text-[13px] font-semibold text-[#E6E6E6]">Triage</div>
            <p className="mt-1 text-[13px] text-[#9AA3AD]">First-response diagnostics. Reads directly from the filesystem — no gateway required. Works when OpenClaw doesn't.</p>
          </div>
          <div className="border-t border-[#2E3640] pt-4">
            <div className="text-[13px] font-semibold text-[#E6E6E6]">RadCheck</div>
            <p className="mt-1 text-[13px] text-[#9AA3AD]">Reliability scoring 0–100. Surfaces hidden risk before it becomes an incident.</p>
          </div>
        </div>

        <div className="mt-8 rounded-[6px] border border-[#2E3640] bg-[#1A2028] p-5">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#5A6E80] mb-3">Terms of Use</div>
          <p className="text-[13px] leading-6 text-[#9AA3AD]">
            Triage and RadCheck are provided free of charge for personal and commercial use under the{" "}
            <Link href="/legal/terms-of-service" className="text-[#D98A2B] hover:text-[#C47A22] transition">
              ACME Agent Supply Co. Terms of Service
            </Link>
            . By continuing, you agree to those terms.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/install"
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[#E6E6E6] text-[15px] font-medium text-[#1E2226] transition hover:bg-[#D0D0D0]"
          >
            I agree — take me to the install guide
          </Link>
          <Link
            href="/pricing"
            className="flex h-10 w-full items-center justify-center rounded-lg border border-[#3A4048] text-[14px] text-[#5A6E80] transition hover:text-[#9AA3AD]"
          >
            Back to pricing
          </Link>
        </div>
      </main>
    </div>
  );
}
