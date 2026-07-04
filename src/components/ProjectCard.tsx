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
      <a
        href={project.href}
        className={styles.cardLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.cardTop}>
          <span className={`${styles.year} mono`}>{project.year}</span>
          {project.featured ? (
            <span className={styles.badge}>Featured</span>
          ) : null}
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
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
      </a>
    </Reveal>
  );
}
