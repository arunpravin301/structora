import Link from "next/link";
import { site } from "@/config/site";

export default function ServiceIndex() {
  return (
    <div className="relative z-10">
      {site.services.map((s) => (
        <Link 
          key={s.slug} 
          href={`/services/${s.slug}`}
          className="grid grid-cols-[84px_1.1fr_1.5fr_40px] max-[600px]:grid-cols-[46px_1fr] items-center gap-6 py-[42px] px-3.5 border-t border-line last:border-b"
        >
          <span className="font-outfit text-[17px] text-slatel">{s.num}</span>
          <span className="font-outfit font-semibold text-[clamp(28px,3.5vw,42px)] tracking-tight text-slate-900">{s.name}</span>
          <span className="text-[16px] text-slate max-w-[44ch] max-[600px]:hidden">{s.desc}</span>
          <span className="text-xl text-slatel justify-self-end max-[600px]:hidden">→</span>
        </Link>
      ))}
    </div>
  );
}
