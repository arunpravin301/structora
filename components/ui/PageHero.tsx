import React from "react";
import Container from "./Container";

interface PageHeroProps {
  crumb?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  badge?: string;
}

export default function PageHero({ crumb, title, intro, badge }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-[180px] pb-[96px] max-[600px]:pt-[140px] max-[600px]:pb-[64px] bg-slate-950 text-white">
      {/* Cinematic Ambient Lighting & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft amber architectural aura */}
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-brand/20 via-amber-500/10 to-transparent rounded-full blur-[140px]" />
        
        {/* Subtle grid pattern for architectural precision feel */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Bottom subtle edge shadow to softly transition into the page */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/60 to-transparent" />
      </div>

      <Container className="relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
          <div className="max-w-[780px]">
            {/* Elegant Breadcrumb Pill */}
            {crumb && (
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-outfit text-xs font-semibold tracking-[0.16em] uppercase text-slate-300">
                  {crumb}
                </span>
              </div>
            )}

            {/* High-Impact Architectural Title */}
            <h1 
              className="font-outfit font-bold text-white text-[clamp(36px,4.8vw,62px)] leading-[1.14] tracking-tight"
              style={{ textWrap: "balance" as any }}
            >
              {title}
            </h1>

            {/* Subtitle / Intro */}
            {intro && (
              <p className="text-slate-300 text-lg md:text-xl font-normal max-w-[56ch] mt-6 leading-relaxed">
                {intro}
              </p>
            )}
          </div>

          {/* Architectural Confidence Badge on Right */}
          <div className="hidden lg:flex flex-col border-l border-white/10 pl-8 py-2 text-left shrink-0">
            <div className="font-outfit text-xs tracking-[0.2em] uppercase text-amber-400 font-semibold mb-2">
              Engineering Standard
            </div>
            <div className="font-outfit text-2xl font-bold text-white tracking-tight">
              Corporate Precision
            </div>
            <div className="text-xs text-slate-400 mt-1 max-w-[24ch] leading-relaxed">
              Strict civil standards, ultra-high-grade materials, and engineer-led site supervision.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
