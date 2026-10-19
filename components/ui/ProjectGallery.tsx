"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

export default function ProjectGallery({ isOpen, onClose, images, startIndex = 0 }: { isOpen: boolean; onClose: () => void; images: string[]; startIndex?: number }) {
  const [current, setCurrent] = useState(startIndex);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Eager preloading for instantaneous navigation
  useEffect(() => {
    if (!isOpen || !images || images.length === 0) return;

    const preload = (src: string) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
      };
    };

    // Preload current, next, and previous photos immediately
    const nextIdx = (current + 1) % images.length;
    const prevIdx = current === 0 ? images.length - 1 : current - 1;
    preload(images[current]);
    preload(images[nextIdx]);
    preload(images[prevIdx]);

    // Preload all remaining gallery images quietly in the background
    const timer = setTimeout(() => {
      images.forEach((src) => preload(src));
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen, current, images]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      setCurrent((prev) => (prev + 1) % images.length);
    } else if (diff < -50) {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    setTouchStart(null);
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentSrc = images[current];
  const isLoaded = !!loadedImages[currentSrc];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md select-none" 
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button 
        onClick={onClose} 
        aria-label="Close gallery"
        className="absolute top-6 right-8 text-white/60 hover:text-white text-4xl font-light transition-colors z-10"
      >
        &times;
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }} 
        aria-label="Previous photo"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-6xl p-4 transition-colors z-10"
      >
        &lsaquo;
      </button>
      
      <div className="relative w-[90vw] h-[85vh] flex items-center justify-center pointer-events-none">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <img 
          key={currentSrc}
          src={currentSrc} 
          alt={`Gallery image ${current + 1}`} 
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [currentSrc]: true }))}
          className={`max-w-full max-h-full object-contain pointer-events-auto shadow-2xl transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); setCurrent((prev) => (prev + 1) % images.length); }} 
        aria-label="Next photo"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-6xl p-4 transition-colors z-10"
      >
        &rsaquo;
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[13px] font-outfit tracking-[0.2em] pointer-events-none">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
