import fs from "node:fs";
import path from "node:path";

export default function InlineReliabilityStackSvg() {
  const svgPath = path.join(
    process.cwd(),
    "public",
    "diagrams",
    "openclaw-reliability-stack.svg",
  );
  const svgMarkup = fs.readFileSync(svgPath, "utf8");

  return (
    <div
      className="[&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-full"
      // SVG is local, trusted, and intentionally inline for selectable text and metadata parsing.
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
