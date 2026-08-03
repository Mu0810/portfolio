"use client";

import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Theme {
  return (document.documentElement.dataset.theme as Theme) || "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
  listeners.forEach((cb) => cb());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title="Toggle theme"
    >
      {/* Inline SVG rather than ☀/☾ characters. Those are text-presentation
          symbols with no guaranteed glyph, and in a system-ui stack they render
          as a thin monochrome mark — or as tofu — so the button looked broken. */}
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
          </>
        )}
      </svg>
    </button>
  );
}
