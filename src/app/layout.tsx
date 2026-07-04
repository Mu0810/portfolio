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
  title: "Alex Rivera — Software Engineer & Product Builder",
  description:
    "Portfolio of Alex Rivera, a full-stack software engineer crafting fast, accessible, and delightful web experiences.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "web developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera — Software Engineer & Product Builder",
    description:
      "Full-stack engineer crafting fast, accessible, and delightful web experiences.",
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
