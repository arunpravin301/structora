"use client";
import React, { useState, useMemo } from "react";
import pricingDataRaw from "@/config/pricing.json";

type LocationPricingData = {
  basePrices?: Record<string, string>;
};

const pricingData = pricingDataRaw as Record<string, LocationPricingData>;

const districtOptions = [
  { key: "Kumbakonam", label: "Kumbakonam" },
  { key: "Thiruvannamalai", label: "Thiruvannamalai" },
  { key: "KovilPatti", label: "Kovilpatti" }
];

const packageConfig: Record<string, { key: string; label: string }> = {
  Basic: { key: "basic", label: "Basic" },
  Standard: { key: "standard", label: "Standard" },
  Premium: { key: "premium", label: "Premium" },
  Prestige: { key: "luxury", label: "Prestige" }
};

const packageKeys = ["Basic", "Standard", "Premium", "Prestige"] as const;
type PackageName = typeof packageKeys[number];

export default function CostEstimator() {
  const [dist, setDist] = useState("Kumbakonam");
  const [area, setArea] = useState<number | "">(1200);
  const [pkg, setPkg] = useState<PackageName>("Basic");
  const [state, setState] = useState<"idle" | "locked" | "unlocked">("idle");
  const [busy, setBusy] = useState(false);

  // Per-sqft rate for currently selected district and package
  const currentRate = useMemo(() => {
    const rawKey = packageConfig[pkg].key;
    const rateStr = pricingData[dist]?.basePrices?.[rawKey] || "2349";
    return parseInt(rateStr, 10);
  }, [dist, pkg]);

  const calculation = useMemo(() => {
    const a = typeof area === "number" ? area : 0;
    const base = a * currentRate;
    const lo = Math.round(base * 0.98).toLocaleString("en-IN");
    const hi = Math.round(base * 1.05).toLocaleString("en-IN");
    const exact = Math.round(base).toLocaleString("en-IN");
    return { exact: `₹${exact}`, range: `₹${lo} – ₹${hi}` };
  }, [area, currentRate]);

  async function unlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const message = `Unlocked Cost Estimator: ${area} sqft, ${pkg} tier (₹${currentRate}/sqft) in ${dist}`;
    try {
      const { submitEnquiry } = await import("@/lib/enquiry");
      await submitEnquiry({ ...data, message, type: "Cost Estimate", consent: "on" }, "cost-estimator");
    } catch {
      // reveal on failure as fallback
    } finally {
      setState("unlocked");
      setBusy(false);
    }
  }

  const displayArea = typeof area === "number" ? area : 0;

  return (
    <div className="border border-line p-0 bg-white flex flex-col md:flex-row items-stretch shadow-sm">
      <div className="p-8 md:p-10 flex-1 flex flex-col">
        <div className="space-y-8 flex-1">
          {/* District selector */}
          <div>
            <label className="block text-xs font-semibold tracking-wide text-slate mb-3 uppercase">
              Project Location / District
            </label>
            <div className="relative">
              <select 
                value={dist} 
                onChange={(e) => setDist(e.target.value)}
                className="w-full appearance-none bg-slate/5 border-b border-line px-4 py-3 text-[15px] focus:outline-none focus:border-brand transition-colors font-inter cursor-pointer rounded-t-sm"
              >
                {districtOptions.map(d => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>
          
          {/* Plot Area Slider & Input */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="block text-xs font-semibold tracking-wide text-slate uppercase pb-2">
                Built-Up Area (sq ft)
              </label>
              <div className="flex items-center gap-2 text-xl font-outfit font-semibold bg-slate/5 border-b border-line px-3 py-1.5 hover:bg-slate/10 focus-within:border-brand focus-within:bg-slate/10 transition-colors cursor-text group">
                <input 
                  type="number" 
                  value={area} 
                  onChange={(e) => setArea(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="w-24 bg-transparent text-right focus:outline-none placeholder:text-slate/30"
                  placeholder="0"
                  min="300"
                />
                <span className="text-slate text-sm font-normal">sq ft</span>
                <svg className="w-3.5 h-3.5 text-slate/30 group-hover:text-slate/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </div>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="100" 
              value={displayArea > 10000 ? 10000 : displayArea} 
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
          </div>

          {/* Build Package Selection - Matching Essential, Classic, Premium, Prestige */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-semibold tracking-wide text-slate uppercase">
                Construction Package Tier
              </label>
              <span className="text-xs text-brand font-outfit font-medium">
                Current Rate: ₹{currentRate}/sq ft
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {packageKeys.map(p => {
                const isSelected = pkg === p;
                const rawKey = packageConfig[p].key;
                const tierRate = pricingData[dist]?.basePrices?.[rawKey] || "-";
                return (
                  <button 
                    key={p} 
                    type="button"
                    onClick={() => setPkg(p)} 
                    className={`p-3 text-center border transition-all flex flex-col items-center justify-center gap-1 rounded-sm ${
                      isSelected 
                        ? 'border-brand bg-brand text-white shadow-sm' 
                        : 'border-line text-slate-800 bg-white hover:border-brand/60'
                    }`}
                  >
                    <span className="font-outfit font-semibold text-sm">{p}</span>
                    <span className={`text-[11px] font-outfit ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      ₹{tierRate}/sft
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {state === "idle" && (
          <div className="pt-8 mt-8 border-t border-line">
            <button onClick={() => setState("locked")} className="btn btn-fill w-full justify-center text-[15px] py-4">
              Generate Estimate
            </button>
          </div>
        )}
      </div>

      {/* Results / Gated Panel */}
      <div className="w-full md:w-[340px] bg-slate-900 text-white relative flex flex-col justify-center p-8 md:p-10 border-l border-line/10 overflow-hidden">
        {state === "idle" && (
          <div className="absolute inset-0 z-20 bg-slate-900 flex flex-col justify-center p-8 text-center">
            <svg className="w-8 h-8 mx-auto mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <div className="text-[11px] text-brand uppercase tracking-widest mb-2 font-semibold font-outfit">Estimate Ready</div>
            <div className="text-[13px] text-white/60 leading-relaxed">Select your district, built-up area, and package tier on the left, then click Generate.</div>
          </div>
        )}

        {state === "locked" && (
          <div className="absolute inset-0 z-10 bg-slate-900/90 backdrop-blur-md flex flex-col justify-center p-8 text-center transition-all duration-500">
            <svg className="w-6 h-6 mx-auto mb-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg>
            <h3 className="font-outfit text-lg font-semibold mb-1 text-white">Unlock Full Estimate</h3>
            <p className="text-[12px] text-white/60 mb-5 leading-relaxed">Enter your details to instantly view your itemised cost breakdown.</p>
            <form onSubmit={unlock} className="space-y-3 text-left">
              <input required name="name" type="text" placeholder="Your name" className="w-full bg-white/10 border-b border-white/20 text-white placeholder-white/40 text-[13px] px-3 py-2.5 focus:outline-none focus:border-brand transition-colors" />
              <input required name="phone" type="tel" placeholder="Phone number" className="w-full bg-white/10 border-b border-white/20 text-white placeholder-white/40 text-[13px] px-3 py-2.5 focus:outline-none focus:border-brand transition-colors" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full bg-white/10 border-b border-white/20 text-white placeholder-white/40 text-[13px] px-3 py-2.5 focus:outline-none focus:border-brand transition-colors" />
              <button disabled={busy} className="w-full bg-brand hover:bg-white text-white hover:text-slate-900 font-semibold text-[13px] py-3 mt-3 transition-colors active:scale-[0.98]">
                {busy ? "Unlocking..." : "Reveal Price"}
              </button>
            </form>
          </div>
        )}

        <div className={`transition-all duration-700 ${state !== "unlocked" ? 'opacity-20 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}>
          <div className="text-[11px] uppercase tracking-wider text-brand font-semibold mb-1 font-outfit">Estimated Construction Cost</div>
          <div className="font-outfit font-bold text-[34px] leading-tight text-white mb-1">{calculation.exact}</div>
          <div className="text-xs text-white/60 font-outfit mb-4">Ballpark range: {calculation.range}</div>
          <div className="text-[12px] text-white/70 border-t border-white/10 pt-4 leading-relaxed">
            Calculated at <strong>₹{currentRate}/sq ft</strong> for <strong>{displayArea} sq ft</strong> ({pkg} package in {districtOptions.find(d => d.key === dist)?.label || dist}). Final cost may adjust slightly for soil condition and custom architectural choices.
          </div>
        </div>
      </div>
    </div>
  );
}
