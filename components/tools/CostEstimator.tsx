"use client";
import {useState} from "react";
import Link from "next/link";
import pricing from "@/config/pricing.json";
import {cost} from "@/lib/calculations";
type District=keyof typeof pricing;
export default function CostEstimator({location,onLocationChange}:{location?:District;onLocationChange?:(d:District)=>void}){
 const [localDistrict,setLocalDistrict]=useState<District>("Kumbakonam"),[area,setArea]=useState("1200"),[tier,setTier]=useState<"basic"|"standard"|"premium"|"luxury">("basic");
 const district=location||localDistrict,setDistrict=onLocationChange||setLocalDistrict;
 const rate=Number(pricing[district].basePrices[tier]),total=cost(Number(area),rate);
 return <div className="grid lg:grid-cols-2 border border-line bg-white"><div className="p-6 md:p-10 space-y-6">
 <label className="block">Location<select className="field mt-2" value={district} onChange={e=>setDistrict(e.target.value as District)}>{Object.keys(pricing).map(d=><option key={d} value={d}>{d==="KovilPatti"?"Kovilpatti":d}</option>)}</select></label>
 <label className="block">Total built-up area (sq ft)<input type="number" min={300} max={100000} value={area} onChange={e=>setArea(e.target.value)} className="field mt-2" /></label>
 <label className="block">Package<select className="field mt-2" value={tier} onChange={e=>setTier(e.target.value as typeof tier)}>{(["basic","standard","premium","luxury"] as const).map((t,i)=><option key={t} value={t}>{["Essential","Classic","Premium","Prestige"][i]}</option>)}</select></label>
 </div><div className="p-6 md:p-10 bg-mist"><h3 className="text-xl mb-5">Indicative construction budget</h3><div aria-live="polite">{total===null?<p>Enter a built-up area between 300 and 100,000 sq ft.</p>:<><p className="text-3xl font-outfit">₹{total.toLocaleString("en-IN")}</p><p className="mt-3 text-sm">At ₹{rate.toLocaleString("en-IN")} per sq ft</p></>}</div><p className="text-sm text-slate mt-6 leading-relaxed">A planning estimate, not a quotation. Final cost depends on drawings, site conditions and agreed scope. Confirm taxes, approvals, external works and other exclusions with our team.</p><Link href="/contact" className="btn btn-fill mt-8">Discuss this estimate</Link></div></div>;
}

