import { profile } from "@/lib/data";
import styles from "./DownloadCV.module.css";

type Props = {
  /** "solid" for the hero, "quiet" for the nav bar. */
  variant?: "solid" | "quiet";
  className?: string;
};

/**
 * Download link for the CV PDF.
 *
 * A plain anchor with `download`, not a JS handler, so it works with
 * middle-click, "Save link as", keyboard activation, and with JS disabled.
 * The file lives in public/, so it is served as a static asset.
 */
export default function DownloadCV({ variant = "solid", className }: Props) {
  return (
    <a
      href={profile.resumeUrl}
      download={profile.resumeName}
      className={[styles.btn, styles[variant], className].filter(Boolean).join(" ")}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="17"
        height="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      <span>Download CV</span>
      <span className={styles.meta} aria-hidden="true">
        PDF
      </span>
    </a>
  );
}
