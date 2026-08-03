import type { Project } from "@/lib/data";
import styles from "./ProjectRow.module.css";

/**
 * A project as a row in an index, not a card in a grid.
 *
 * Cards on shadows with hover-lift and a cursor spotlight are the default look
 * of a generated template. An indexed list with hairline rules reads like a
 * contents page: it carries more information per line, scans faster, and looks
 * like a decision rather than a default.
 *
 * Server component — there is no pointer tracking to do.
 */
export default function ProjectRow({
  project,
  index,
  titleAs = "h3",
}: {
  project: Project;
  index: number;
  titleAs?: "h2" | "h3";
}) {
  const Title = titleAs;
  const href = project.demo ?? project.href;

  return (
    <li className={styles.row}>
      <span className={`${styles.index} mono`} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.body}>
        <div className={styles.headline}>
          <Title className={styles.title}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {project.title}
            </a>
          </Title>
          {project.demo && <span className={`${styles.live} mono`}>live</span>}
        </div>

        <p className={styles.description}>{project.description}</p>

        {project.highlight && (
          <p className={styles.note}>
            <span className={`${styles.noteLabel} mono`} aria-hidden="true">
              note
            </span>
            {project.highlight}
          </p>
        )}

        <p className={`${styles.stack} mono`}>{project.tags.join("  ·  ")}</p>
      </div>

      <div className={styles.meta}>
        <span className={`${styles.year} mono`}>{project.year}</span>
        <span className={styles.links}>
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            source
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              demo
            </a>
          )}
        </span>
      </div>
    </li>
  );
}
