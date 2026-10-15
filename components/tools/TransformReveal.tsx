"use client";
import Image from "next/image";
import {useId,useState} from "react";
export default function TransformReveal({beforeSrc="/projects/1_zaheer_residence_ongoing_cover.webp",afterSrc="/projects/1_zaheer_residence_ongoing_15.webp",label="Zaheer Residence · Tiruvannamalai"}:{beforeSrc?:string;afterSrc?:string;label?:string;subtitle?:string}){
 const [value,setValue]=useState(50);const id=useId();
 return <figure className="max-w-wrap mx-auto px-6 mb-12"><div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden"><Image src={beforeSrc} alt={label+" — design"} fill sizes="(max-width:1240px) 100vw, 1240px" className="object-cover" /><div className="absolute inset-0" style={{clipPath:`inset(0 ${100-value}% 0 0)`}}><Image src={afterSrc} alt={label+" — site execution"} fill sizes="(max-width:1240px) 100vw, 1240px" className="object-cover" /></div><div className="absolute inset-y-0 border-l-2 border-white" style={{left:value+"%"}} /><span className="absolute top-4 left-4 bg-black/80 text-white text-xs p-2">Execution</span><span className="absolute top-4 right-4 bg-black/80 text-white text-xs p-2">Design</span></div><figcaption className="py-5"><p className="font-medium mb-2">{label}</p><label htmlFor={id} className="text-sm">Compare design and execution — drag or use arrow keys</label><input id={id} type="range" min={0} max={100} value={value} aria-valuetext={value+" percent execution photograph"} onChange={e=>setValue(Number(e.target.value))} /></figcaption></figure>;
}

