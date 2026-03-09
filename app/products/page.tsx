import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — ACME Agent Supply Co.",
  description: "Reliability and diagnostic tools for AI agent operators.",
};

const products = [
  {
    href: "/products/octriageunit",
    name: "OpenClaw Triage Unit",
    tag: "Operator Service",
    description:
      "Read-only triage workflow for degraded OpenClaw environments. Snapshot, diagnose, and generate proof bundles without touching live state.",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#e8a317]">
            Product Catalog
          </div>
          <h1 className="mt-3 text-3xl font-bold text-[#E6E6E6] md:text-4xl">
            ACME Agent Supply Tools
          </h1>
          <p className="mt-4 text-[#9AA3AD] max-w-xl">
            Reliability, diagnostics, and recovery infrastructure for operators running AI agent systems.
          </p>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group block rounded-xl border border-[#3A4048] bg-[#242A30] p-6 transition-colors hover:border-[#e8a317]/40 hover:bg-[#2C3238]"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] text-[#e8a317]">
                {product.tag}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-[#E6E6E6] group-hover:text-white">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-[#9AA3AD]">{product.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
