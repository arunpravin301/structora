"use client";
import { useState, useMemo } from "react";
import { site } from "@/config/site";

export default function CostEstimator() {
  const [dist, setDist] = useState("Kumbakonam");
  const [area, setArea] = useState<number | "">(1200);
  const [pkg, setPkg] = useState("Basic");
  const [state, setState] = useState<"idle" | "locked" | "unlocked">("idle");
  const [busy, setBusy] = useState(false);

  const priceRange = useMemo(() => {
    const a = typeof area === "number" ? area : 0;
    const base = a * (site.estimatorRates[dist] || 0) * (site.packageMultiplier[pkg] || 1);
    const lo = Math.round(base * 0.95).toLocaleString("en-IN");
    const hi = Math.round(base * 1.1).toLocaleString("en-IN");
    return `₹${lo} – ₹${hi}`;
  }, [area, dist, pkg]);

  async function unlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    data.message = `Unlocked Cost Estimator: ${area} sqft, ${pkg} package in ${dist}`;
    try {
      await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState("unlocked");
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  const displayArea = typeof area === "number" ? area : 0;

  return (
    <div className="border border-line p-0 bg-white flex flex-col md:flex-row items-stretch">
      <div className="p-10 flex-1 flex flex-col">
        <div className="space-y-8 flex-1">
          <div>
            <label className="block text-xs font-semibold tracking-wide text-slate mb-3 uppercase">District</label>
            <div className="relative">
              <select 
                value={dist} 
                onChange={(e) => setDist(e.target.value)}
                className="w-full appearance-none bg-slate/5 border-b border-line px-4 py-3 text-[15px] focus:outline-none focus:border-navy transition-colors font-gs cursor-pointer rounded-t-sm"
              >
                {site.offices.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="block text-xs font-semibold tracking-wide text-slate uppercase pb-2">Plot Area (sq ft)</label>
              <div className="flex items-center gap-2 text-xl font-fr font-semibold bg-slate/5 border-b border-line px-3 py-1.5 hover:bg-slate/10 focus-within:border-navy focus-within:bg-slate/10 transition-colors cursor-text group">
                <input 
                  type="number" 
                  value={area} 
                  onChange={(e) => setArea(e.target.value === "" ? "" : parseInt(e.target.value))}
                  className="w-24 bg-transparent text-right focus:outline-none placeholder:text-slate/30"
                  placeholder="0"
                />
                <span className="text-slate">sq ft</span>
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
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wide text-slate mb-3 uppercase">Build Package</label>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(site.packageMultiplier).map(p => (
                <button key={p} onClick={() => setPkg(p)} className={`px-4 py-2 text-sm border transition-colors ${pkg === p ? 'border-navy bg-navy text-white' : 'border-line text-slate hover:border-navy'}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {state === "idle" && (
          <div className="pt-8 mt-8 border-t border-line">
            <button onClick={() => setState("locked")} className="btn btn-fill w-full justify-center text-[15px]">Generate Estimate</button>
          </div>
        )}
      </div>

      <div className="w-full md:w-[320px] bg-ink text-white relative flex flex-col justify-center p-10 border-l border-line/10 overflow-hidden">
        {state === "idle" && (
          <div className="absolute inset-0 z-20 bg-ink flex flex-col justify-center p-8 text-center">
            <svg className="w-8 h-8 mx-auto mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <div className="text-[11px] text-slatel uppercase tracking-widest mb-3">Estimate Ready</div>
            <div className="text-[13px] text-white/60 leading-relaxed">Configure your build details on the left and click generate.</div>
          </div>
        )}

        {state === "locked" && (
          <div className="absolute inset-0 z-10 bg-ink/80 backdrop-blur-md flex flex-col justify-center p-8 text-center transition-all duration-500">
            <svg className="w-6 h-6 mx-auto mb-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg>
            <h3 className="font-fr text-lg font-semibold mb-2">Unlock estimate</h3>
            <p className="text-[13px] text-white/60 mb-5 leading-relaxed">Enter your details to instantly reveal your personalized estimate.</p>
            <form onSubmit={unlock} className="space-y-3 text-left">
              <input required name="name" type="text" placeholder="Your name" className="w-full bg-white/10 border-b border-white/20 text-white placeholder-white/40 text-[13px] px-3 py-2.5 focus:outline-none focus:border-white transition-colors" />
              <input required name="phone" type="tel" placeholder="Phone number" className="w-full bg-white/10 border-b border-white/20 text-white placeholder-white/40 text-[13px] px-3 py-2.5 focus:outline-none focus:border-white transition-colors" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full bg-white/10 border-b border-white/20 text-white placeholder-white/40 text-[13px] px-3 py-2.5 focus:outline-none focus:border-white transition-colors" />
              <button disabled={busy} className="w-full bg-white text-ink font-semibold text-[13px] py-3 mt-3 transition-transform active:scale-[0.98]">{busy ? "Unlocking..." : "Reveal Price"}</button>
            </form>
          </div>
        )}

        <div className={`transition-all duration-700 ${state !== "unlocked" ? 'opacity-20 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}>
          <div className="text-[11px] uppercase tracking-wider text-slatel mb-2">Estimated Cost</div>
          <div className="font-fr font-semibold text-[32px] leading-tight text-white mb-2">{priceRange}</div>
          <div className="text-[12px] text-slatel mt-6 border-t border-white/10 pt-4 leading-relaxed">
            Based on {dist} rates for {displayArea} sq ft with {pkg} finishing. Final price follows a detailed itemised estimate.
          </div>
        </div>
      </div>
    </div>
  );
}
