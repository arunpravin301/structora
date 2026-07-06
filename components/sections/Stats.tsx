"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";

// Figures from the client's form submission (Jul 2026).
// NOTE: client claims 17 years experience but company CIN shows 2021 incorporation.
// Using verifiable framing until resolved: sqft, projects, offices, since-2021.
const DATA = [
  { n: 22, s: "k+", l: "Sq ft built and building" },
  { n: 6, s: "", l: "Projects across Tamil Nadu" },
  { n: 2, s: "", l: "Offices, Kumbakonam and Kovilpatti" },
  { n: 5, s: "+", l: "Years building as Structora" }
];

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      root.current?.querySelectorAll<HTMLElement>("[data-n]").forEach((el) => {
        const target = Number(el.dataset.n);
        if (reduce) { el.textContent = String(target); return; }
        const o = { v: 0 };
        ScrollTrigger.create({ trigger: el, start: "top 86%", once: true, onEnter: () =>
          gsap.to(o, { v: target, duration: 1.6, ease: "power2.out", onUpdate: () => (el.textContent = String(Math.round(o.v))) }) });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="bg-ink2 text-white">
      <Container>
        <div className="grid grid-cols-4 max-[980px]:grid-cols-2">
          {DATA.map((d, i) => (
            <div key={i} className="pr-7 py-[50px]">
              <div className="font-fr font-semibold text-[clamp(38px,4.6vw,58px)] leading-none tracking-tight">
                <span data-n={d.n}>0</span><span className="text-red">{d.s}</span>
              </div>
              <div className="text-[13px] text-slatel mt-3">{d.l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
