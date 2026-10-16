"use client";
import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

export interface TransformItem {
  id: string;
  num: string;
  title: string;
  location: string;
  subtitle: string;
  beforeSrc: string;
  afterSrc: string;
}

const DEFAULT_ITEMS: TransformItem[] = [
  {
    id: "balaji",
    num: "01",
    title: "Balaji Abode",
    location: "Kumbakonam",
    subtitle: "3D Architectural Render vs. Completed Handover",
    beforeSrc: "/projects/2_balaji_residence_completed_cover.webp",
    afterSrc: "/projects/2_balaji_residence_completed_final.webp"
  },
  {
    id: "zaheer",
    num: "02",
    title: "Zaheer Residence",
    location: "Tiruvannamalai",
    subtitle: "3D Architectural Render vs. Site Execution",
    beforeSrc: "/projects/1_zaheer_residence_ongoing_cover.webp",
    afterSrc: "/projects/zaheer_execution.jpeg"
  }
];

interface TransformRevealProps {
  items?: TransformItem[];
  beforeSrc?: string;
  afterSrc?: string;
  label?: string;
  subtitle?: string;
}

export default function TransformReveal({ items = DEFAULT_ITEMS }: TransformRevealProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);

  const current = items[activeIdx] || items[0];

  // Continuous smooth auto-gliding wipe when not interacting
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isInteracting || dragging) return;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // Complete one full back-and-forth cycle roughly every 7 seconds
      phaseRef.current += dt * 0.9;
      // Sine wave oscillating smoothly between 12% and 88%
      const nextPos = 50 + Math.sin(phaseRef.current) * 38;
      setPos(nextPos);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInteracting, dragging, activeIdx]);

  const updatePosFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, raw));
    setPos(clamped);
    // Sync phase so auto-glide resumes smoothly from current position
    const norm = Math.max(-1, Math.min(1, (clamped - 50) / 38));
    phaseRef.current = Math.asin(norm);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setIsInteracting(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updatePosFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const setManualPosition = (target: number) => {
    setIsInteracting(true);
    setPos(target);
    const norm = Math.max(-1, Math.min(1, (target - 50) / 38));
    phaseRef.current = Math.asin(norm);
  };

  return (
    <div className="max-w-[920px] mx-auto">
      {/* Project Switcher Tabs */}
      {items.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-7">
          {items.map((item, idx) => {
            const active = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setIsInteracting(false);
                }}
                className={`px-6 py-3.5 border font-outfit text-left transition-all flex items-center gap-3.5 ${
                  active
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-700 border-line hover:border-slate-400"
                }`}
              >
                <span
                  className={`text-xs font-bold tracking-widest uppercase px-2 py-0.5 ${
                    active ? "bg-brand text-white" : "bg-mist text-slate-500"
                  }`}
                >
                  {item.num}
                </span>
                <div>
                  <div className="text-sm font-semibold tracking-wide">
                    {item.title}
                  </div>
                  <div
                    className={`text-[11px] uppercase tracking-wider ${
                      active ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {item.location}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Prominent Architectural Frame */}
      <div
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => {
          if (!dragging) setIsInteracting(false);
        }}
        className="bg-white p-4 sm:p-6 border border-line shadow-xl"
      >
        {/* Framed Image Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="group relative w-full aspect-[16/10] overflow-hidden bg-slate-900 select-none cursor-ew-resize touch-pan-y border border-line/70"
        >
          {/* BEFORE Layer (3D Design Render) */}
          <div className="absolute inset-0 z-[1]">
            <Image
              key={current.beforeSrc}
              src={current.beforeSrc}
              alt={`${current.title} — 3D Design Render`}
              fill
              sizes="(max-width: 960px) 100vw, 900px"
              priority
              className="object-cover pointer-events-none"
            />
            <span className="absolute top-4 right-4 text-[11px] font-outfit font-semibold tracking-[.16em] uppercase text-white bg-slate-900/85 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 z-10 shadow-sm">
              3D Design
            </span>
          </div>

          {/* AFTER Layer (Site Execution, clipped left-to-right) */}
          <div
            className="absolute inset-0 z-[2]"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              key={current.afterSrc}
              src={current.afterSrc}
              alt={`${current.title} — Site Execution`}
              fill
              sizes="(max-width: 960px) 100vw, 900px"
              priority
              className="object-cover pointer-events-none"
            />
            <span className="absolute top-4 left-4 text-[11px] font-outfit font-semibold tracking-[.16em] uppercase text-white bg-brand px-3.5 py-1.5 z-10 shadow-sm">
              Real Execution
            </span>
          </div>

          {/* Vertical Divider Line & Drag Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2.5px] bg-white z-[3] pointer-events-none"
            style={{
              left: `${pos}%`,
              boxShadow: "0 0 16px rgba(0,0,0,0.55)"
            }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand text-white border-2 border-white shadow-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 21 12 15 6" />
                <polyline points="9 6 3 12 9 18" />
              </svg>
            </div>
          </div>

          {/* Accessible keyboard range input */}
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            aria-label={`Compare 3D design and site execution for ${current.title}`}
            onChange={(e) => setManualPosition(Number(e.target.value))}
            className="sr-only"
          />
        </div>

        {/* Architectural Frame Footer Bar */}
        <div className="pt-5 pb-1 px-1 flex flex-wrap items-center justify-between gap-4 border-t border-line mt-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="font-outfit font-bold text-[19px] text-slate-900 tracking-tight">
                {current.title} · {current.location}
              </span>
            </div>
            <div className="text-[13.5px] text-slate mt-0.5 pl-4">
              {current.subtitle} — <span className="text-slate-900 font-medium">Drag handle to inspect</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setManualPosition(100)}
              className={`px-3.5 py-1.5 text-[11px] font-outfit font-semibold uppercase tracking-wider border transition-colors ${
                pos >= 75
                  ? "bg-brand text-white border-brand"
                  : "bg-mist text-slate-700 border-line hover:border-slate-400"
              }`}
            >
              Real Execution
            </button>
            <button
              type="button"
              onClick={() => setManualPosition(50)}
              className={`px-3.5 py-1.5 text-[11px] font-outfit font-semibold uppercase tracking-wider border transition-colors ${
                pos > 25 && pos < 75
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-mist text-slate-700 border-line hover:border-slate-400"
              }`}
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => setManualPosition(0)}
              className={`px-3.5 py-1.5 text-[11px] font-outfit font-semibold uppercase tracking-wider border transition-colors ${
                pos <= 25
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-mist text-slate-700 border-line hover:border-slate-400"
              }`}
            >
              3D Render
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
