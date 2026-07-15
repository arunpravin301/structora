"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Plate({ cap, idx = "", className = "", src = "" }: { cap: string; idx?: string; className?: string; src?: string }) {
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

  const imgUrl = src || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  return (
    <div ref={el} className={`plate ${className} group`}>
      <img src={imgUrl} alt={cap} className="absolute inset-0 w-full h-full object-cover brightness-[0.65] contrast-125 saturate-50 transition-all duration-700 group-hover:brightness-100 group-hover:saturate-100" />
      <div className="reg pointer-events-none" />
      <span className="tk k1 pointer-events-none" /><span className="tk k2 pointer-events-none" /><span className="tk k3 pointer-events-none" /><span className="tk k4 pointer-events-none" />
      <div className="cap pointer-events-none">{cap}</div>
      {idx && <div className="idx pointer-events-none">{idx}</div>}
    </div>
  );
}
