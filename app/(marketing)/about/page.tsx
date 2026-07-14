import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title="A local builder you can meet, visit, and hold to account."
        intro="Structora designs and builds across Tamil Nadu, with the belief that the people building your home should be people you can sit across from." />

      <section className="py-[118px]"><Container>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-14 items-center">
          <Reveal>
            <SectionHead>Our story.</SectionHead>
            <p className="text-lg text-slate leading-relaxed">Structora was incorporated in 2021 with one aim: to bring large-scale project standards into residential construction. In a market where trust is hard-won, we build for quality and long durability, and we put our own engineers on site to stand behind both.</p>
            <p className="mt-4 text-slate">From a farmhouse in Tiruvannamalai to multi-floor homes in Kumbakonam, every project runs under the same discipline: engineer-supervised, checked at every stage, handed over finished.</p>
          </Reveal>
          <Reveal><Plate cap="Team or office photograph" idx="FIG. 01" className="aspect-[4/5]" /></Reveal>
        </div>
      </Container></section>

      <section className="py-[118px] bg-mist"><Container>
        <Reveal><SectionHead>How we hold quality.</SectionHead></Reveal>
        <div className="grid grid-cols-3 max-[980px]:grid-cols-1 gap-6">
          {[["01","An engineer on site, daily","Day-to-day supervision of every activity against the architectural and structural drawings, from excavation to finishing and key handover."],
            ["02","Every material checked","Soil tests, concrete mix checks, brick and material inspection before anything goes into your build."],
            ["03","Brands we stand behind","We build with materials we trust by name, not by price."]].map(([n,t,d])=>(
            <Reveal key={n}>
              <div className="border-t-2 border-slate-900" style={{paddingTop:18}}>
                <div className="font-outfit text-sm text-brand">{n}</div>
                <h3 className="text-[20px] font-semibold mt-2 mb-2">{t}</h3>
                <p className="text-[15px] text-slate leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 border border-line bg-white p-8">
            <div className="text-xs tracking-[.14em] uppercase text-slate mb-4">Materials we build with</div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {site.materials.map((m) => <span key={m} className="font-outfit text-[19px] text-slate-900">{m}</span>)}
            </div>
          </div>
        </Reveal>
      </Container></section>

      <section className="py-[118px]"><Container>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-14 items-center">
          <Reveal>
            <SectionHead>Home loans, handled with you.</SectionHead>
            <p className="text-lg text-slate leading-relaxed">We assist our clients with home loan applications and work with all the major banks. Plan your EMI on our services page, then let us help you take it to the bank.</p>
          </Reveal>
          <Reveal><Plate cap="Handover or site photograph" idx="FIG. 02" className="aspect-[16/10]" /></Reveal>
        </div>
      </Container></section>

      <section className="py-[118px] bg-mist"><Container>
        <Reveal><SectionHead>The team you will meet.</SectionHead></Reveal>
        <div className="grid grid-cols-4 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
          {[0,1,2,3].map((i)=>(<Reveal key={i}>
            <Plate cap="Team photograph" className="aspect-square mb-4" />
            <h3 className="text-[19px] font-semibold">Name</h3>
            <div className="text-[13px] text-slate mt-1">Role</div>
          </Reveal>))}
        </div>
        <p className="text-[12.5px] text-slate italic mt-8">Team names and roles pending from Structora.</p>
      </Container></section>
    </>
  );
}
