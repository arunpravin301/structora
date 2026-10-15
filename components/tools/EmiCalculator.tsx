"use client";
import {useState} from "react";
import {emi} from "@/lib/calculations";
export default function EmiCalculator(){
 const [p,setP]=useState("2500000"),[r,setR]=useState("8.5"),[n,setN]=useState("15");
 const result=emi(Number(p),r===""?NaN:Number(r),Number(n));
 return <div className="grid lg:grid-cols-2 border border-line bg-white"><div className="p-6 md:p-10 space-y-6">
 <label className="block">Loan amount (₹)<input className="field mt-2" type="number" min={10000} max={100000000} value={p} onChange={e=>setP(e.target.value)} /></label>
 <label className="block">Annual interest rate (%)<input className="field mt-2" type="number" min={0} max={30} step={0.1} value={r} onChange={e=>setR(e.target.value)} /></label>
 <label className="block">Loan term (whole years)<input className="field mt-2" type="number" min={1} max={50} value={n} onChange={e=>setN(e.target.value)} /></label>
 </div><div className="bg-mist p-6 md:p-10"><h3 className="text-xl mb-5">Estimated monthly repayment</h3><p aria-live="polite" className="text-3xl font-outfit">{result===null?"Check your inputs":"₹"+result.toLocaleString("en-IN")}</p><p className="text-sm text-slate mt-6">Illustrative fixed-rate calculation only. Loan amount: ₹10,000–₹10 crore; rate: 0–30%; term: 1–50 years. Lender fees, insurance and changes in interest rates are excluded. This is not a loan offer.</p></div></div>;
}

