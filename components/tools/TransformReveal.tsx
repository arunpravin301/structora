"use client";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";

interface TransformRevealProps {
  beforeSrc?: string;
  afterSrc?: string;
  label?: string;
  subtitle?: string;
}

export default function TransformReveal({
  beforeSrc = "/projects/1_zaheer_residence_ongoing_cover.webp",
  afterSrc = "/projects/1_zaheer_residence_ongoing_15.webp",
  label = "Zaheer Residence · Tiruvannamalai",
  subtitle = "3D Architectural Render vs. Site Execution"
}: TransformRevealProps) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const updatePosFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, raw)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
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

  return (
    <div className="bg-white p-3.5 sm:p-5 border border-line shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Framed Image Stage */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="group relative w-full aspect-[16/10] overflow-hidden bg-slate-900 select-none cursor-ew-resize touch-pan-y border border-line/60"
      >
        {/* BEFORE Layer (Design Render) */}
        <div className="absolute inset-0 z-[1]">
          <Image
            src={beforeSrc}
            alt={`${label} — 3D Design Render`}
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-cover pointer-events-none"
          />
          <span className="absolute top-3.5 right-3.5 text-[10px] font-outfit font-semibold tracking-[.16em] uppercase text-white bg-slate-900/80 backdrop-blur-sm border border-white/15 px-3 py-1.5 z-10">
            Design
          </span>
        </div>

        {/* AFTER Layer (Execution Photo, clipped left-to-right) */}
        <div
          className="absolute inset-0 z-[2]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={afterSrc}
            alt={`${label} — Site Execution`}
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-cover pointer-events-none"
          />
          <span className="absolute top-3.5 left-3.5 text-[10px] font-outfit font-semibold tracking-[.16em] uppercase text-white bg-brand px-3 py-1.5 z-10 shadow-sm">
            Execution
          </span>
        </div>

        {/* Vertical Divider Line & Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white z-[3] pointer-events-none"
          style={{
            left: `${pos}%`,
            boxShadow: "0 0 12px rgba(0,0,0,0.45)"
          }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand text-white border-2 border-white shadow-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <svg
              width="16"
              height="16"
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
          aria-label={`Compare design and execution for ${label}`}
          onChange={(e) => setPos(Number(e.target.value))}
          className="sr-only"
        />
      </div>

      {/* Architectural Frame Footer Bar */}
      <div className="pt-4 pb-1 px-1 flex items-center justify-between gap-4 border-t border-line/60 mt-3.5">
        <div>
          <div className="font-outfit font-bold text-[17px] text-slate-900 tracking-tight">
            {label}
          </div>
          <div className="text-[13px] text-slate mt-0.5">{subtitle}</div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setPos(100)}
            className={`px-2.5 py-1 text-[10px] font-outfit font-semibold uppercase tracking-wider border transition-colors ${
              pos >= 75
                ? "bg-brand text-white border-brand"
                : "bg-mist text-slate-700 border-line hover:border-slate-400"
            }`}
          >
            Built
          </button>
          <button
            type="button"
            onClick={() => setPos(50)}
            className={`px-2.5 py-1 text-[10px] font-outfit font-semibold uppercase tracking-wider border transition-colors ${
              pos > 25 && pos < 75
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-mist text-slate-700 border-line hover:border-slate-400"
            }`}
          >
            50/50
          </button>
          <button
            type="button"
            onClick={() => setPos(0)}
            className={`px-2.5 py-1 text-[10px] font-outfit font-semibold uppercase tracking-wider border transition-colors ${
              pos <= 25
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-mist text-slate-700 border-line hover:border-slate-400"
            }`}
          >
            Render
          </button>
        </div>
      </div>
    </div>
  );
}
