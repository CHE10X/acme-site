import type { Metadata } from "next";
import { LegalDocumentPage } from "../LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms of Service — ACME Agent Supply Co.",
  description: "Terms of Service for ACME Agent Supply Co. products and services.",
};

export default function TermsOfServicePage() {
  return <LegalDocumentPage slug="terms-of-service" />;
}
