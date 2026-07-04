import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL to your deployed URL so OG/Twitter cards and
// canonical links resolve to absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Manish Kumar Soni — Software Developer",
  description:
    "Portfolio of Manish Kumar Soni, a software developer building AI-powered, full-stack web applications with React, Next.js, and TypeScript.",
  keywords: [
    "Manish Kumar Soni",
    "software developer",
    "full-stack developer",
    "AI developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Manish Kumar Soni" }],
  openGraph: {
    title: "Manish Kumar Soni — Software Developer",
    description:
      "Software developer building AI-powered, full-stack web applications with React, Next.js, and TypeScript.",
    url: "/",
    siteName: "Manish Kumar Soni",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manish Kumar Soni — Software Developer",
    description:
      "Software developer building AI-powered, full-stack web applications with React, Next.js, and TypeScript.",
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
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
