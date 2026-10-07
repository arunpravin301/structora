"use client";
import React, { useState } from "react";
import Container from "@/components/ui/Container";
import pricingDataRaw from "@/config/pricing.json";

const pricingData = pricingDataRaw as Record<string, any>;
const locations = Object.keys(pricingData);
locations.push("Other");

export default function PricingClient() {
  const [location, setLocation] = useState(locations[0]);

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Location Tabs */}
        <div className="flex flex-wrap gap-2 mb-16 justify-center">
          {locations.map((loc) => (
            <button 
              key={loc}
              onClick={() => setLocation(loc)}
              className={`px-8 py-4 font-outfit text-sm tracking-[0.1em] uppercase transition-colors ${location === loc ? 'bg-slate-900 text-white' : 'bg-mist text-slate-600 hover:bg-slate-200'}`}
            >
              {loc}
            </button>
          ))}
        </div>

        {location === "Other" ? (
          <div className="max-w-2xl mx-auto bg-mist p-12 border border-line">
            <h3 className="text-3xl font-semibold mb-3">Request a Custom Quote</h3>
            <p className="text-slate-500 mb-10 leading-relaxed">We construct premium homes and commercial spaces across Tamil Nadu. Fill out the form below with your location and project requirements, and our engineering team will get back to you with a detailed estimate.</p>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Enquiry submitted successfully!"); }}>
              <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-5">
                <input type="text" placeholder="Your Name" className="w-full px-5 py-4 bg-white border border-line focus:outline-none focus:border-brand" required />
                <input type="text" placeholder="Phone Number" className="w-full px-5 py-4 bg-white border border-line focus:outline-none focus:border-brand" required />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-white border border-line focus:outline-none focus:border-brand" required />
              <input type="text" placeholder="Project Location (City / District)" className="w-full px-5 py-4 bg-white border border-line focus:outline-none focus:border-brand" required />
              <textarea placeholder="Project Details (e.g., land size, total floors, budget)" rows={5} className="w-full px-5 py-4 bg-white border border-line focus:outline-none focus:border-brand" required></textarea>
              <button type="submit" className="w-full bg-brand text-white font-outfit uppercase tracking-widest text-sm py-5 hover:bg-slate-900 transition-colors mt-4">Send Enquiry</button>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Cards for the 4 Tiers */}
            <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6 mb-20">
              {['basic', 'standard', 'premium', 'luxury'].map((tier) => (
                <div key={tier} className="border border-line p-10 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="font-outfit uppercase tracking-[0.2em] text-xs text-brand mb-3">{tier}</div>
                  <div className="text-4xl font-semibold mb-2">₹{pricingData[location].basePrices[tier]}</div>
                  <div className="text-sm text-slate-500 mb-8 font-medium">per sq. ft.</div>
                  <a href="#compare" className="mt-auto px-6 py-3 border border-slate-900 text-[13px] font-outfit uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors w-full">View Specs</a>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            <div id="compare" className="overflow-x-auto border border-line scroll-mt-24">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr>
                    <th className="p-6 bg-slate-900 text-white w-1/3 text-lg font-normal">Specification Overview</th>
                    <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Basic</th>
                    <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Standard</th>
                    <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Premium</th>
                    <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Luxury</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData[location].categories.map((cat: any) => (
                    <React.Fragment key={cat.name}>
                      <tr>
                        <td colSpan={5} className="bg-mist p-4 px-6 font-semibold text-brand tracking-wide uppercase text-sm border-b border-line">{cat.name}</td>
                      </tr>
                      {cat.items.map((item: any, i: number) => (
                        <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                          <td className="p-4 px-6 font-medium text-slate-900 whitespace-pre-wrap">{item.name}</td>
                          <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.basic}</td>
                          <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.standard}</td>
                          <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.premium}</td>
                          <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.luxury}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
