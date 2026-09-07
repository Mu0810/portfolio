"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotionNow, useReducedMotion } from "@/lib/motion";
import styles from "./FlipStat.module.css";

const GLYPHS = "0123456789";
const DURATION = 900;

/**
 * A statistic that lands like a split-flap board.
 *
 * Each character settles independently, left to right, so "25" and "17" tumble
 * through digits while a value like "O(n)" scrambles through glyphs and snaps.
 * Purely numeric interpolation was the first attempt and it could not render
 * "O(n)" at all — per-character settling handles both without a special case.
 *
 * The final value is in the DOM from first paint and the animation only
 * *replaces* it while running, so the number is never missing: no-JS renders
 * it, a screen reader reads it once (the tumbling text is `aria-hidden`), and
 * reduced-motion skips straight to it.
 */
export default function FlipStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [running, setRunning] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    // The synchronous read matters: the figures strip sits directly under the
    // masthead, so a stat can already be 60% visible on load and its observer
    // could fire inside the hydration window, before the store-backed `reduced`
    // value has arrived.
    if (!node || reduced || prefersReducedMotionNow()) return;

    let frame = 0;
    let start = 0;
    let done = false;

    const chars = value.split("");
    // Characters that aren't digits keep their shape from the start unless they
    // are alphanumeric — punctuation tumbling looks like a glitch, not a flap.
    const flippable = chars.map((c) => /[0-9a-z]/i.test(c));

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DURATION);

      const next = chars
        .map((char, i) => {
          if (!flippable[i]) return char;
          // Stagger: each character locks in at its own point in the run.
          const settleAt = 0.35 + (i / Math.max(1, chars.length)) * 0.6;
          if (t >= settleAt) return char;
          return /[0-9]/.test(char)
            ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            : String.fromCharCode(97 + Math.floor(Math.random() * 26));
        })
        .join("");

      setDisplay(next);

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        setRunning(false);
        done = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            setRunning(true);
            frame = requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={`${styles.value} mono`}>
      {/* The stable value, for assistive tech and for no-JS. Hidden from sight
          only while the flap animation is actually running. */}
      <span className={running ? "sr-only" : undefined}>{value}</span>
      {running && (
        <span aria-hidden="true" className={styles.flapping}>
          {display}
        </span>
      )}
    </span>
  );
}
