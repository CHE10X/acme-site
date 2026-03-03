import type { Metadata } from "next";
import { LegalDocumentPage } from "../LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms of Service — Acme Agent Supply Co.",
  description: "Terms of Service for Acme Agent Supply Co.",
};

export default function TermsOfServicePage() {
  return <LegalDocumentPage slug="terms-of-service" />;
}
