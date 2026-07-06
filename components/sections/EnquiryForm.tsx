"use client";
import { useState } from "react";

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSent(true);
    } finally { setBusy(false); }
  }
  if (sent) return <div className="border border-line p-10 text-slate">Thank you. We will be in touch shortly.</div>;
  return (
    <form onSubmit={submit} className="space-y-6">
      {[["name","Your name","text"],["phone","Phone number","tel"],["email","Email (optional)","email"]].map(([n,l,t])=>(
        <div key={n} className="group transition-colors">
          <label className="block text-xs text-slate group-focus-within:text-navy transition-colors mb-2 tracking-wide uppercase font-semibold">{l}</label>
          <input name={n} type={t} className="field transition-all duration-300" placeholder={l} />
        </div>))}
      
      <div className="group transition-colors">
        <label className="block text-xs text-slate group-focus-within:text-navy transition-colors mb-2 tracking-wide uppercase font-semibold">What are you building?</label>
        <div className="relative">
          <select name="type" className="field transition-all duration-300 appearance-none cursor-pointer">
            {["Residential home","Commercial building","Industrial","Renovation","Multi-floor (G+1 / G+2)","Not sure yet"].map(o=><option key={o}>{o}</option>)}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate group-focus-within:text-navy transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>

      <div className="group transition-colors">
        <label className="block text-xs text-slate group-focus-within:text-navy transition-colors mb-2 tracking-wide uppercase font-semibold">Message</label>
        <textarea name="message" className="field min-h-[110px] transition-all duration-300 resize-y" placeholder="Plot location, size, budget" />
      </div>

      <button className="btn btn-cta w-full justify-center mt-2" disabled={busy}>{busy ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
