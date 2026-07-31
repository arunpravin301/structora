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
        <div className="relative">
          <div className="relative z-10 md:w-[70%] mb-12 md:mb-0 pointer-events-none">
            <h1 className="h-title text-slate-900 font-semibold text-[clamp(36px,5vw,68px)] leading-[1.05] tracking-tight pr-4 drop-shadow-sm">Precision engineering for residential and commercial spaces.</h1>
          </div>
          
          <div className="relative z-0 md:absolute md:-top-12 md:right-0 md:w-[48%]">
             <Plate cap="Balaji Residence" idx="FIG. 01" src={GALLERY_DATA['2_balaji_residence_completed']?.coverImage} className="h-plate aspect-[16/11] w-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]" />
          </div>

          <div className="relative z-10 md:w-[48%] md:mt-[6%]">
             <div className="h-box bg-white border border-line p-8 md:p-11 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.1)]">
                <p className="h-sub text-[16.5px] text-slate-500 leading-relaxed">We design and construct premium residential and commercial projects up to G+5 across Tamil Nadu. From the first architectural drawing to the final handover, we deliver uncompromised quality.</p>
                <div className="h-act flex flex-col sm:flex-row items-center gap-6 mt-9">
                  <Link href="/contact" className="btn btn-cta w-full sm:w-auto text-center">Request a consultation</Link>
                  <Link href="/projects" className="tlink dark">View selected work →</Link>
                </div>
                <div className="h-meta mt-10 pt-5 border-t border-line text-[12.5px] tracking-[.06em] text-slate-500 uppercase">Kumbakonam &nbsp;·&nbsp; Kovilpatti &nbsp;·&nbsp; Tamil Nadu</div>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
