"use client";
import {useRef,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
export default function Hero(){
 const video=useRef<HTMLVideoElement>(null);const [playing,setPlaying]=useState(false);
 async function toggle(){if(playing){video.current?.pause();setPlaying(false);}else{try{await video.current?.play();setPlaying(true);}catch{setPlaying(false);}}}
 return <section className="relative min-h-[90svh] flex items-center pt-36 pb-20 overflow-hidden"><Image src="/projects/2_balaji_residence_completed_final.webp" alt="Completed Structora residence" fill priority sizes="100vw" className="object-cover" /><video ref={video} muted loop playsInline preload="none" poster="/projects/2_balaji_residence_completed_final.webp" className={`absolute inset-0 w-full h-full object-cover ${playing?"opacity-100":"opacity-0"}`}><source src="/projects/hero_bg.mp4" type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" /><Container className="relative z-10"><p className="text-white/90 text-sm tracking-widest uppercase mb-7">Structora India · Tamil Nadu</p><h1 className="text-white text-[clamp(38px,5.5vw,76px)] leading-[1.1] max-w-[18ch]">Precision engineering for residential & commercial spaces.</h1><p className="text-white text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">Plan your build with engineers you can meet. Residential and commercial construction, with offices in Kumbakonam and Kovilpatti.</p><div className="flex flex-wrap gap-6 mt-10"><Link href="/contact" className="btn bg-white text-slate-900">Discuss your project</Link><Link href="/projects" className="btn border-white/70 text-white">View selected work</Link></div><button type="button" aria-pressed={playing} onClick={toggle} className="text-white underline underline-offset-4 mt-10 text-sm">{playing?"Pause site film":"Play site film"}</button></Container></section>;
}

