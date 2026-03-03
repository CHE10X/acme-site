import { Suspense } from "react";
import CheckoutStatus from "../CheckoutStatus";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-6">
          <Suspense fallback={<div className="text-sm text-zinc-300">Loading purchase details...</div>}>
            <CheckoutStatus type="success" />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
