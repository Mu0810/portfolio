"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotionNow, useReducedMotion } from "@/lib/motion";
import styles from "./SectionNo.module.css";

/**
 * The section's folio number, set oversized and outlined, drifting *against* the
 * scroll direction as its section passes.
 *
 * Counter-scroll is the point: two things moving at different rates give a flat
 * page depth without a single shadow or blur. The numeral is outlined rather than
 * filled so it reads as printed furniture behind the content instead of competing
 * with it.
 *
 * Purely decorative, and `aria-hidden` accordingly — the section is identified by
 * its heading, and a screen reader gains nothing from "zero four". It previously
 * also rendered a small mono copy of the same number directly beneath the giant
 * one, which stated the folio twice to sighted readers for no benefit.
 */
export default function SectionNo({ no, drift = 90 }: { no: string; drift?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced || prefersReducedMotionNow()) {
      node.style.removeProperty("--drift");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // -1 when the element sits a viewport below the fold, +1 a viewport above
      // it; 0 as it crosses the vertical centre.
      const centre =
        (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const clamped = Math.min(1, Math.max(-1, centre));
      node.style.setProperty("--drift", `${clamped * drift}px`);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [drift, reduced]);

  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">
      <span className={styles.ghost}>{no}</span>
    </div>
  );
}
