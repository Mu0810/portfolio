import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { profile } from "@/lib/data";
import styles from "./Avatar.module.css";

/**
 * Renders the profile photo if one has been added to `public/`, and a designed
 * monogram if not.
 *
 * The check happens on the server at build time rather than in the browser,
 * which avoids the broken-image flash you get from an onError fallback — and
 * means the site builds and looks finished whether or not the photo is present.
 *
 * To use a photo: drop it in `public/` as profile.jpg (or .jpeg / .png / .webp).
 */
const CANDIDATES = ["profile.jpg", "profile.jpeg", "profile.png", "profile.webp"];

function findPhoto(): string | null {
  for (const name of CANDIDATES) {
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", name))) {
        return `/${name}`;
      }
    } catch {
      // An unreadable public/ directory must not break the build.
      return null;
    }
  }
  return null;
}

export default function Avatar() {
  const src = findPhoto();

  return (
    <div className={styles.frame}>
      {/* Rotating conic ring behind the portrait. */}
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        {src ? (
          <Image
            src={src}
            alt={`${profile.name}, ${profile.role}`}
            width={640}
            height={800}
            priority
            className={styles.photo}
          />
        ) : (
          <div className={styles.monogram} role="img" aria-label={profile.name}>
            <span className={styles.initials}>{profile.initials}</span>
          </div>
        )}
      </div>

      {/* Small status chip pinned to the portrait. */}
      <span className={styles.badge}>
        <span className={styles.dot} aria-hidden="true" />
        Open to work
      </span>
    </div>
  );
}
