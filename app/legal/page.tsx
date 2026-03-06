import Link from "next/link";

export default function LegalIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-6 py-8 shadow-[0_0_0_1px_rgba(251,191,36,0.05)]">
          <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-amber-400">
            ACME Agent Supply Co.
          </div>
          <h1 className="mb-3 text-3xl font-bold text-zinc-100">Legal</h1>
          <p className="mb-6 max-w-2xl text-sm leading-7 text-zinc-400">
            Reference copies of the site privacy policy and terms of service.
          </p>
          <div className="flex flex-col gap-3 text-sm text-zinc-300">
            <Link
              href="/legal/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-service"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
