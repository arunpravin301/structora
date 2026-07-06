"use client";
import { useState } from "react";
import { site } from "@/config/site";

export default function CostEstimator() {
  const [dist, setDist] = useState("Kumbakonam");
  const [area, setArea] = useState("");
  const [pkg, setPkg] = useState("Basic");
  const [res, setRes] = useState<string | null>(null);

  function estimate() {
    const a = parseFloat(area);
    if (!a || a <= 0) { setRes("Please enter a plot area"); return; }
    const base = a * site.estimatorRates[dist] * site.packageMultiplier[pkg];
    const lo = Math.round(base * 0.95).toLocaleString("en-IN");
    const hi = Math.round(base * 1.1).toLocaleString("en-IN");
    setRes(`₹${lo} – ₹${hi}`);
  }

  return (
    <div className="border border-line p-10 bg-white">
      <div className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-5 items-end">
        <div><label className="block text-xs tracking-wide text-slate mb-2">District</label>
          <select className="field" value={dist} onChange={(e) => setDist(e.target.value)}>
            {site.offices.map((o) => <option key={o}>{o}</option>)}
          </select></div>
        <div><label className="block text-xs tracking-wide text-slate mb-2">Plot area (sq ft)</label>
          <input className="field" type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. 1200" /></div>
        <div><label className="block text-xs tracking-wide text-slate mb-2">Package</label>
          <select className="field" value={pkg} onChange={(e) => setPkg(e.target.value)}>
            {Object.keys(site.packageMultiplier).map((p) => <option key={p}>{p}</option>)}
          </select></div>
      </div>
      <button className="btn btn-cta mt-6" onClick={estimate}>Estimate cost</button>
      {res && (
        <div className="mt-6 p-7 bg-ink text-white">
          <div className="text-[13px] text-slatel">Estimated construction cost, {dist} · {pkg}</div>
          <div className="font-fr font-semibold text-[34px] mt-1.5">{res}</div>
          <div className="text-[13px] text-slatel mt-2.5 italic">Based on Structora&rsquo;s current starting rates. Your final price follows a detailed, itemised estimate.</div>
        </div>
      )}
    </div>
  );
}
