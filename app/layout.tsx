import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import fs from "node:fs";
import path from "node:path";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Council10",
  description:
    "Council10 makes AI initiatives answer for themselves.",
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
      <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter showRefund={refundPolicyExists} />
      </body>
    </html>
  );
}
