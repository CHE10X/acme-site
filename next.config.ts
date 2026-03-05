import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: output:"export" removed to enable API routes (checkout, stripe/health)
  // Add back for static site generation / Vercel static deploy if needed
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
