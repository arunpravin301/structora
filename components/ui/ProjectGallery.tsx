"use client";
import { useState, useEffect } from "react";

export default function ProjectGallery({ isOpen, onClose, images, startIndex = 0 }: { isOpen: boolean; onClose: () => void; images: string[]; startIndex?: number }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    setCurrent(startIndex);
  }, [startIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-8 text-white/60 hover:text-white text-4xl font-light transition-colors">&times;</button>
      
      <button onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-6xl p-4 transition-colors">&lsaquo;</button>
      
      <div className="w-[90vw] h-[85vh] flex items-center justify-center pointer-events-none">
        <img 
          src={images[current]} 
          alt={`Gallery image ${current + 1}`} 
          className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl" 
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <button onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev + 1) % images.length); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-6xl p-4 transition-colors">&rsaquo;</button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[13px] font-outfit tracking-[0.2em]">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
