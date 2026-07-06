"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y > lastY && y > 100 && !open) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [open]);

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 border-b ${scrolled ? "bg-ink/90 backdrop-blur-md border-lined" : "border-transparent"} ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto max-w-wrap px-10 max-[600px]:px-6 flex items-center justify-between h-[82px]">
        <Link href="/" className="font-fr font-semibold text-[22px] tracking-[.05em] text-white leading-none">
          STRUCTORA<small className="block font-gs font-normal text-[8.5px] tracking-[.26em] text-slatel mt-[3px]">INDIA CONSTRUCTIONS</small>
        </Link>
        <nav className={`${open ? "flex absolute top-[82px] inset-x-0 flex-col bg-ink px-10 pb-6 border-b border-lined" : "hidden"} md:flex md:static md:flex-row md:gap-9 md:bg-transparent md:p-0 md:border-0`}>
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="text-sm text-white/80 hover:text-white py-3.5 md:py-0 border-b border-lined md:border-0">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/contact" className="btn btn-cta max-[600px]:hidden">Request a consultation</Link>
          <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        </div>
      </div>
    </header>
  );
}
