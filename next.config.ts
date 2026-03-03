import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/acme-site";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild
    ? {
        basePath: repoBasePath,
        assetPrefix: repoBasePath,
      }
    : {}),
};

export default nextConfig;
