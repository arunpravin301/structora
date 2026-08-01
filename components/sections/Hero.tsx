"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Container from "@/components/ui/Container";
import Plate from "@/components/ui/Plate";
import HeroBackground from "@/components/sections/HeroBackground";

let GALLERY_DATA: any = {};
try {
  GALLERY_DATA = require('../../project-data.json');
} catch (e) {}

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
    <section ref={root} className="relative min-h-[94vh] text-slate-900 flex items-center pt-[140px] pb-[100px] overflow-hidden bg-mist">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(95% 72% at 82% 10%,rgba(234,88,12,.08),transparent 58%)" }} />
      <HeroBackground />
      <Container className="relative z-[2] w-full pt-10">
        <div className="relative flex flex-col md:block">
          <div className="relative z-20 md:w-[55%] lg:w-[50%] mb-8 md:mb-0 pointer-events-none">
            <h1 className="h-title text-slate-900 font-semibold text-[clamp(36px,4.2vw,68px)] leading-[1.05] tracking-tight drop-shadow-sm pr-4">Precision engineering for residential and commercial spaces.</h1>
          </div>
          
          <div className="relative z-0 md:absolute md:-top-16 md:right-[-4%] md:w-[58%] lg:w-[55%]">
             <Plate cap="MM Residence" idx="FIG. 01" src={GALLERY_DATA['3_mm_residence_completed']?.coverImage} className="h-plate aspect-[4/3] md:aspect-[16/10] w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]" />
          </div>

          <div className="relative z-10 md:w-[65%] lg:w-[55%] md:mt-[6%]">
             <div className="h-box bg-white/90 backdrop-blur-xl border border-line p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] pointer-events-auto mt-6 md:mt-0 relative">
                <p className="h-sub text-[16.5px] text-slate-600 leading-relaxed max-w-[50ch]">We design and construct premium residential and commercial projects up to G+5 across Tamil Nadu. From the first architectural drawing to the final handover, we deliver uncompromised quality.</p>
                <div className="h-act flex flex-col sm:flex-row items-center gap-6 mt-10">
                  <Link href="/contact" className="btn btn-cta w-full sm:w-auto text-center px-8 py-3.5">Request a consultation</Link>
                  <Link href="/projects" className="tlink dark font-medium">View selected work →</Link>
                </div>
                <div className="h-meta mt-10 pt-6 border-t border-line/60 text-[12.5px] tracking-[.08em] text-slate-500 uppercase font-medium">Kumbakonam &nbsp;·&nbsp; Kovilpatti &nbsp;·&nbsp; Tamil Nadu</div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
