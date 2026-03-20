import type { NextConfig } from "next";

// Product doc directories that have only an overview.md — redirect /docs/product → /docs/product/overview
const DOC_PRODUCTS = [
  "sentinel", "watchdog", "lazarus", "agent911", "recall",
  "infrawatch", "sphinxgate", "transmission", "operator-bundle",
  "orp", "triage", "quickstart", "architecture",
];

const nextConfig: NextConfig = {
  // NOTE: output:"export" removed to enable API routes (checkout, stripe/health)
  // Add back for static site generation / Vercel static deploy if needed
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return DOC_PRODUCTS.map((product) => ({
      source: `/docs/${product}`,
      destination: `/docs/${product}/overview`,
      permanent: false,
    }));
  },
};

export default nextConfig;
