"use client";
import { useState, useMemo } from "react";
import { site } from "@/config/site";

export default function CostEstimator() {
  const [dist, setDist] = useState("Kumbakonam");
  const [area, setArea] = useState(1200);
  const [pkg, setPkg] = useState("Basic");
  const [locked, setLocked] = useState(true);
  const [busy, setBusy] = useState(false);

  const priceRange = useMemo(() => {
    const base = area * (site.estimatorRates[dist] || 0) * (site.packageMultiplier[pkg] || 1);
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
      setLocked(false);
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border border-line p-0 bg-white flex flex-col md:flex-row items-stretch">
      <div className="p-10 flex-1 space-y-8">
        <div>
          <label className="block text-xs font-semibold tracking-wide text-slate mb-3 uppercase">District</label>
          <div className="flex gap-2 flex-wrap">
            {site.offices.map(o => (
              <button key={o} onClick={() => setDist(o)} className={`px-4 py-2 text-sm border transition-colors ${dist === o ? 'border-navy bg-navy text-white' : 'border-line text-slate hover:border-navy'}`}>{o}</button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Plot Area (sq ft)</label>
            <div className="text-xl font-fr font-semibold">{area} sq ft</div>
          </div>
          <input type="range" min="500" max="5000" step="100" value={area} onChange={(e) => setArea(parseInt(e.target.value))} />
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

      <div className="w-full md:w-[320px] bg-ink text-white relative flex flex-col justify-center p-10 border-l border-line/10 overflow-hidden">
        {locked ? (
          <div className="absolute inset-0 z-10 bg-ink/95 backdrop-blur flex flex-col justify-center p-8 text-center">
            <svg className="w-6 h-6 mx-auto mb-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg>
            <h3 className="font-fr text-lg font-semibold mb-2">Unlock estimate</h3>
            <p className="text-[13px] text-white/60 mb-5 leading-relaxed">Enter your details to instantly reveal your personalized estimate.</p>
            <form onSubmit={unlock} className="space-y-3 text-left">
              <input required name="name" type="text" placeholder="Your name" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-white transition-colors" />
              <input required name="phone" type="tel" placeholder="Phone number" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-white transition-colors" />
              <input name="email" type="email" placeholder="Email (optional)" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-white transition-colors" />
              <button disabled={busy} className="w-full bg-white text-ink font-semibold text-sm py-3 mt-3 transition-transform active:scale-[0.98]">{busy ? "Unlocking..." : "Reveal Price"}</button>
            </form>
          </div>
        ) : null}

        <div className={`transition-all duration-700 ${locked ? 'opacity-20 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}>
          <div className="text-[11px] uppercase tracking-wider text-slatel mb-2">Estimated Cost</div>
          <div className="font-fr font-semibold text-[32px] leading-tight text-white mb-2">{priceRange}</div>
          <div className="text-[12px] text-slatel mt-6 border-t border-white/10 pt-4 leading-relaxed">
            Based on {dist} rates for {area} sq ft with {pkg} finishing. Final price follows a detailed itemised estimate.
          </div>
        </div>
      </div>
    </div>
  );
}
