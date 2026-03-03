import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme Agent Supply Co.",
  description: "Terms of Service and Privacy Policy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <footer className="px-5 pb-8 text-center text-xs text-neutral-500 md:px-6">
          <span>© 2026 Acme Agent Supply Co.</span>
          <span className="px-2 text-neutral-300">·</span>
          <a
            href="/legal/terms-of-service"
            className="underline decoration-neutral-300 underline-offset-4 hover:opacity-90"
          >
            Terms
          </a>
          <span className="px-2 text-neutral-300">·</span>
          <a
            href="/legal/privacy-policy"
            className="underline decoration-neutral-300 underline-offset-4 hover:opacity-90"
          >
            Privacy
          </a>
        </footer>
      </body>
    </html>
  );
}
