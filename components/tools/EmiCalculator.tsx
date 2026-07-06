"use client";
import { useState } from "react";

export default function EmiCalculator() {
  const [P, setP] = useState(""); const [R, setR] = useState(""); const [N, setN] = useState("");
  const [res, setRes] = useState<{ emi: string; total: string } | null>(null);
  const [err, setErr] = useState("");

  function calc() {
    const p = parseFloat(P), ann = parseFloat(R), yr = parseFloat(N);
    if (!p || !ann || !yr) { setErr("Please fill all three fields"); setRes(null); return; }
    setErr("");
    const r = ann / 1200, n = yr * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setRes({ emi: Math.round(emi).toLocaleString("en-IN"), total: Math.round(emi * n).toLocaleString("en-IN") });
  }

  return (
    <div className="border border-line p-10 bg-white">
      <div className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-5 items-end">
        <div><label className="block text-xs text-slate mb-2">Loan amount (₹)</label>
          <input className="field" type="number" value={P} onChange={(e) => setP(e.target.value)} placeholder="e.g. 2500000" /></div>
        <div><label className="block text-xs text-slate mb-2">Interest rate (% per year)</label>
          <input className="field" type="number" value={R} onChange={(e) => setR(e.target.value)} placeholder="e.g. 8.5" /></div>
        <div><label className="block text-xs text-slate mb-2">Tenure (years)</label>
          <input className="field" type="number" value={N} onChange={(e) => setN(e.target.value)} placeholder="e.g. 15" /></div>
      </div>
      <button className="btn btn-cta mt-6" onClick={calc}>Calculate EMI</button>
      {err && <div className="mt-6 p-7 bg-ink text-white text-[13px] text-slatel">{err}</div>}
      {res && (
        <div className="mt-6 p-7 bg-ink text-white">
          <div className="text-[13px] text-slatel">Estimated monthly EMI</div>
          <div className="font-fr font-semibold text-[34px] mt-1.5">₹{res.emi} / month</div>
          <div className="text-[13px] text-slatel mt-2.5 italic">Total payable: ₹{res.total}</div>
        </div>
      )}
    </div>
  );
}
