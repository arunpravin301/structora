"use client";
import { useState, useMemo } from "react";

export default function EmiCalculator() {
  const [P, setP] = useState<number | "">(2500000);
  const [R, setR] = useState<number | "">(8.5);
  const [N, setN] = useState<number | "">(15);

  const res = useMemo(() => {
    const pVal = typeof P === "number" ? P : 0;
    const rVal = typeof R === "number" ? R : 0;
    const nVal = typeof N === "number" ? N : 0;

    const r = rVal / 1200;
    const n = nVal * 12;
    if (r === 0 || n === 0) {
      const emi = n === 0 ? 0 : pVal / n;
      return { emi: Math.round(emi).toLocaleString("en-IN"), total: Math.round(pVal).toLocaleString("en-IN") };
    }
    const emi = (pVal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi: Math.round(emi).toLocaleString("en-IN"), total: Math.round(emi * n).toLocaleString("en-IN") };
  }, [P, R, N]);

  const pVal = typeof P === "number" ? P : 0;
  const rVal = typeof R === "number" ? R : 0;
  const nVal = typeof N === "number" ? N : 0;

  return (
    <div className="border border-line p-0 bg-white flex flex-col md:flex-row items-stretch">
      <div className="p-10 flex-1 space-y-8">
        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Loan Amount (₹)</label>
            <div className="flex items-center gap-1 text-xl font-fr font-semibold border-b border-transparent hover:border-line focus-within:border-navy transition-colors">
              <span className="text-slate">₹</span>
              <input 
                type="number" 
                value={P} 
                onChange={(e) => setP(e.target.value === "" ? "" : parseInt(e.target.value))}
                className="w-32 bg-transparent text-right focus:outline-none placeholder:text-slate/30"
                placeholder="0"
              />
            </div>
          </div>
          <input type="range" min="500000" max="20000000" step="100000" value={pVal > 20000000 ? 20000000 : pVal} onChange={(e) => setP(parseInt(e.target.value))} />
        </div>

        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Interest Rate (%)</label>
            <div className="flex items-center gap-1 text-xl font-fr font-semibold border-b border-transparent hover:border-line focus-within:border-navy transition-colors">
              <input 
                type="number" 
                step="0.1"
                value={R} 
                onChange={(e) => setR(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="w-16 bg-transparent text-right focus:outline-none placeholder:text-slate/30"
                placeholder="0"
              />
              <span className="text-slate">%</span>
            </div>
          </div>
          <input type="range" min="5" max="15" step="0.1" value={rVal > 15 ? 15 : rVal} onChange={(e) => setR(parseFloat(e.target.value))} />
        </div>

        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Tenure (Years)</label>
            <div className="flex items-center gap-1 text-xl font-fr font-semibold border-b border-transparent hover:border-line focus-within:border-navy transition-colors">
              <input 
                type="number" 
                value={N} 
                onChange={(e) => setN(e.target.value === "" ? "" : parseInt(e.target.value))}
                className="w-12 bg-transparent text-right focus:outline-none placeholder:text-slate/30"
                placeholder="0"
              />
              <span className="text-slate">Yrs</span>
            </div>
          </div>
          <input type="range" min="1" max="30" step="1" value={nVal > 30 ? 30 : nVal} onChange={(e) => setN(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="w-full md:w-[320px] bg-ink text-white relative flex flex-col justify-center p-10 border-l border-line/10">
        <div className="text-[11px] uppercase tracking-wider text-slatel mb-2">Monthly EMI</div>
        <div className="font-fr font-semibold text-[32px] leading-tight text-white mb-2">₹{res.emi}</div>
        <div className="text-[12px] text-slatel mt-6 border-t border-white/10 pt-4 leading-relaxed">
          Total amount payable over {nVal} years is ₹{res.total}. This includes both principal and interest.
        </div>
      </div>
    </div>
  );
}
