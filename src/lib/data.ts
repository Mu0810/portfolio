export const profile = {
  name: "Manish Kumar Soni",
  firstName: "Manish",
  role: "Software Developer",
  tagline:
    "I'm a software developer building AI-powered, full-stack web applications — from polished React frontends to secure, intelligent backends.",
  location: "",
  email: "0810sonimanish@gmail.com",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/Mu0810" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sonimanixh" },
  ],
};

export const stats = [
  { value: "8+", label: "GitHub projects" },
  { value: "20+", label: "Technologies & tools" },
  { value: "5+", label: "AI apps built" },
  { value: "∞", label: "Curiosity to learn" },
];

export const about = [
  "I'm Manish, a software developer who loves turning ideas into working products. My focus is full-stack web development with a strong pull toward AI — building apps that are fast, secure, and genuinely useful.",
  "I work across the stack with TypeScript, React, Next.js, and Node.js, and I'm especially interested in the modern AI toolchain: LLM APIs, retrieval-augmented generation, AI agents, and the Model Context Protocol. I also care about writing secure code, following OWASP practices, and getting authentication right.",
  "Most of my experience comes from building real projects — for private businesses and as personal work — where I own features end to end, from UI to backend to deployment.",
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    title: "Backend & Tools",
    items: [
      "Node.js",
      "Git & GitHub",
      "Docker",
      "System Design",
      "Design Patterns",
      "OOP",
    ],
  },
  {
    title: "AI & Modern Development",
    items: [
      "OpenAI API",
      "LLM Integration",
      "RAG",
      "AI Agents",
      "MCP",
      "Prompt Engineering",
    ],
  },
  {
    title: "Security",
    items: [
      "Secure Coding",
      "OWASP Top 10",
      "JWT Security",
      "Auth & Authorization",
      "Cybersecurity",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Problem Solving",
      "Communication",
      "Team Collaboration",
      "Debugging",
      "Critical Thinking",
      "Adaptability",
    ],
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
    title: "BuyWise AI",
    description:
      "An AI-powered shopping intelligence platform that helps users make smarter purchase decisions. Built on the latest Next.js 16 and React 19 stack with TypeScript.",
    tags: ["Next.js 16", "React 19", "TypeScript", "AI"],
    year: "2026",
    href: "https://github.com/Mu0810/buywise-ai",
    featured: true,
  },
  {
    title: "HireFlow AI",
    description:
      "An AI-assisted hiring workflow app that streamlines the recruitment process. A full TypeScript project exploring practical LLM integration in real product flows.",
    tags: ["TypeScript", "Next.js", "AI", "LLM"],
    year: "2026",
    href: "https://github.com/Mu0810/hireflow-ai",
    featured: true,
  },
  {
    title: "AI Agent",
    description:
      "A hybrid AI-agent playground combining JavaScript and Python for building, experimenting with, and deploying agent workflows — with a live deployment on Vercel.",
    tags: ["JavaScript", "Python", "AI Agents", "Vercel"],
    year: "2026",
    href: "https://github.com/Mu0810/AI-agent",
    featured: true,
  },
  {
    title: "Health WebApp",
    description:
      "A health-focused web application built with Next.js and TypeScript, aimed at tracking and presenting personal health data in a clean, responsive interface.",
    tags: ["Next.js", "TypeScript", "React"],
    year: "2026",
    href: "https://github.com/Mu0810/health-webapp",
  },
  {
    title: "Water Tracking",
    description:
      "A native Android app written in Kotlin that helps users track their daily water intake and build healthier hydration habits.",
    tags: ["Kotlin", "Android", "Mobile"],
    year: "2026",
    href: "https://github.com/Mu0810/water_tracking",
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
    role: "Software Developer",
    company: "Freelance / Self-Employed",
    period: "2024 — Present",
    description:
      "Design and build full-stack web applications and AI-powered products for private businesses. Own features end to end — from React/Next.js frontends to secure Node.js backends, authentication, and deployment.",
  },
  {
    role: "AI & Full-Stack Projects",
    company: "Personal & Open Source",
    period: "2023 — Present",
    description:
      "Build and ship self-driven projects exploring the modern AI stack — LLM APIs, RAG, AI agents, and MCP — alongside full-stack web and mobile apps published on GitHub.",
  },
];
