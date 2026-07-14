"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import Plate from "@/components/ui/Plate";
import HeroBackground from "@/components/sections/HeroBackground";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-title", { y: 50, opacity: 0, duration: 1 })
        .from(".h-plate", { scale: 1.04, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.6")
        .from(".h-box", { x: -30, opacity: 0, duration: 0.8 }, "-=1.0")
        .from(".h-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".h-act", { y: 15, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".h-meta", { opacity: 0, duration: 0.6 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative min-h-[94vh] text-white flex items-center pt-[140px] pb-[100px] overflow-hidden"
      style={{ background: "linear-gradient(164deg,#1E293B 0%,#0F172A 50%,#020617 100%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(95% 72% at 82% 10%,rgba(234,88,12,.15),transparent 58%)" }} />
      <HeroBackground />
      <Container className="relative z-[2] w-full pt-10">
        <div className="relative">
          <div className="relative z-10 md:w-[75%] mb-12 md:mb-0 pointer-events-none">
            <h1 className="h-title text-white font-semibold text-[clamp(44px,6.5vw,84px)] leading-[1.05] tracking-tight">Built by engineers you can sit across from.</h1>
          </div>
          
          <div className="relative z-0 md:absolute md:-top-10 md:right-0 md:w-[50%]">
             <Plate cap="Featured project photograph" idx="FIG. 01" className="h-plate aspect-[4/3] w-full" />
          </div>

          <div className="relative z-10 md:w-[45%] md:mt-[12%]">
             <div className="h-box bg-slate-900 border border-lined p-8 md:p-11 shadow-2xl">
                <p className="h-sub text-[16.5px] text-white/80 leading-relaxed">We design and build residential, commercial and industrial projects across Tamil Nadu. From the first drawing to the final key, the work stays with people you can meet.</p>
                <div className="h-act flex flex-col sm:flex-row items-center gap-6 mt-9">
                  <Link href="/contact" className="btn btn-cta w-full sm:w-auto text-center">Request a consultation</Link>
                  <Link href="/projects" className="tlink">View selected work →</Link>
                </div>
                <div className="h-meta mt-10 pt-5 border-t border-lined text-[12.5px] tracking-[.06em] text-slatel uppercase">Kumbakonam &nbsp;·&nbsp; Kovilpatti &nbsp;·&nbsp; Tamil Nadu</div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
