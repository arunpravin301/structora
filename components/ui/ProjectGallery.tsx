"use client";
import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import Image from "next/image";
export default function ProjectGallery({isOpen,onClose,images,startIndex=0}:{isOpen:boolean;onClose:()=>void;images:string[];startIndex?:number}){
 const [current,setCurrent]=useState(Math.min(startIndex,Math.max(0,images.length-1))),[failedSrc,setFailedSrc]=useState("");const dialog=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!isOpen||!images.length)return;const previous=document.activeElement as HTMLElement|null;const old=document.body.style.overflow;document.body.style.overflow="hidden";
 const background=Array.from(document.body.children).filter((e):e is HTMLElement=>e instanceof HTMLElement&&!e.hasAttribute("data-gallery-root"));const states=background.map(e=>[e,e.inert] as const);states.forEach(([e])=>e.inert=true);
 dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
 const key=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose();if(e.key==="ArrowRight")setCurrent(n=>(n+1)%images.length);if(e.key==="ArrowLeft")setCurrent(n=>(n+images.length-1)%images.length);if(e.key==="Tab"){const all=dialog.current?.querySelectorAll<HTMLButtonElement>("button");if(!all?.length)return;const first=all[0],last=all[all.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
 document.addEventListener("keydown",key);return()=>{document.removeEventListener("keydown",key);document.body.style.overflow=old;states.forEach(([e,inert])=>e.inert=inert);previous?.focus();};},[isOpen,images.length,onClose]);
 if(!isOpen||!images.length)return null;
 return createPortal(<div data-gallery-root ref={dialog} role="dialog" aria-modal="true" aria-label="Project photographs" className="fixed inset-0 z-[500] bg-slate-900/95 text-white flex items-center justify-center" onClick={onClose}>
 <button type="button" className="absolute right-4 top-4 w-12 h-12 text-3xl z-20" aria-label="Close gallery" onClick={onClose}>×</button>
 <button type="button" className="absolute left-2 z-20 w-12 h-12 bg-black/60 text-3xl" aria-label="Previous photo" onClick={e=>{e.stopPropagation();setCurrent(n=>(n+images.length-1)%images.length);}}>‹</button>
 <div className="relative w-[82vw] h-[78dvh]" onClick={e=>e.stopPropagation()}>{failedSrc===images[current]?<p role="alert">This photograph could not load. Try another photo.</p>:<Image key={images[current]} src={images[current]} alt={"Project photograph "+(current+1)} fill sizes="82vw" className="object-contain" onError={()=>setFailedSrc(images[current])} />}</div>
 <button type="button" className="absolute right-2 z-20 w-12 h-12 bg-black/60 text-3xl" aria-label="Next photo" onClick={e=>{e.stopPropagation();setCurrent(n=>(n+1)%images.length);}}>›</button><p aria-live="polite" className="absolute bottom-6">{current+1} / {images.length}</p></div>,document.body);
}

