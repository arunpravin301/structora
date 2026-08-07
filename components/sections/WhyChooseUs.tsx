"use client";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  { num: "01", title: "Engineer-Led Construction", desc: "No middle-men. Our site engineers supervise day-to-day activity directly, ensuring the architectural and structural drawings are executed flawlessly." },
  { num: "02", title: "Corporate-Grade Quality", desc: "We bring large-scale commercial standards to residential builds. From rigorous soil testing to advanced concrete mixes, durability is engineered in." },
  { num: "03", title: "Absolute Transparency", desc: "You receive detailed material schedules, verified brand lists (JSW, UltraTech, Dalmia), and weekly progress updates. No hidden costs." },
  { num: "04", title: "Affordable Pricing", desc: "We provide highly competitive pricing packages without ever compromising on the quality of materials, structure, or workmanship." },
  { num: "05", title: "On-Time Handover", desc: "We utilize strict project management timelines common in the commercial sector to ensure your residential or multi-storey project finishes on schedule." }
];

export default function WhyChooseUs() {
  return (
    <div className="grid grid-cols-5 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
      {REASONS.map((r, i) => (
        <Reveal key={i}>
          <div className="border-t-2 border-slate-900 pt-5">
            <div className="font-outfit text-sm text-brand font-semibold">{r.num}</div>
            <h3 className="text-[20px] font-semibold mt-3 mb-3 text-slate-900">{r.title}</h3>
            <p className="text-[15.5px] text-slate-500 leading-relaxed">{r.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
