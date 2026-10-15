import Image from "next/image";
export default function Plate({cap,idx="",className="",src=""}:{cap:string;idx?:string;className?:string;src?:string}){
 return <div className={`plate ${className}`}>{src?<Image src={src} alt={cap} fill sizes="(max-width:768px) 100vw, (max-width:1240px) 50vw, 620px" className="object-cover" />:<div className="absolute inset-0 flex items-center justify-center text-white">Photograph coming soon</div>}<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" /><div className="cap">{cap}</div>{idx&&<div className="idx">{idx}</div>}</div>;
}

