import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { marked } from "marked";

export const metadata: Metadata = {
  title: "Privacy Policy — ACME Agent Supply Co.",
  description: "Privacy Policy for ACME Agent Supply Co.",
};

export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), "legal", "privacy-policy.md");
  const raw = fs.readFileSync(filePath, "utf8");
  const html = marked(raw) as string;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem", fontFamily: "system-ui, sans-serif", color: "#111", lineHeight: 1.7 }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr style={{ marginTop: "3rem", borderColor: "#eee" }} />
      <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "1rem" }}>
        <a href="/legal/terms" style={{ color: "#0070f3" }}>Terms of Service</a>
      </p>
    </div>
  );
}
