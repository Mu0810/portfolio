"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data";
import styles from "./ProjectCard.module.css";

/**
 * Project card with a cursor-tracking spotlight.
 *
 * The pointer position is written to CSS custom properties and the gradient is
 * drawn in CSS, so React never re-renders on mouse move — the only work per
 * event is two style writes.
 */
export default function ProjectCard({
  project,
  delay = 0,
  titleAs = "h3",
}: {
  project: Project;
  delay?: number;
  /** Heading level for the card title, so each page keeps a correct outline.
      The /projects page has no section heading above the grid, so its cards
      are h2; on the home page they sit under an h2 and are h3. */
  titleAs?: "h2" | "h3";
}) {
  const Title = titleAs;
  const ref = useRef<HTMLElement | null>(null);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const href = project.demo ?? project.href;

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className={`${styles.card} ${project.featured ? styles.featured : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <span className={styles.spotlight} aria-hidden="true" />

      <div className={styles.head}>
        <Title className={styles.title}>
          {/* The whole card is clickable via the stretched link, but the
              accessible name stays on the heading anchor. */}
          <a href={href} target="_blank" rel="noopener noreferrer" className={styles.stretched}>
            {project.title}
          </a>
        </Title>
        <span className={`${styles.year} mono`}>{project.year}</span>
      </div>

      <p className={styles.description}>{project.description}</p>

      {project.highlight && (
        <p className={styles.highlight}>
          <span className={styles.highlightBar} aria-hidden="true" />
          {project.highlight}
        </p>
      )}

      <ul className={styles.tags}>
        {project.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Source
          <span aria-hidden="true">↗</span>
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.link} ${styles.liveLink}`}
          >
            <span className={styles.liveDot} aria-hidden="true" />
            Live demo
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
