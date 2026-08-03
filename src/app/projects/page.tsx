import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";
import Footer from "@/components/Footer";
import styles from "./projects.module.css";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects — Manish Kumar Soni",
  description:
    "Projects built by Manish Kumar Soni — full-stack platforms, AI-integrated products, a chess engine, real-time graphics, and security tooling.",
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
              Everything I&apos;ve built that I&apos;d be happy to be questioned
              on — full-stack platforms, AI-integrated products, a chess engine
              written from scratch, real-time graphics, and security tooling. All
              open source on{" "}
              <a
                href="https://github.com/Mu0810"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
                aria-label="GitHub (opens in a new tab)"
              >
                GitHub
              </a>
              .
            </p>
          </Reveal>
        </header>

        <section>
          <ol className={styles.index}>
            {projects.map((project, i) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={i}
                titleAs="h2"
              />
            ))}
          </ol>
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
