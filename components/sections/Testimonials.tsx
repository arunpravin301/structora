"use client";
import Reveal from "@/components/ui/Reveal";

const TESTIMONIALS = [
  { name: "Srinivasan", type: "Residential Project", quote: "Structora brought a level of engineering discipline to our home build that we didn't think was possible outside of massive corporate projects. Every stage was transparent." },
  { name: "Karthik Raj", type: "Commercial Complex", quote: "Delivering a G+3 commercial building on schedule is rare in this market. The engineers at Structora handled the structural complexities perfectly and kept us updated weekly." },
  { name: "Priya Anand", type: "Multi-floor Residence", quote: "We wanted a builder we could trust with our savings. From the soil test to the final fittings, they never compromised on quality. It's truly a home built to last." }
];

export default function Testimonials() {
  return (
    <div className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-6">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={i}>
          <div className="bg-white border border-line p-8 h-full flex flex-col shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)]">
            <svg className="w-8 h-8 text-brand/30 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            <p className="text-[16px] text-slate-500 leading-relaxed font-medium mb-8 grow">"{t.quote}"</p>
            <div>
              <div className="font-outfit font-semibold text-slate-900 text-[19px]">{t.name}</div>
              <div className="text-[12px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">{t.type}</div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
