import fs from "fs";
import path from "path";
import { marked } from "marked";

type LegalDocument = {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
  html: string;
};

const LEGAL_DIR = path.join(process.cwd(), "legal");

function parseFrontmatter(raw: string): { title?: string; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { body: raw };
  const titleMatch = match[1].match(/^title:\s*(.+)$/m);
  return { title: titleMatch?.[1]?.trim(), body: match[2] };
}

function extractHeaderFields(body: string, fallbackTitle?: string) {
  const lines = body.split(/\r?\n/);
  let index = 0;

  while (lines[index]?.trim() === "") index += 1;

  let title = fallbackTitle ?? "";
  const headingMatch = lines[index]?.match(/^#\s+(.+)$/);
  if (headingMatch) {
    title = headingMatch[1].trim();
    index += 1;
  }

  while (lines[index]?.trim() === "") index += 1;

  let effectiveDate: string | undefined;
  let lastUpdated: string | undefined;

  while (index < lines.length) {
    const line = lines[index].trim();
    const boldMatch = line.match(/^\*\*(.+?)\*\*$/);

    if (!boldMatch) break;

    const text = boldMatch[1].trim();
    if (text.toLowerCase().startsWith("effective date:")) {
      effectiveDate = text.replace(/^effective date:\s*/i, "").trim();
      index += 1;
      continue;
    }
    if (text.toLowerCase().startsWith("last updated:")) {
      lastUpdated = text.replace(/^last updated:\s*/i, "").trim();
      index += 1;
      continue;
    }

    break;
  }

  while (lines[index]?.trim() === "") index += 1;

  return {
    title,
    effectiveDate: effectiveDate ?? lastUpdated,
    lastUpdated,
    body: lines.slice(index).join("\n"),
  };
}

export function getLegalDocument(slug: "privacy-policy" | "terms-of-service"): LegalDocument {
  const filePath = path.join(LEGAL_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { title: frontmatterTitle, body } = parseFrontmatter(raw);
  const { title, effectiveDate, lastUpdated, body: contentBody } = extractHeaderFields(
    body,
    frontmatterTitle,
  );

  return {
    title,
    effectiveDate,
    lastUpdated,
    html: marked.parse(contentBody) as string,
  };
}
