import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import styles from "./projects.module.css";
import { profile, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Manish Kumar Soni",
  description:
    "A collection of projects built by Manish Kumar Soni, spanning AI-powered web apps, full-stack products, and mobile apps.",
};

export default function ProjectsPage() {
  const year = new Date().getFullYear();

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
            <Reveal
              key={project.title}
              delay={(i % 2) * 90}
              className={styles.card}
            >
              <a
                href={project.href}
                className={styles.cardLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.cardTop}>
                  <span className={`${styles.cardYear} mono`}>
                    {project.year}
                  </span>
                  {project.featured ? (
                    <span className={styles.badge}>Featured</span>
                  ) : null}
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h2 className={styles.cardTitle}>{project.title}</h2>
                <p className={styles.cardDesc}>{project.description}</p>
                <ul className={styles.tagList}>
                  {project.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © {year} {profile.name}
        </span>
        <Link href="/#contact" className={styles.footerLink}>
          Get in touch →
        </Link>
      </footer>
    </>
  );
}
