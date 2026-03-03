import type { Metadata } from "next";
import Link from "next/link";
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
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950">
        {/* Site Header */}
        <header className="border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
              href="/"
              className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors tracking-wide uppercase"
            >
              ACME
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/support"
                className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Support
              </Link>
              <Link
                href="/docs"
                className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Docs
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        {children}

        {/* Site Footer */}
        <footer className="border-t border-zinc-800/80 bg-zinc-950 px-6 py-10 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-8 md:flex-row md:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-amber-400 mb-1">
                  ACME Agent Supply Co.
                </div>
                <div className="text-xs text-zinc-500 max-w-xs">
                  Field supply for autonomous builders. Tools to keep your
                  agents predictable when real workloads begin.
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4">
                  Launch Docs
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/docs/radcheck/score-explained"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      RadCheck — Score Explained
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/sentinel/overview"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Sentinel — Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/sphinxgate/overview"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      SphinxGate — Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/agent911/snapshot-explained"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Agent911 — Snapshot Explained
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4">
                  Support
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-4 text-center text-xs text-zinc-500">
              <span>© 2026 Acme Agent Supply Co.</span>
              <span className="px-2 text-zinc-600">·</span>
              <Link
                href="/legal/terms-of-service"
                className="transition-colors hover:text-zinc-300"
              >
                Terms
              </Link>
              <span className="px-2 text-zinc-600">·</span>
              <Link
                href="/legal/privacy-policy"
                className="transition-colors hover:text-zinc-300"
              >
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
