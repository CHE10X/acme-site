import type { Metadata } from "next";
import Script from "next/script";
import fs from "node:fs";
import path from "node:path";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACME Agent Supply Co.",
  description:
    "Agent field survival gear. Tools to keep your agents predictable when real workloads begin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refundPolicyExists = fs.existsSync(
    path.join(process.cwd(), "app", "legal", "refund-policy", "page.tsx"),
  );

  return (
    <html lang="en">
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          src="https://plausible.io/js/pa-XwMdQjM6--10FtVB1as-I.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
            plausible.init()
          `}
        </Script>
      </head>
      <body className="antialiased bg-[#1E2226]">
        <SiteHeader />
        {children}
        <SiteFooter showRefund={refundPolicyExists} />
      </body>
    </html>
  );
}
