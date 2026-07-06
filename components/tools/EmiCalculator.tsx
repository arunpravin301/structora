"use client";
import { useState, useMemo } from "react";

export default function EmiCalculator() {
  const [P, setP] = useState(2500000);
  const [R, setR] = useState(8.5);
  const [N, setN] = useState(15);

  const res = useMemo(() => {
    const r = R / 1200;
    const n = N * 12;
    if (r === 0) {
      const emi = P / n;
      return { emi: Math.round(emi).toLocaleString("en-IN"), total: Math.round(P).toLocaleString("en-IN") };
    }
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi: Math.round(emi).toLocaleString("en-IN"), total: Math.round(emi * n).toLocaleString("en-IN") };
  }, [P, R, N]);

  return (
    <div className="border border-line p-0 bg-white flex flex-col md:flex-row items-stretch">
      <div className="p-10 flex-1 space-y-8">
        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Loan Amount (₹)</label>
            <div className="text-xl font-fr font-semibold">₹{P.toLocaleString("en-IN")}</div>
          </div>
          <input type="range" min="500000" max="20000000" step="100000" value={P} onChange={(e) => setP(parseInt(e.target.value))} />
        </div>

        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Interest Rate (%)</label>
            <div className="text-xl font-fr font-semibold">{R}%</div>
          </div>
          <input type="range" min="5" max="15" step="0.1" value={R} onChange={(e) => setR(parseFloat(e.target.value))} />
        </div>

        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="block text-xs font-semibold tracking-wide text-slate uppercase">Tenure (Years)</label>
            <div className="text-xl font-fr font-semibold">{N} Years</div>
          </div>
          <input type="range" min="1" max="30" step="1" value={N} onChange={(e) => setN(parseInt(e.target.value))} />
        </div>
      </div>

      <div className="w-full md:w-[320px] bg-ink text-white relative flex flex-col justify-center p-10 border-l border-line/10">
        <div className="text-[11px] uppercase tracking-wider text-slatel mb-2">Monthly EMI</div>
        <div className="font-fr font-semibold text-[32px] leading-tight text-white mb-2">₹{res.emi}</div>
        <div className="text-[12px] text-slatel mt-6 border-t border-white/10 pt-4 leading-relaxed">
          Total amount payable over {N} years is ₹{res.total}. This includes both principal and interest.
        </div>
      </div>
    </div>
  );
}
