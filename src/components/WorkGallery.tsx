"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";
import { prefersReducedMotionNow, useReducedMotion, useWideViewport } from "@/lib/motion";
import styles from "./WorkGallery.module.css";

/**
 * The work section as a broadsheet that turns sideways.
 *
 * Vertical scroll drives `translateX` on a track pinned with `position: sticky`,
 * so the page keeps its normal scrollbar and its normal wheel/trackpad feel —
 * nothing is captured or re-interpreted. That matters: a gallery that swallows
 * wheel events breaks the one input every visitor already knows.
 *
 * Three renderings of the same markup, chosen by capability rather than by
 * sniffing anything:
 *
 *  - Wide viewport, motion allowed -> pinned, scroll-driven horizontal spreads.
 *  - Narrow viewport -> native `scroll-snap` swipe carousel. Hijacking touch
 *    scroll on a phone is hostile, and a full spread is unreadable at 390px.
 *  - `prefers-reduced-motion` -> a plain vertical stack. Not a slowed-down
 *    version of the effect; the effect is simply gone.
 *
 * The last two are pure CSS (`WorkGallery.module.css`), so they work before
 * hydration and cannot desync from JS. JS only ever *adds* the transform.
 */
export default function WorkGallery({
  projects,
  no,
  label,
}: {
  projects: Project[];
  /** Folio number of the owning section, for the running head. */
  no: string;
  /** Section title, repeated as a running head while the sheet is pinned. */
  label: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  const [active, setActive] = useState(0);

  const reduced = useReducedMotion();
  const wide = useWideViewport();
  const kinetic = wide && !reduced;

  const count = projects.length;

  /**
   * Window scrollY at which panel `index` is fully turned to.
   *
   * Shared by the page-turn buttons and the focus handler so that clicking
   * "next" and tabbing into a link land on exactly the same position — two
   * separate calculations here would drift apart.
   */
  const scrollTopForPanel = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section || count < 2) return null;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return null;

      return sectionTop + (index / (count - 1)) * travel;
    },
    [count],
  );

  // Drive the track from scroll position.
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    if (!kinetic || prefersReducedMotionNow()) {
      // Hand layout back to CSS for the carousel / stacked renderings. The
      // synchronous read closes the hydration window in which `reduced` is still
      // false and this would briefly write a transform CSS then has to undo.
      track.style.transform = "";
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const distance = track.scrollWidth - viewport.clientWidth;

      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      setActive(Math.round(progress * (count - 1)));
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
      track.style.transform = "";
    };
  }, [kinetic, count]);

  const goTo = (index: number) => {
    const clamped = Math.min(count - 1, Math.max(0, index));

    if (!kinetic) {
      // Carousel / stacked: scroll the panel itself into view.
      trackRef.current?.children[clamped]?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
      setActive(clamped);
      return;
    }

    const top = scrollTopForPanel(clamped);
    if (top !== null) window.scrollTo({ top, behavior: "smooth" });
  };

  /**
   * Keep focus visible.
   *
   * Tabbing to a link inside an off-screen spread would otherwise leave the focus
   * ring outside the clipped viewport — focus somewhere the user cannot see is a
   * 2.4.7 failure. Jump the page so the focused spread is on screen.
   *
   * `behavior: "instant"`, NOT `"auto"`. Per CSSOM-View `auto` defers to the
   * scrolling element's computed `scroll-behavior`, and globals.css sets
   * `html { scroll-behavior: smooth }` — so `auto` here produced exactly the
   * animated scroll this is meant to avoid, sliding the spread sideways under the
   * focus ring and launching a second animation if the user tabbed again
   * mid-flight. `instant` is the keyword that actually forces a jump.
   *
   * Belt and braces: reset scrollLeft on both clip boxes. They are `overflow:
   * clip` now, so the browser should never scroll them, but a stray value here
   * would desync the track from the transform that is supposed to position it.
   */
  const onPanelFocus = (index: number) => {
    if (!kinetic) return;

    if (viewportRef.current) viewportRef.current.scrollLeft = 0;
    if (clipRef.current) clipRef.current.scrollLeft = 0;

    const top = scrollTopForPanel(index);
    if (top !== null) window.scrollTo({ top, behavior: "instant" });
  };

  return (
    <div
      ref={sectionRef}
      className={styles.stage}
      // Panel count drives the pinned height from CSS, so a media query can
      // override it. An inline `height` could not be overridden.
      style={{ "--panels": count } as React.CSSProperties}
    >
      <div ref={viewportRef} className={styles.viewport}>
        {/* Running head. Once the sheet pins, the section's own h2 and its
            "the arrows turn the page" note have both scrolled away, leaving
            nothing on screen to say where you are — which is exactly the
            disorientation a printed running head exists to prevent. It carries a
            live spread counter for the same reason: the page stops advancing
            vertically, so the reader needs proof that something IS advancing.

            Hidden from assistive tech: the real h2 is still in the document, and
            each spread states its own "01 / 04" in text. */}
        <div className={`${styles.runningHead} mono`} aria-hidden="true">
          <span className={styles.runningNo}>{no}</span>
          <span className={styles.runningRule} />
          <span>{label}</span>
          <span className={styles.runningRule} />
          <span className={styles.runningCount}>
            Spread {active + 1} of {count}
          </span>
        </div>

        {/* Clip layer. Carries the right-edge fade so a partially visible spread
            reads as "there is more sheet" rather than as text guillotined at the
            viewport edge. Kept separate from .viewport because the running head
            and the page-turn rail must NOT be faded — and it collapses to
            `display: contents` in the carousel and stacked renderings, so it
            leaves their layout and scrolling untouched. */}
        <div ref={clipRef} className={styles.clip}>
          <ol ref={trackRef} className={styles.track} role="list">
            {projects.map((project, i) => {
              const href = project.demo ?? project.href;
              return (
                <li
                  key={project.title}
                  className={styles.panel}
                  onFocusCapture={() => onPanelFocus(i)}
                >
                  <div className={styles.panelInner}>
                    <div className={styles.panelHead}>
                      <span
                        className={`${styles.folio} mono`}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(count).padStart(2, "0")}
                      </span>
                      <span className={`${styles.year} mono`}>
                        {project.year}
                      </span>
                    </div>

                    <h3 className={styles.title}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.titleLink}
                      >
                        {project.title}
                      </a>
                      {project.demo && (
                        <span className={`${styles.live} mono`}>live</span>
                      )}
                    </h3>

                    <p className={styles.description}>{project.description}</p>

                    {project.highlight && (
                      <p className={styles.pull}>
                        {/* Not aria-hidden, unlike the folio and the running
                            head. Those restate content available elsewhere; this
                            is the only framing `highlight` gets, so hiding it
                            left a screen-reader user with a bare, unexplained
                            sentence. */}
                        <span className={`${styles.pullLabel} mono`}>
                          the detail
                        </span>
                        {project.highlight}
                      </p>
                    )}

                    <div className={styles.panelFoot}>
                      <p className={`${styles.stack} mono`}>
                        {project.tags.join("  ·  ")}
                      </p>
                      <p className={styles.links}>
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          source
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            demo
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Page-turn rail. The gallery must be operable without a wheel or a
            swipe, so these are real buttons. The two arrows sit together with a
            written label rather than at opposite ends of a full-width bar, where
            a first-time visitor read them as decoration ~800px from where their
            eye actually was. */}
        <div className={styles.rail}>
          <ol className={styles.ticks} role="list">
            {projects.map((project, i) => (
              <li key={project.title}>
                <button
                  type="button"
                  className={`${styles.tick} ${i === active ? styles.tickOn : ""}`}
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "true" : undefined}
                >
                  <span className="sr-only">Go to {project.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.turnGroup}>
            <span className={`${styles.turnLabel} mono`} aria-hidden="true">
              Turn the page
            </span>
            {/* `aria-disabled`, not `disabled`. `active` is written by the scroll
                handler, so it reaches the endpoint partway through the smooth
                scroll the button itself started — a real `disabled` then lands on
                the element that currently HAS focus, the browser blurs it, and
                focus falls to <body>, so the user's next Tab restarts from the top
                of the page. Staying focusable preserves the tab position, and
                `goTo` already clamps, so the extra press is a harmless no-op. */}
            <button
              type="button"
              className={styles.turn}
              onClick={() => goTo(active - 1)}
              aria-disabled={active === 0}
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.turn}
              onClick={() => goTo(active + 1)}
              aria-disabled={active === count - 1}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
