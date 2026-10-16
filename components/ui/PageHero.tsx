import React from "react";
import Container from "./Container";

interface PageHeroProps {
  crumb?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
}

export default function PageHero({ title, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-[180px] pb-[90px] max-[600px]:pt-[140px] max-[600px]:pb-[60px] bg-slate-900 text-white border-b border-white/[0.08]">
      {/* Subtle organic warmth - no artificial tech grids or pulsing dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] left-0 w-[600px] h-[500px] bg-brand/[0.08] rounded-full blur-[150px]" />
        <div className="absolute -bottom-[20%] right-0 w-[500px] h-[400px] bg-brand/[0.05] rounded-full blur-[140px]" />
      </div>

      <Container className="relative z-[2]">
        <div className="max-w-[880px]">
          {/* Direct, confident editorial heading - no pill or eyebrow */}
          <h1 
            className="font-outfit font-bold text-white text-[clamp(36px,5vw,64px)] leading-[1.12] tracking-tight"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>

          {/* Clean, editorial introductory text */}
          {intro && (
            <p className="text-slate-300 text-lg md:text-xl font-normal max-w-[56ch] mt-7 leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
