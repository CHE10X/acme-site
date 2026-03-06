import fs from "node:fs";
import path from "node:path";

export type ToolRegistryEntry = {
  slug: string;
  name: string;
  description: string;
  applicationCategory:
    | "DeveloperApplication"
    | "UtilitiesApplication"
    | "SecurityApplication";
  operatingSystem: "Cross-platform" | "Linux, macOS";
  priceUsdMonthly: number;
  free: boolean;
  installCommand: string;
  docsUrl: string;
  repoUrl: string;
  canonicalSourceLockUrl: string;
  latestVersion: string;
  releaseTag: string;
  releaseZipUrl: string;
  sha256: string;
  guarantees: string;
  evidenceRequired: boolean;
};

function readFirstExisting(paths: string[]): string | null {
  for (const filePath of paths) {
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, "utf8").trim();
      }
    } catch {
      continue;
    }
  }
  return null;
}

function readOctriageVersion(): string {
  const raw = readFirstExisting([
    "/Users/AGENT/octriageunit/VERSION",
    path.join(process.cwd(), "VERSION"),
  ]);
  if (!raw) return "unknown";
  return raw.replace(/^v/i, "");
}

function readOctriageSha(version: string): string {
  if (version === "unknown") return "unknown";
  const shaLine = readFirstExisting([
    `/Users/AGENT/octriageunit/dist/octriageunit-v${version}-release.zip.sha256`,
    `/Users/AGENT/octriageunit/dist/octriageunit-${version}-release.zip.sha256`,
  ]);
  if (!shaLine) return "unknown";
  return shaLine.split(/\s+/)[0] || "unknown";
}

function octriageReleaseZip(version: string): string {
  if (version === "unknown") return "unknown";
  return `https://github.com/CHE10X/octriageunit/releases/download/v1.0.0/octriageunit-v${version}-release.zip`;
}

export function getToolRegistry(): ToolRegistryEntry[] {
  const octriageVersion = readOctriageVersion();
  const octriageSha = readOctriageSha(octriageVersion);

  return [
    {
      slug: "octriage",
      name: "OCTriageUnit",
      description:
        "Deterministic triage tool that generates operator-grade proof bundles for OpenClaw environments.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS",
      priceUsdMonthly: 0,
      free: true,
      installCommand:
        "curl -fsSL https://raw.githubusercontent.com/CHE10X/octriageunit/main/install.sh | bash",
      docsUrl: "/docs/quickstart/5-minute",
      repoUrl: "https://github.com/CHE10X/octriageunit",
      canonicalSourceLockUrl:
        "https://github.com/CHE10X/octriageunit/blob/main/OPENCLAW_CANONICAL_SOURCE.md",
      latestVersion: octriageVersion,
      releaseTag: "v1.0.0",
      releaseZipUrl: octriageReleaseZip(octriageVersion),
      sha256: octriageSha,
      guarantees: "Read-only / no telemetry / local-only",
      evidenceRequired: true,
    },
    {
      slug: "radcheck",
      name: "RadCheck",
      description:
        "Reliability verification tool for validating OpenClaw environments before production operation.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Cross-platform",
      priceUsdMonthly: 0,
      free: true,
      installCommand: "See docs: /docs/radcheck/score-explained",
      docsUrl: "/docs/radcheck/score-explained",
      repoUrl: "https://github.com/CHE10X/acme-site",
      canonicalSourceLockUrl:
        "https://github.com/CHE10X/octriageunit/blob/main/OPENCLAW_CANONICAL_SOURCE.md",
      latestVersion: "current",
      releaseTag: "current",
      releaseZipUrl: "n/a",
      sha256: "n/a",
      guarantees: "Read-only / no telemetry / local-only",
      evidenceRequired: true,
    },
    {
      slug: "sentinel",
      name: "Sentinel",
      description:
        "Continuous reliability monitoring layer for OpenClaw agent systems.",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Cross-platform",
      priceUsdMonthly: 5,
      free: false,
      installCommand: "See docs: /docs/sentinel/overview",
      docsUrl: "/docs/sentinel/overview",
      repoUrl: "https://github.com/CHE10X/acme-site",
      canonicalSourceLockUrl:
        "https://github.com/CHE10X/octriageunit/blob/main/OPENCLAW_CANONICAL_SOURCE.md",
      latestVersion: "current",
      releaseTag: "current",
      releaseZipUrl: "n/a",
      sha256: "n/a",
      guarantees: "Read-only / no telemetry / local-only",
      evidenceRequired: true,
    },
  ];
}
