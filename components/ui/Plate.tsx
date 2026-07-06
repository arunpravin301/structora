"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Plate({ cap, idx = "", className = "" }: { cap: string; idx?: string; className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;
    gsap.registerPlugin(ScrollTrigger);
    
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el.current, 
        { clipPath: "inset(100% 0 0 0)" },
        { 
          clipPath: "inset(0% 0 0 0)", 
          duration: 1.2, 
          ease: "power3.inOut",
          scrollTrigger: { trigger: el.current, start: "top 90%", once: true }
        }
      );
    }, el);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={el} className={`plate ${className}`}>
      <div className="reg" />
      <span className="tk k1" /><span className="tk k2" /><span className="tk k3" /><span className="tk k4" />
      <div className="cap">{cap}</div>
      {idx && <div className="idx">{idx}</div>}
    </div>
  );
}
