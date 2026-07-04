import { profile } from "@/lib/data";
import styles from "./Socials.module.css";

export default function Socials({ className }: { className?: string }) {
  return (
    <div className={`${styles.socials} ${className ?? ""}`.trim()}>
      {profile.socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={`${s.label} (opens in a new tab)`}
        >
          {s.label}
          <span aria-hidden="true" className={styles.arrow}>
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
