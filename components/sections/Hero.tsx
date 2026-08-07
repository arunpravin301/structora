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
      tl.from(".h-title", { y: 40, opacity: 0, duration: 1 })
        .from(".h-box", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".h-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
        .from(".h-act", { y: 15, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".h-meta", { opacity: 0, duration: 0.6 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={root} className="relative min-h-[100vh] flex items-center justify-center pt-[100px] pb-[80px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/projects/hero_bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Premium Gradient Overlay for Text Contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90" />
      <div className="absolute top-0 left-1/2 z-0 w-[1000px] h-[1000px] bg-brand/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <Container className="relative z-[2] w-full h-full flex flex-col justify-center">
        <div className="relative z-20 max-w-[900px]">
          <h1 
            className="h-title font-outfit text-white font-bold text-[clamp(42px,5.5vw,76px)] leading-[1.1] tracking-tight max-w-[18ch]"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(0,0,0,0.9))" }}
          >
            Precision engineering for <em className="font-serif italic font-medium text-amber-400 tracking-normal pr-1">residential & commercial</em> spaces.
          </h1>
        </div>
        
        <div className="relative z-30 max-w-2xl mt-10">
           <div className="h-box pointer-events-auto">
              <p 
                className="h-sub font-inter text-[19px] md:text-[23px] text-white leading-[1.6] max-w-[48ch] font-medium"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(0,0,0,0.9))" }}
              >
                We design and construct premium residential and Multi-storey Buildings across Tamil Nadu. From the first architectural drawing to the final handover, we deliver uncompromised quality.
              </p>
              
              <div className="h-act flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-14">
                <Link href="/contact" className="btn bg-white text-slate-900 hover:bg-white/90 w-full sm:w-auto text-center px-10 py-4.5 text-[15.5px] font-medium shadow-2xl transition-all duration-400 hover:scale-[1.03] active:scale-[0.98]">
                  Request a consultation
                </Link>
                <Link href="/projects" className="relative group text-white font-medium transition-colors drop-shadow-md py-4 px-2 flex items-center gap-3">
                  <span className="relative z-10 text-[15.5px]">View selected work</span>
                  <div className="w-8 h-[1px] bg-white/40 group-hover:w-12 group-hover:bg-white transition-all duration-400"></div>
                </Link>
              </div>
              
              {/* Location tags below CTA */}
              <div className="h-meta mt-16 flex flex-wrap items-center gap-5">
                {[
                  "Kumbakonam",
                  "Kovilpatti",
                  "Tiruvannamalai",
                  "Tamil Nadu"
                ].map((loc, i) => (
                  <div key={loc} className="flex items-center gap-5">
                    <span className="text-[12px] tracking-[.15em] text-white/50 uppercase font-semibold">{loc}</span>
                    {i !== 3 && <div className="w-1 h-1 rounded-full bg-white/20" />}
                  </div>
                ))}
              </div>
           </div>
        </div>
      </Container>
    </section>
  );
}
