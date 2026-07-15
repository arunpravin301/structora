"use client";
import { useEffect, useRef } from "react";

/**
 * Interactive "survey grid" hero background.
 * A field of measurement points on a technical grid that brighten, scale and
 * connect toward the cursor, like a survey instrument reading the ground.
 * Canvas-based, GPU-light, reduced-motion aware. No external libraries.
 */
export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;

    // pin non-null types so nested closures are happy under strict mode
    const cv: HTMLCanvasElement = el;
    const cx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const GAP = 46, R = 170, RL = 130;
    let w = 0, h = 0;
    let pts: { x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function resize() {
      const parent = cv.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) pts.push({ x, y });
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      const r = cv.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    }
    function onLeave() { mouse.tx = -9999; mouse.ty = -9999; }
    if (!reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    let raf = 0, t = 0;
    function frame() {
      t += 0.008;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      cx.clearRect(0, 0, w, h);

      if (mouse.x > -1000) {
        const g = cx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
        g.addColorStop(0, "rgba(234,88,12,0.04)");
        g.addColorStop(1, "rgba(234,88,12,0)");
        cx.fillStyle = g;
        cx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const px = p.x + Math.sin(t + p.x * 0.02) * 1.5;
        const py = p.y + Math.cos(t + p.y * 0.02) * 1.5;
        const d = Math.hypot(mouse.x - px, mouse.y - py);
        let a = 0.12, rad = 1;
        if (d < R) {
          const k = 1 - d / R;
          a = 0.12 + k * 0.55;
          rad = 1 + k * 1.9;
          if (d < RL) {
            cx.strokeStyle = `rgba(234,88,12,${(1 - d / RL) * 0.15})`;
            cx.lineWidth = 1;
            cx.beginPath(); cx.moveTo(mouse.x, mouse.y); cx.lineTo(px, py); cx.stroke();
          }
        }
        cx.fillStyle = d < R ? `rgba(234,88,12,${a})` : `rgba(15,23,42,${a * 0.6})`;
        cx.beginPath(); cx.arc(px, py, rad, 0, Math.PI * 2); cx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      cx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        cx.fillStyle = "rgba(15,23,42,0.06)";
        cx.beginPath(); cx.arc(p.x, p.y, 1, 0, Math.PI * 2); cx.fill();
      });
    }

    if (reduce) drawStatic();
    else raf = requestAnimationFrame(frame);

    function onVis() {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(frame);
    }
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full z-[1]" style={{ pointerEvents: "none" }} aria-hidden="true" />;
}
