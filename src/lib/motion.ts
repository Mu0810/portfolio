"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query as an external store.
 *
 * `useSyncExternalStore` is the right primitive here rather than
 * `useState` + `useEffect`: `matchMedia` *is* an external store, and reading it
 * into state inside an effect means a guaranteed second render on every mount
 * (which is what `react-hooks/set-state-in-effect` objects to).
 *
 * `getServerSnapshot` returns false so the server and the hydrating client agree
 * on markup. React then reads the real value immediately after hydration, and
 * every consumer gates its animation on the *positive* result — so the honest
 * default during that window is "no motion yet", never "animate and correct".
 */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * Read `prefers-reduced-motion` synchronously, for use at the top of an effect.
 *
 * `useReducedMotion` returns false on the server and on the first client render
 * so hydration markup matches — which leaves a window where an effect runs once
 * with motion apparently allowed. That is long enough for an IntersectionObserver
 * on an already-visible element to fire and start an animation before React's
 * post-hydration store read tears the effect down. Calling this at the top of the
 * effect closes the window deterministically, instead of relying on the ordering
 * between an observer callback and a re-render.
 */
export function prefersReducedMotionNow(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True when the visitor has asked for reduced motion.
 *
 * Every kinetic component on this site reads motion permission from here rather
 * than checking `matchMedia` itself, so "motion off" means the same thing
 * everywhere: the scroll-driven gallery stops hijacking, the counters print their
 * final value, the folio numerals hold still, and nothing animates in.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True when the viewport is wide enough for the scroll-driven horizontal
 * gallery. Below this the gallery becomes a native swipe carousel instead —
 * hijacking touch scroll on a phone is hostile, and a 58vw broadsheet spread is
 * unreadable at 390px anyway.
 *
 * Kept in sync with the `900px` breakpoint in WorkGallery.module.css.
 */
export function useWideViewport(): boolean {
  return useMediaQuery("(min-width: 901px)");
}
