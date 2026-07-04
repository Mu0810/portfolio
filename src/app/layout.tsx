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

export const metadata: Metadata = {
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
    type: "website",
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
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
