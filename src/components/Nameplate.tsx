"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotionNow, useReducedMotion } from "@/lib/motion";
import styles from "./Nameplate.module.css";

/**
 * The masthead nameplate: the name set as large as the sheet allows, with the
 * two motions that make this a *kinetic* broadsheet rather than a printed one.
 *
 *  - An impression reveal: each word rises out of a clipping mask, staggered,
 *    the way a sheet comes off a press one pass at a time.
 *  - Parallax: the plate drifts up more slowly than the page scrolls and fades
 *    as it leaves, so the deck below slides over it. This is the only depth cue
 *    on the page — there are still no shadows anywhere.
 *
 * This is the *only* client component in the masthead. It was originally the
 * whole header, which broke the build: a `"use client"` header that imports
 * `Avatar` drags Avatar's `node:fs` photo probe into the browser bundle, and
 * Turbopack refuses to chunk it. Keeping the boundary this narrow means the
 * portrait, the CV link and the vitals all stay server-rendered.
 */
export default function Nameplate({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced || prefersReducedMotionNow()) {
      node.style.removeProperty("--shift");
      node.style.removeProperty("--fade");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      // Only the first viewport of scroll matters — past that the nameplate is
      // off screen and the work is wasted.
      const y = Math.min(window.scrollY, window.innerHeight);
      node.style.setProperty("--shift", `${y * -0.16}px`);
      node.style.setProperty(
        "--fade",
        String(Math.max(0, 1 - y / (window.innerHeight * 0.9))),
      );
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

  return (
    <div ref={ref} className={styles.plate}>
      <h1 className={styles.name}>
        {name.split(" ").map((word, i) => (
          <span className={styles.mask} key={word}>
            <span
              className={styles.word}
              style={{ animationDelay: `${120 + i * 110}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>
    </div>
  );
}
