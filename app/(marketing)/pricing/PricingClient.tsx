"use client";
import React, { useState } from "react";
import Container from "@/components/ui/Container";
import pricingDataRaw from "@/config/pricing.json";

const pricingData = pricingDataRaw as Record<string, any>;
const locations = Object.keys(pricingData);
locations.push("Other");

const tierHighlights: Record<string, string[]> = {
  basic: [
    "ISI Brand Steel & Cement",
    "Country Red Brick",
    "10'0\" Floor Height",
    "Teak Wood Main Door (5x3)",
    "2 Coats of Emulsion Paint"
  ],
  standard: [
    "Pulkit / Suryadev Steel",
    "Country Red Brick",
    "10'0\" Floor Height",
    "UPVC / Mahogany Windows",
    "Economy Emulsion Paint"
  ],
  premium: [
    "Agni / Aishwaryam Steel",
    "1st class Wirecut Red Bricks",
    "10'6\" Floor Height",
    "Teak wood frame with shutters",
    "Dr.Fixit / Fosroc Waterproofing"
  ],
  luxury: [
    "JSW / TATA Steel",
    "1st class Wirecut Red Bricks",
    "11'0\" Floor Height",
    "Luxury Emulsion Paints",
    "SS Staircase & Balcony Railing"
  ]
};

