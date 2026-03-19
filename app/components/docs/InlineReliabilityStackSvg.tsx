import fs from "node:fs";
import path from "node:path";

export default function InlineReliabilityStackSvg() {
  const assetPath = path.join(
    process.cwd(),
    "public",
    "diagrams",
    "operator-system-view-v6.html", // v6: InfraWatch, REB, SphinxGate Layer 0 — 2026-03-18
  );
  const assetMarkup = fs.readFileSync(assetPath, "utf8");
  const svgMatch = assetMarkup.match(/<svg[\s\S]*<\/svg>/i);
  const svgMarkup = svgMatch ? svgMatch[0] : "";

  return (
    <div
      className="[&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-full"
      // Heike canonical asset is local and intentionally injected inline for selectable text and metadata parsing.
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
