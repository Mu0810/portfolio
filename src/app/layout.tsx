import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Three typefaces, each with a job:
 *  - Instrument Serif for display. High-contrast, slightly narrow, editorial —
 *    it gives the page a voice that a UI sans cannot.
 *  - Inter Tight for body copy. Tighter than Inter, so it sits under a serif
 *    display without looking like a different website.
 *  - JetBrains Mono for metadata, numbers and labels.
 */
const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The canonical production origin, as a literal.
 *
 * A social card is scraped once and cached by the platform, so the absolute URL it
 * carries has to be one stable address that the public can actually reach. Neither
 * Vercel-provided variable satisfies that on this project, and both were tried:
 *
 *  - `VERCEL_URL` is a different hostname on every deployment, so og:url pointed at
 *    an ephemeral build.
 *  - `VERCEL_PROJECT_PRODUCTION_URL` resolves here to
 *    protfolio-g9rz35q91-…vercel.app, which is behind Vercel's deployment
 *    protection and 302s to vercel.com/login. A scraper following it gets a login
 *    page, not the site.
 *
 * So the literal is authoritative and neither var is consulted. Change this line
 * when the site moves (a custom domain, or a renamed Vercel project);
 * `NEXT_PUBLIC_SITE_URL` overrides it without a code change, and unlike the two
 * above it is set deliberately rather than injected by the platform.
 */
const CANONICAL_SITE_URL = "https://protfolio-tau-taupe.vercel.app";

// Resolve the canonical site URL for absolute OG/Twitter/canonical links.
// Accepts NEXT_PUBLIC_SITE_URL with or without a protocol, falls back to the
// literal above, and never throws — a bad value must not break the build.
function resolveSiteUrl(): URL {
  const fallback = new URL(CANONICAL_SITE_URL);
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return fallback;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol);
  } catch {
    return fallback;
  }
}

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: "Manish Kumar Soni — Software Engineer",
  description:
    "Portfolio of Manish Kumar Soni — a final-year B.Tech student and full-stack engineer building typed, tested systems with Next.js, Node, PostgreSQL and applied AI. Open to New Grad 2027 roles.",
  keywords: [
    "Manish Kumar Soni",
    "software engineer",
    "full-stack developer",
    "new grad 2027",
    "portfolio",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Manish Kumar Soni" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Manish Kumar Soni — Software Engineer",
    description:
      "Full-stack engineer building typed, tested systems with Next.js, Node and PostgreSQL. Open to New Grad 2027 roles.",
    url: "/",
    siteName: "Manish Kumar Soni",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manish Kumar Soni — Software Engineer",
    description:
      "Full-stack engineer building typed, tested systems with Next.js, Node and PostgreSQL. Open to New Grad 2027 roles.",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JS, scroll-reveal can't run — keep all content visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
