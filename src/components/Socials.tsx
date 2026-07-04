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
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}
