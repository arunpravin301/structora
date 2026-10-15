"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {site} from "@/config/site";
export default function Header(){
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);const button=useRef<HTMLButtonElement>(null),nav=useRef<HTMLElement>(null);const path=usePathname();
 useEffect(()=>{const on=()=>setScrolled(window.scrollY>30);on();window.addEventListener("scroll",on,{passive:true});return()=>window.removeEventListener("scroll",on);},[]);
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow="hidden";nav.current?.querySelector("a")?.focus();
 const key=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);button.current?.focus();}if(e.key==="Tab"){const links=nav.current?.querySelectorAll<HTMLAnchorElement>("a");if(!links?.length)return;const first=links[0],last=links[links.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();button.current?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();button.current?.focus();}else if(document.activeElement===button.current){e.preventDefault();(e.shiftKey?last:first).focus();}}};
 const resize=()=>{if(window.innerWidth>=1280)setOpen(false);};window.addEventListener("keydown",key);window.addEventListener("resize",resize);return()=>{document.body.style.overflow=old;window.removeEventListener("keydown",key);window.removeEventListener("resize",resize);};},[open]);
 const dark=!scrolled&&!open;
 return <header className={`fixed inset-x-0 top-0 z-[100] border-b ${dark?"border-transparent":"bg-white border-line"}`}><div className="max-w-wrap mx-auto px-6 md:px-10 h-[82px] flex items-center justify-between gap-6">
 <Link href="/" className="shrink-0" aria-label="Structora India home"><Image src={dark?"/logo/logo-dark.png":"/logo/logo-light.png"} width={168} height={36} alt="Structora India" priority className="w-[150px] sm:w-[168px] h-auto" /></Link>
 <nav ref={nav} id="main-navigation" aria-label="Main" className={`${open?"flex absolute top-[82px] inset-x-0 flex-col bg-white px-6 py-4 max-h-[calc(100dvh-82px)] overflow-y-auto":"hidden"} xl:flex xl:static xl:flex-row xl:gap-6 xl:p-0 xl:bg-transparent`}>{site.nav.map(n=><Link key={n.href} href={n.href} onClick={()=>setOpen(false)} aria-current={path===n.href?"page":undefined} className={`py-3 xl:py-2 text-sm ${dark?"text-white":"text-slate-900"}`}>{n.label}</Link>)}</nav>
 <div className="flex gap-4 items-center"><Link href="/contact" className={`btn hidden sm:inline-flex whitespace-nowrap ${dark?"bg-white text-slate-900":"btn-cta"}`}>Discuss your project</Link><button ref={button} type="button" className={`xl:hidden w-11 h-11 text-2xl ${dark?"text-white":"text-slate-900"}`} aria-expanded={open} aria-controls="main-navigation" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?"×":"☰"}</button></div>
 </div></header>;
}

