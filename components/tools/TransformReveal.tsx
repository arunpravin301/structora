"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-driven before/after transformation.
 * The section pins fullscreen; scrolling wipes the AFTER image in from the
 * left, directly scrubbed to scroll progress. Scroll back and it reverses.
 * Reduced-motion: no pin, a static half-and-half comparison instead.
 *
 * PHOTOS: when real photography arrives, replace the two .plate divs with
 * next/image fills inside .tr-before / .tr-after. Nothing else changes.
 */
export default function TransformReveal() {
  const wrap = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);
  const seam = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const w = wrap.current, a = after.current, s = seam.current, p = pct.current;
    if (!w || !a || !s || !p) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(a, { clipPath: "inset(0 50% 0 0)" });
      gsap.set(s, { left: "50%" });
      p.textContent = "50";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: w,
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => { p.textContent = String(Math.round(self.progress * 100)); }
        }
      });
      tl.fromTo(a, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0)
        .fromTo(s, { left: "0%" }, { left: "100%", ease: "none" }, 0);
    }, w);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative w-full h-screen overflow-hidden">
      {/* BEFORE layer (base). Swap the plate for a real photo later. */}
      <div className="tr-before absolute inset-0">
        <div className="absolute inset-0" style={{ background: "linear-gradient(140deg,#10202F,#070F18)" }} />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] tracking-[.2em] uppercase text-slatel">Before photograph</span>
      </div>

      {/* AFTER layer (clipped, revealed left to right by scroll) */}
      <div ref={after} className="tr-after absolute inset-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(140deg,#1B3E6F,#0F2848)" }} />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] tracking-[.2em] uppercase text-white/70">After photograph</span>
      </div>

      {/* moving seam at the reveal edge */}
      <div ref={seam} className="absolute top-0 bottom-0 w-px bg-white/90 z-[3]" style={{ left: "0%", boxShadow: "0 0 18px rgba(255,255,255,.45)" }} />

      {/* overlay labels */}
      <span className="absolute top-6 left-6 z-[4] text-[10px] tracking-[.16em] uppercase text-white bg-black/40 px-3 py-1.5">Before</span>
      <span className="absolute top-6 right-6 z-[4] text-[10px] tracking-[.16em] uppercase text-white bg-black/40 px-3 py-1.5">After</span>
      <div className="absolute bottom-6 left-6 z-[4] text-white/85">
        <div className="text-[11px] tracking-[.18em] uppercase text-white/60">Project name · Kumbakonam</div>
        <div className="font-fr text-[15px] mt-1 tracking-[.04em]">The transformation, as you scroll.</div>
      </div>
      <div className="absolute bottom-6 right-6 z-[4] font-fr text-white/90 text-[15px] tabular-nums">
        <span ref={pct}>0</span><span className="text-white/50">%</span>
      </div>
    </div>
  );
}
