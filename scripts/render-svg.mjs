#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIAGRAM_DIR = path.join(ROOT, "public", "diagrams");
const TARGET_WIDTH = 2400;

function renderSvgToPng(svgFilename, pngFilename) {
  const svgPath = path.join(DIAGRAM_DIR, svgFilename);
  if (!fs.existsSync(svgPath)) {
    console.warn(`skip: ${svgFilename} not found`);
    return;
  }

  const svg = fs.readFileSync(svgPath, "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: TARGET_WIDTH },
    font: { loadSystemFonts: true },
  });
  const pngData = resvg.render().asPng();

  const outPath = path.join(DIAGRAM_DIR, pngFilename);
  fs.writeFileSync(outPath, pngData);
  console.log(`wrote ${path.relative(ROOT, outPath)} (${TARGET_WIDTH}px wide)`);
}

renderSvgToPng("openclaw-stack.svg", "openclaw-stack.png");
renderSvgToPng("openclaw-stack-dark.svg", "openclaw-stack-dark.png");
