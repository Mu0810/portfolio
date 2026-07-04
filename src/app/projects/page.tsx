import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import styles from "./projects.module.css";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Manish Kumar Soni",
  description:
    "A collection of projects built by Manish Kumar Soni, spanning AI-powered web apps, full-stack products, and mobile apps.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="top" className={styles.main}>
        <header className={styles.header}>
          <Reveal>
            <Link href="/#work" className={styles.back}>
              ← Back to home
            </Link>
            <p className={`${styles.kicker} mono`}>All Work</p>
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.lead}>
              A selection of things I&apos;ve designed and built — from
              AI-powered web platforms to full-stack products and mobile apps.
              Most are open source on{" "}
              <a
                href="https://github.com/Mu0810"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                GitHub
              </a>
              .
            </p>
          </Reveal>
        </header>

        <section className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={(i % 2) * 90}
              titleAs="h2"
            />
          ))}
        </section>
      </main>

      <Footer
        note={
          <Link href="/#contact" className={styles.footerLink}>
            Get in touch →
          </Link>
        }
      />
    </>
  );
}
