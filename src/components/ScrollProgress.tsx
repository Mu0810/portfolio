"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotionNow, useReducedMotion } from "@/lib/motion";
import styles from "./ScrollProgress.module.css";

/**
 * A hairline that fills across the top of the page as you read.
 *
 * On a press sheet this is the registration rule; here it is the one piece of
 * chrome that says how much broadsheet is left, which the horizontal work gallery
 * otherwise hides — the page is tall, but the scrollbar's length stops meaning
 * what it usually means once a section scrolls sideways.
 *
 * Writes a CSS custom property from a rAF-throttled scroll listener rather than
 * setting React state, so a fast scroll cannot queue a render per frame.
 *
 * Gated on reduced motion. This is user-driven rather than automatic, so it is not
 * a 2.2.2 failure and 2.3.3 Animation from Interactions is only AAA — but
 * `lib/motion.ts` promises that with motion off *nothing* on this page moves, and
 * a bar sweeping across the viewport on every scroll broke that promise. The CSS
 * hides it too, so it is gone before hydration rather than after.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || prefersReducedMotionNow()) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      node.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
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
  }, [reduced]);

  // Decorative: the same information is in the scrollbar, so exposing a second
  // progress announcement to a screen reader would only add noise.
  return <div ref={ref} className={styles.rail} aria-hidden="true" />;
}
