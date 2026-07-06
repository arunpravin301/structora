"use client";

import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Production-standard smooth scroll config

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
