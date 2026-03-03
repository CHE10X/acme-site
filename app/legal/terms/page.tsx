import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { marked } from "marked";

export const metadata: Metadata = {
  title: "Terms of Service — ACME Agent Supply Co.",
  description: "Terms of Service for ACME Agent Supply Co.",
};

export default function TermsPage() {
  // Note: filename has a leading space (GitHub rename artifact)
  const filePath = path.join(process.cwd(), "legal", " terms-of-service.md");
  const raw = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : fs.readFileSync(path.join(process.cwd(), "legal", "terms-of-service.md"), "utf8");
  const html = marked(raw) as string;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem", fontFamily: "system-ui, sans-serif", color: "#111", lineHeight: 1.7 }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr style={{ marginTop: "3rem", borderColor: "#eee" }} />
      <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "1rem" }}>
        <a href="/legal/privacy" style={{ color: "#0070f3" }}>Privacy Policy</a>
      </p>
    </div>
  );
}
