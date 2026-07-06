"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { site } from "@/config/site";
import Plate from "@/components/ui/Plate";

export default function ServiceIndex() {
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop/fine-pointer devices
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(plateRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(plateRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset so the cursor isn't completely hidden by the image
      xTo(e.clientX + 30);
      yTo(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative">
      {/* Floating Preview (Fixed to viewport, hidden on mobile) */}
      <div 
        ref={plateRef}
        className={`fixed top-0 left-0 w-[280px] aspect-[4/5] pointer-events-none z-50 hidden md:block transition-opacity duration-300 ${hoveredIdx ? 'opacity-100' : 'opacity-0'}`}
      >
        <Plate cap="Service Preview" idx={hoveredIdx || ""} className="w-full h-full bg-[#0A1626]" />
      </div>

      <div className="relative z-10" onMouseLeave={() => setHoveredIdx(null)}>
        {site.services.map((s) => (
          <Link 
            key={s.slug} 
            href={`/services/${s.slug}`}
            onMouseEnter={() => setHoveredIdx(s.num)}
            className="grid grid-cols-[84px_1.1fr_1.5fr_40px] max-[600px]:grid-cols-[46px_1fr] items-center gap-6 py-[42px] px-3.5 border-t border-line last:border-b transition-all hover:bg-mist hover:pl-8 group"
          >
            <span className="font-fr text-[17px] text-slatel">{s.num}</span>
            <span className="font-fr font-semibold text-[clamp(28px,3.5vw,42px)] tracking-tight group-hover:text-navy transition">{s.name}</span>
            <span className="text-[16px] text-slate max-w-[44ch] max-[600px]:hidden">{s.desc}</span>
            <span className="text-xl text-slatel justify-self-end max-[600px]:hidden group-hover:text-red group-hover:translate-x-2 transition">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
