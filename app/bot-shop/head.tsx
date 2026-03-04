const toolCatalog = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "ACME Agent Reliability Tools",
  description:
    "Registry of reliability and diagnostic tools for AI agent systems and OpenClaw environments.",
  keywords: [
    "AI agents",
    "multi-agent systems",
    "OpenClaw",
    "agent reliability",
    "AI diagnostics",
    "agent orchestration debugging",
  ],
  itemListElement: [
    {
      "@type": "SoftwareSourceCode",
      name: "OCTriageUnit",
      description:
        "Deterministic triage tool that generates operator-grade proof bundles for OpenClaw environments.",
      applicationCategory: "AI agent diagnostics",
      url: "/bot-shop/#octriage",
      license: "Apache-2.0",
    },
    {
      "@type": "SoftwareApplication",
      name: "RadCheck",
      description:
        "Reliability verification tool for validating OpenClaw environments before production operation.",
      applicationCategory: "AI agent reliability validation",
      url: "/bot-shop/#radcheck",
    },
    {
      "@type": "SoftwareApplication",
      name: "Sentinel",
      description:
        "Continuous reliability monitoring layer for OpenClaw agent systems.",
      applicationCategory: "AI agent operational monitoring",
      url: "/bot-shop/#sentinel",
    },
  ],
};

export default function Head() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolCatalog) }}
      />
    </>
  );
}
