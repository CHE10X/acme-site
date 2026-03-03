import type { Metadata } from "next";
import { LegalDocumentPage } from "../LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Acme Agent Supply Co.",
  description: "Privacy Policy for Acme Agent Supply Co.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage slug="privacy-policy" />;
}
