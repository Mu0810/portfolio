"use client";

import { useEffect, useRef } from "react";
import styles from "./Aurora.module.css";

/**
 * Animated aurora backdrop.
 *
 * Deliberately cheap:
 *  - Renders to a small offscreen-sized canvas (a third of CSS pixels) and lets
 *    the browser upscale it. The blobs are soft, so the loss is invisible and
 *    the fill cost drops by ~9x.
 *  - Uses "lighter" compositing on four radial gradients rather than a shader,
 *    so there is no WebGL context to lose and no fallback path to maintain.
 *  - Pauses entirely when the tab is hidden or the canvas scrolls out of view,
 *    so it never burns battery in a background tab.
 *  - Bails out before the first frame if the visitor prefers reduced motion; CSS
 *    then supplies a static gradient instead.
 */

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
};

const SCALE = 3; // CSS pixels per canvas pixel
const BLOB_COUNT = 4;

export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isDark = () => document.documentElement.dataset.theme !== "light";

    let width = 0;
    let height = 0;
    let blobs: Blob[] = [];
    let frame = 0;
    let running = true;
    // Pointer influence, in canvas space. Starts centred so the first frames
    // are not skewed toward the top-left.
    const pointer = { x: 0.5, y: 0.4, active: false };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width / SCALE));
      height = Math.max(1, Math.floor(rect.height / SCALE));
      canvas!.width = width;
      canvas!.height = height;

      blobs = Array.from({ length: BLOB_COUNT }, (_, i) => ({
        x: width * (0.2 + 0.2 * i),
        y: height * (i % 2 === 0 ? 0.32 : 0.68),
        vx: (i % 2 === 0 ? 1 : -1) * (0.055 + i * 0.014),
        vy: (i % 3 === 0 ? -1 : 1) * (0.038 + i * 0.011),
        r: Math.max(width, height) * (0.42 + 0.1 * (i % 3)),
        // Violet → magenta band, matching the brand gradient.
        hue: 258 + i * 22,
      }));
    }

    function draw() {
      if (!running) return;
      frame += 1;

      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      const alpha = isDark() ? 0.4 : 0.26;

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;

        // Bounce off the edges, inset so a blob centre never sits fully outside.
        if (b.x < -b.r * 0.3 || b.x > width + b.r * 0.3) b.vx *= -1;
        if (b.y < -b.r * 0.3 || b.y > height + b.r * 0.3) b.vy *= -1;

        // Drift gently toward the pointer when it is over the hero.
        if (pointer.active) {
          b.x += (pointer.x * width - b.x) * 0.0016;
          b.y += (pointer.y * height - b.y) * 0.0016;
        }

        // Slow breathing so the field never looks frozen even when still.
        const pulse = 1 + Math.sin(frame * 0.004 + b.hue) * 0.07;
        const r = b.r * pulse;

        const g = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        g.addColorStop(0, `hsla(${b.hue}, 92%, 62%, ${alpha})`);
        g.addColorStop(0.55, `hsla(${b.hue + 12}, 88%, 56%, ${alpha * 0.35})`);
        g.addColorStop(1, "hsla(0, 0%, 0%, 0)");

        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    }

    let raf = 0;

    function start() {
      if (raf) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Stop drawing once the hero has scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const onPrefChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        stop();
        ctx.clearRect(0, 0, width, height);
      } else {
        start();
      }
    };
    reduceMotion.addEventListener("change", onPrefChange);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      reduceMotion.removeEventListener("change", onPrefChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
