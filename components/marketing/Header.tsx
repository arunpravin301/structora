"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

export default function Header() {
  const pathname = usePathname();
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

  const isDarkBg = !scrolled && !open;

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 border-b ${scrolled ? "bg-white/95 backdrop-blur-md border-line shadow-sm" : "border-transparent bg-transparent"} ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="mx-auto max-w-wrap px-10 max-[600px]:px-6 flex items-center justify-between h-[82px]">
        <Link href="/" className="flex items-center py-2 transition-opacity hover:opacity-90">
          <Image
            src={isDarkBg ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
            alt="Structora India Constructions"
            width={168}
            height={36}
            priority
            className="h-[34px] sm:h-[38px] w-auto object-contain transition-all duration-300"
          />
        </Link>
        <nav className={`${open ? "flex absolute top-[82px] inset-x-0 flex-col bg-white px-10 pb-6 border-b border-line shadow-md" : "hidden"} md:flex md:static md:flex-row md:gap-9 md:bg-transparent md:p-0 md:border-0`}>
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className={`relative text-sm py-3.5 md:py-1 border-b border-line md:border-0 transition-colors ${isDarkBg ? "text-white/80 hover:text-white" : "text-slate-500 hover:text-slate-900"} after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left`}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link href="/contact" className={`btn max-[600px]:hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] hover:shadow-lg ${isDarkBg ? "bg-white text-slate-900 hover:bg-white/90 hover:shadow-white/20" : "btn-cta hover:shadow-brand/20"}`}>Request a consultation</Link>
          <button className={`md:hidden text-2xl transition-colors ${isDarkBg ? "text-white" : "text-slate-900"}`} onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        </div>
      </div>
    </header>
  );
}
