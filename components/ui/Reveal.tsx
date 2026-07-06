"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Reveal({ children, y = 40, className = "" }: { children: React.ReactNode; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" }
      });
    });
    return () => ctx.revert();
  }, [y]);
  return <div ref={ref} className={className}>{children}</div>;
}
