#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SOURCE = path.join(ROOT, "data", "tool-registry.source.yaml");
const OUTPUT = path.join(ROOT, "public", "registry.json");

function stripInlineComment(input) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === "#" && !inSingle && !inDouble) {
      return input.slice(0, i).trimEnd();
    }
  }
  return input;
}

function parseValue(rawValue) {
  const value = stripInlineComment(rawValue).trim();
  if (value === "" || value === "null") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseToolsYaml(yamlText) {
  const lines = yamlText.split(/\r?\n/);
  const tools = [];
  let inTools = false;
  let current = null;

  for (const line of lines) {
    if (!inTools) {
      if (/^tools:\s*$/.test(line)) {
        inTools = true;
      }
      continue;
    }

    if (/^\s*#/.test(line) || /^\s*$/.test(line)) {
      continue;
    }

    const itemStart = line.match(/^\s*-\s+([A-Za-z0-9_-]+):\s*(.*)$/);
    if (itemStart) {
      if (current) tools.push(current);
      current = {};
      current[itemStart[1]] = parseValue(itemStart[2]);
      continue;
    }

    const field = line.match(/^\s+([A-Za-z0-9_-]+):\s*(.*)$/);
    if (field && current) {
      current[field[1]] = parseValue(field[2]);
      continue;
    }

    if (!/^\s/.test(line) && current) {
      tools.push(current);
      current = null;
      break;
    }
  }

  if (current) tools.push(current);
  return tools;
}

function toRegistryTool(tool) {
  return {
    slug: tool.productKey,
    productKey: tool.productKey,
    name: tool.displayName,
    description: tool.description,
    category: tool.category,
    operatingSystem: tool.os,
    repo_url: tool.repo ? `https://github.com/${tool.repo}` : null,
    latest_tag: tool.latest,
    latest_version: tool.version,
    artifact: tool.artifact,
    sha256: tool.sha256,
    install_command: tool.install,
    install_docs: tool.install_docs,
    status: tool.status,
    evidence_required: true,
  };
}

function main() {
  const sourceRaw = fs.readFileSync(SOURCE, "utf8");
  const tools = parseToolsYaml(sourceRaw).map(toRegistryTool);
  const output = {
    name: "ACME Agent Reliability Tools",
    description:
      "Registry of reliability and diagnostic tools for AI agent systems and OpenClaw environments.",
    source: "data/tool-registry.source.yaml",
    generated_at: new Date().toISOString(),
    tools,
  };

  fs.writeFileSync(OUTPUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Generated ${path.relative(ROOT, OUTPUT)} from ${path.relative(ROOT, SOURCE)}`);
}

main();
