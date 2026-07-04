import { profile } from "@/lib/data";
import styles from "./Footer.module.css";

export default function Footer({ note }: { note?: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span>
        © {year} {profile.name}
      </span>
      {note ?? (
        <span className={styles.note}>
          Built with Next.js · Designed &amp; coded with care
        </span>
      )}
    </footer>
  );
}
