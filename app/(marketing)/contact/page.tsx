import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHero
        crumb="Start Your Project"
        title={
          <>
            Let’s build something{" "}
            <em className="font-serif italic font-medium text-amber-400">
              engineered to last.
            </em>
          </>
        }
        intro="Tell us about your plot or project plans. Our civil engineers will review your requirements and provide an honest estimate with transparent next steps."
      />
      <section className="py-[118px]"><Container>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-14 items-start">
          <Reveal><EnquiryForm /></Reveal>
          <Reveal>
            <SectionHead>Or reach us directly.</SectionHead>
            <div className="bg-slate-900 text-white p-8">
              <ul className="list-none">
                <li className="flex justify-between gap-5 border-t border-lined text-[15px]" style={{ padding: "18px 0" }}>
                  <span className="text-slatel">WhatsApp</span>
                  <a className="text-white hover:underline" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener">Chat with us</a>
                </li>
                <li className="flex justify-between gap-5 border-t border-lined text-[15px]" style={{ padding: "18px 0" }}>
                  <span className="text-slatel">Phone</span>
                  <span className="text-white text-right">{c.phones.join(" · ")}</span>
                </li>
                <li className="flex justify-between gap-5 border-t border-lined text-[15px]" style={{ padding: "18px 0" }}>
                  <span className="text-slatel">Email</span>
                  <a className="text-white hover:underline" href={`mailto:${c.email}`}>{c.email}</a>
                </li>
                <li className="flex justify-between gap-5 border-t border-b border-lined text-[15px]" style={{ padding: "18px 0" }}>
                  <span className="text-slatel">Hours</span>
                  <span className="text-white">{c.hours}</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-6 mt-6">
              {c.addresses.map((o) => (
                <div key={o.name} className="border-t-2 border-slate-900" style={{ paddingTop: 18 }}>
                  <h3 className="text-[19px] font-semibold mb-2">{o.name}</h3>
                  <p className="text-sm text-slate leading-relaxed">{o.lines}</p>
                  <a href={o.mapUrl} target="_blank" rel="noopener" className="inline-block mt-3 text-sm text-brand underline underline-offset-4 hover:text-slate-900 transition-colors">Get directions →</a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container></section>
      <section className="py-[118px] bg-mist"><Container>
        <Reveal><SectionHead>Find our offices.</SectionHead></Reveal>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-8 items-stretch">
          {c.addresses.map((o, idx) => (
            <Reveal key={o.name} className="h-full">
              <div className="h-full flex flex-col bg-white border border-line shadow-sm overflow-hidden">
                {/* Architectural Frame Header */}
                <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {o.name} Office
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                    {o.lat.toFixed(4)}°N, {o.lng.toFixed(4)}°E
                  </span>
                </div>

                {/* Map Frame Viewport */}
                <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden border-b border-line">
                  <iframe
                    title={`Structora ${o.name} office location map`}
                    src={`https://maps.google.com/maps?q=${o.lat},${o.lng}&z=16&output=embed`}
                    className="w-full h-full border-0 block"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="pointer-events-none absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase border border-white/10">
                    FIG. 0{idx + 1}
                  </div>
                </div>

                {/* Card Content & Action Bar */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-brand font-semibold mb-1">
                      Office Address
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                      {o.name}
                    </h3>
                    <p className="text-[15px] text-slate-600 leading-relaxed min-h-[4.5rem]">
                      {o.lines}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      <span className="font-medium text-slate-700 block mb-0.5">Visiting Hours</span>
                      {c.hours}
                    </div>
                    <a
                      href={o.mapUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-fill text-center text-xs py-3 px-6 whitespace-nowrap"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container></section>
    </>
  );
}
