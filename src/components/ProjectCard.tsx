import Reveal from "./Reveal";
import styles from "./ProjectCard.module.css";
import type { Project } from "@/lib/data";

type ProjectCardProps = {
  project: Project;
  delay?: number;
  titleAs?: "h2" | "h3";
};

export default function ProjectCard({
  project,
  delay = 0,
  titleAs: TitleTag = "h3",
}: ProjectCardProps) {
  return (
    <Reveal className={styles.card} delay={delay}>
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={`${styles.year} mono`}>{project.year}</span>
          {project.featured ? (
            <span className={styles.badge}>Featured</span>
          ) : null}
        </div>

        <TitleTag className={styles.title}>{project.title}</TitleTag>
        <p className={styles.desc}>{project.description}</p>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.action}
            aria-label={`View source code for ${project.title} (opens in a new tab)`}
          >
            View code
            <span aria-hidden="true" className={styles.arrow}>
              ↗
            </span>
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.action} ${styles.actionPrimary}`}
              aria-label={`Open the ${project.title} live demo (opens in a new tab)`}
            >
              Live demo
              <span aria-hidden="true" className={styles.arrow}>
                ↗
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
