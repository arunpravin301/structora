import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import EnquiryForm from "@/components/sections/EnquiryForm";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHero crumb="Contact" title="Tell us what you want to build."
        intro="Send a few details and we will come back with an honest estimate and the next steps. No obligation." />
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
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container></section>
      <section className="py-[118px] bg-mist"><Container>
        <Reveal><SectionHead>Find our offices.</SectionHead></Reveal>
        <Reveal><Plate cap="Map showing both office locations" idx="MAP" className="aspect-[16/8]" /></Reveal>
      </Container></section>
    </>
  );
}