export default function PricingClient() {
  const [location, setLocation] = useState(locations[0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Track expanded state by category name. Default 'Structure ' (or first category) to true.
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [pricingData[locations[0]].categories[0]?.name || "Structure"]: true
  });

  const toggleSection = (name: string) => {
    setExpandedSections(prev => ({ ...prev, [name]: !prev[name] }));
  };

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
            {/* Detailed Top Cards */}
            <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 gap-8 mb-8">
              {['basic', 'standard', 'premium', 'luxury'].map((tier) => {
                const isPopular = tier === 'premium';
                
                // Map the internal keys to the new client-facing names
                const displayName = tier === 'basic' ? 'Essential' 
                                  : tier === 'standard' ? 'Classic' 
                                  : tier === 'premium' ? 'Premium' 
                                  : 'Prestige';
                                  
                const displayDesc = tier === 'basic' ? 'Functional, durable, and thoughtfully designed with all essential features for comfortable everyday living.'
                                  : tier === 'standard' ? 'Enhanced quality, refined finishes, and improved specifications for a comfortable and stylish home.'
                                  : tier === 'premium' ? 'Superior materials, premium fittings, elegant finishes, and enhanced design details for elevated living.'
                                  : 'Exceptional materials, luxury fittings, bespoke detailing, and sophisticated finishes for an exclusive villa experience.';

                return (
                  <div key={tier} className={`flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isPopular ? 'ring-4 ring-[#F26E21] shadow-2xl scale-105 relative z-10' : 'border border-slate-200 shadow-lg hover:shadow-xl'}`}>
                    <div className={`p-8 text-center text-white relative ${tier === 'luxury' ? 'bg-gradient-to-br from-[#E5B63E] to-[#C99A22]' : tier === 'premium' ? 'bg-gradient-to-br from-[#F26E21] to-[#D95508]' : tier === 'standard' ? 'bg-gradient-to-br from-[#8940FF] to-[#6B22E1]' : 'bg-gradient-to-br from-slate-400 to-slate-500'}`}>
                      {isPopular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-outfit font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-md mt-4">
                          ★ Most Popular
                        </div>
                      )}
                      <h3 className="text-3xl font-bold mb-3 mt-2">{displayName}</h3>
                      <p className="text-xs text-white/90 leading-snug min-h-[48px]">{displayDesc}</p>
                    </div>
                    <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
                      <div className="flex items-start justify-center text-slate-900 mb-1">
                        <span className="text-xl font-medium mt-1 mr-1">₹</span>
                        <span className="text-5xl font-bold tracking-tight">{pricingData[location].basePrices[tier]}</span>
                      </div>
                      <div className="text-sm text-slate-500 font-medium">per sq. ft.</div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col bg-white">
                      <div className="font-outfit text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-4">What's Included</div>
                      <ul className="space-y-4 text-[14px] text-slate-700 flex-grow mb-8">
                        {tierHighlights[tier].map((hl, idx) => (
                          <li key={idx} className="flex gap-3 items-start">
                            <svg className="w-5 h-5 text-green-500 shrink-0 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="leading-relaxed font-medium">{hl}</span>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => { document.getElementById('compare')?.scrollIntoView({behavior: 'smooth'}); }} className={`w-full py-4 rounded-xl font-outfit uppercase tracking-widest text-sm font-semibold transition-colors ${isPopular ? 'bg-[#F26E21] text-white hover:bg-[#D95508]' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                        Compare Specs
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Super Luxury Custom Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 mb-24 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-2xl relative z-10">
                <div className="font-outfit uppercase tracking-[0.2em] text-xs text-[#E5B63E] mb-3">Custom Build</div>
                <h3 className="text-4xl font-bold mb-4">Super Luxury</h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  For highly premium projects, oversized villas, and bespoke architectural requirements. Featuring imported materials, custom home automation, and exclusive imported fittings.
                </p>
              </div>
              
              <div className="flex-shrink-0 w-full md:w-auto relative z-10">
                <a href="/contact" className="block w-full text-center px-10 py-5 bg-[#E5B63E] hover:bg-[#C99A22] text-slate-900 font-outfit font-bold uppercase tracking-widest rounded-xl transition-colors">
                  Contact Sales
                </a>
              </div>
            </div>

            {/* Gated Detailed Comparison Table */}
            <div className="relative">
              <div className="mb-6 text-center">
                <h3 className="text-3xl font-semibold mb-3">Complete Specification Matrix</h3>
                <p className="text-slate-500">Compare every material and detail across all four tiers.</p>
              </div>

              {!isUnlocked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-sm pt-20">
                  <div className="bg-white p-10 max-w-lg w-full border border-line shadow-2xl">
                    <h4 className="text-2xl font-semibold mb-3">Unlock Full Specifications</h4>
                    <p className="text-slate-500 mb-8 text-[15px]">Enter your details below to instantly view the complete, unblurred pricing and material comparison table.</p>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsUnlocked(true); }}>
                      <input type="text" placeholder="Your Name" className="w-full px-5 py-4 bg-mist border border-line focus:outline-none focus:border-brand" required />
                      <input type="tel" placeholder="Phone Number" className="w-full px-5 py-4 bg-mist border border-line focus:outline-none focus:border-brand" required />
                      <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-mist border border-line focus:outline-none focus:border-brand" required />
                      <button type="submit" className="w-full bg-brand text-white font-outfit uppercase tracking-widest text-sm py-4 hover:bg-slate-900 transition-colors mt-2">View Specifications</button>
                    </form>
                  </div>
                </div>
              )}

              <div id="compare" className={`overflow-x-auto border border-line scroll-mt-24 bg-white transition-all duration-500 ${!isUnlocked ? 'h-[400px] overflow-hidden' : ''}`}>
                <table className={`w-full text-left border-collapse min-w-[900px] transition-all duration-700 ${!isUnlocked ? 'blur-[4px] opacity-50 select-none pointer-events-none' : ''}`}>
                  <thead>
                    <tr>
                      <th className="p-6 bg-slate-900 text-white w-1/3 text-lg font-normal">Specification Overview</th>
                      <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Essential</th>
                      <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Classic</th>
                      <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Premium</th>
                      <th className="p-6 bg-slate-900 text-white font-outfit uppercase tracking-widest text-xs">Prestige</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingData[location].categories.map((cat: any) => {
                      const isExpanded = !!expandedSections[cat.name];
                      return (
                        <React.Fragment key={cat.name}>
                          <tr>
                            <td colSpan={5} className="bg-mist p-0 border-b border-line">
                              <button 
                                onClick={() => toggleSection(cat.name)} 
                                className="w-full text-left p-4 px-6 font-semibold text-brand tracking-wide uppercase text-sm flex justify-between items-center focus:outline-none hover:bg-slate-100 transition-colors"
                              >
                                {cat.name}
                                <svg className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </button>
                            </td>
                          </tr>
                          {isExpanded && cat.items.map((item: any, i: number) => (
                            <tr key={i} className="border-b border-line hover:bg-slate-50 transition-colors">
                              <td className="p-4 px-6 font-medium text-slate-900 whitespace-pre-wrap">{item.name}</td>
                              <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.basic}</td>
                              <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.standard}</td>
                              <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.premium}</td>
                              <td className="p-4 px-6 text-[15px] text-slate-600 whitespace-pre-wrap leading-relaxed">{item.luxury}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
