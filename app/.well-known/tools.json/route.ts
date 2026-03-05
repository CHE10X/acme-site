import { NextResponse } from "next/server";
import { getToolRegistry } from "../../bot-shop/toolRegistry";

export const revalidate = 3600;

export function GET() {
  const tools = getToolRegistry().map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    install_url: tool.installCommand,
    docs_url: tool.docsUrl,
    repo_url: tool.repoUrl,
    latest_version: tool.latestVersion,
    sha256: tool.sha256,
    license: tool.slug === "octriage" ? "Apache-2.0" : "Proprietary/Service",
    evidence_required: tool.evidenceRequired,
    release_tag: tool.releaseTag,
    release_zip: tool.releaseZipUrl,
  }));

  return NextResponse.json({
    name: "ACME Agent Reliability Tools",
    description:
      "Registry of reliability and diagnostic tools for AI agent systems and OpenClaw environments.",
    tools,
  });
}
