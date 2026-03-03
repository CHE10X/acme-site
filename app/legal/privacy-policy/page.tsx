import type { Metadata } from "next";
import { LegalDocumentPage } from "../LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Policy — ACME Agent Supply Co.",
  description: "Privacy Policy for ACME Agent Supply Co. products and services.",
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentPage slug="privacy-policy" />;
}
