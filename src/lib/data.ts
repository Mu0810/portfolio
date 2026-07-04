export const profile = {
  name: "Alex Rivera",
  firstName: "Alex",
  role: "Full-Stack Software Engineer",
  tagline:
    "I design and build fast, accessible, and delightful products for the web — from pixel to production.",
  location: "San Francisco, CA",
  email: "hello@alexrivera.dev",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
};

export const stats = [
  { value: "6+", label: "Years building" },
  { value: "40+", label: "Projects shipped" },
  { value: "12", label: "Open-source repos" },
  { value: "∞", label: "Cups of coffee" },
];

export const about = [
  "I'm a full-stack engineer who loves turning ambiguous ideas into products people enjoy using. My sweet spot is the seam between thoughtful UI and reliable systems — where design decisions meet real-world constraints.",
  "Over the last several years I've led feature work across startups and scale-ups, shipping everything from design systems and dashboards to high-throughput APIs. I care deeply about performance, accessibility, and writing code that's a pleasure for the next person to read.",
  "When I'm not shipping, you'll find me contributing to open source, mentoring newer engineers, or chasing the perfect pour-over.",
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Vue"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    title: "Platform & Tooling",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Vercel"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  href: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Nimbus Analytics",
    description:
      "A real-time analytics platform processing millions of events per day. I built the streaming ingestion pipeline and the interactive dashboard used by 3k+ teams.",
    tags: ["Next.js", "Go", "ClickHouse", "WebSockets"],
    year: "2025",
    href: "#",
    featured: true,
  },
  {
    title: "Palette Design System",
    description:
      "An open-source, fully accessible React component library with theming, 60+ components, and zero-runtime styling. 4k+ GitHub stars.",
    tags: ["React", "TypeScript", "a11y", "Storybook"],
    year: "2024",
    href: "#",
    featured: true,
  },
  {
    title: "Ledger",
    description:
      "A privacy-first personal finance app with local-first sync and end-to-end encryption. Designed the data model and offline-first architecture.",
    tags: ["React Native", "SQLite", "CRDTs"],
    year: "2024",
    href: "#",
  },
  {
    title: "Orbit CLI",
    description:
      "A developer tool that scaffolds and deploys full-stack apps in seconds. Focused on great DX and helpful error messages.",
    tags: ["Node.js", "Rust", "DX"],
    year: "2023",
    href: "#",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Northwind Labs",
    period: "2023 — Present",
    description:
      "Lead frontend architecture for the flagship product. Drove a design-system migration that cut UI bugs by 40% and shipped a real-time collaboration layer.",
  },
  {
    role: "Full-Stack Engineer",
    company: "Brightwave",
    period: "2021 — 2023",
    description:
      "Built and owned core billing and onboarding flows end-to-end. Reduced API p95 latency by 60% and mentored two junior engineers.",
  },
  {
    role: "Software Engineer",
    company: "Foundry Studio",
    period: "2019 — 2021",
    description:
      "Delivered client web apps across e-commerce and media. Introduced automated testing and CI, taking deploys from weekly to daily.",
  },
];
