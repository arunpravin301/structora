"use client";
import { useRef, useState } from "react";

export default function BeforeAfter() {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const drag = useRef(false);
  function set(clientX: number) {
    const el = wrap.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }
  return (
    <div ref={wrap}
      className="relative max-w-[1000px] mx-auto aspect-[16/9] overflow-hidden border border-line select-none cursor-ew-resize touch-none"
      onMouseDown={(e) => { drag.current = true; set(e.clientX); }}
      onMouseMove={(e) => drag.current && set(e.clientX)}
      onMouseUp={() => (drag.current = false)}
      onMouseLeave={() => (drag.current = false)}
      onTouchStart={(e) => set(e.touches[0].clientX)}
      onTouchMove={(e) => set(e.touches[0].clientX)}>
      <div className="absolute inset-0 flex items-center justify-center text-[12px] tracking-[.18em] uppercase text-slatel"
        style={{ background: "linear-gradient(140deg,#1B3E6F,#102844)" }}>After</div>
      <div className="absolute inset-0 flex items-center justify-center text-[12px] tracking-[.18em] uppercase text-slatel"
        style={{ background: "linear-gradient(140deg,#10202F,#070F18)", clipPath: `inset(0 ${100 - pos}% 0 0)` }}>Before</div>
      <span className="absolute top-4 left-4 text-[10px] tracking-[.15em] uppercase text-white bg-black/40 px-2.5 py-1">Before</span>
      <span className="absolute top-4 right-4 text-[10px] tracking-[.15em] uppercase text-white bg-black/40 px-2.5 py-1">After</span>
      <div className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center text-navy shadow-lg">⟷</div>
      </div>
    </div>
  );
}
