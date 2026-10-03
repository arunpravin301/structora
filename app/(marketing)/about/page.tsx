import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title="A trusted construction partner you can rely on."
        intro="Structora designs and builds across Tamil Nadu, with the belief that the people building your project should be engineers you can sit across from." />

      <section className="py-[118px]"><Container>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-14 items-center">
          <Reveal>
            <SectionHead>Our story.</SectionHead>
            <p className="text-[17px] text-slate-500 leading-relaxed">Structora was incorporated in 2021 to bring large-scale, corporate engineering standards into residential and commercial construction up to 5 floors. In a market where trust is hard-won, we build for quality and uncompromising durability, and we put our own engineers on site to stand behind both.</p>
            <p className="mt-4 text-slate">From multi-floor homes in Chennai to a farmhouse in Kanyakumari, every project runs under the same discipline: engineer-supervised, checked at every stage, handed over finished.</p>
          </Reveal>
          <Reveal><Plate cap="Team or office photograph" idx="FIG. 01" className="aspect-[4/5]" /></Reveal>
        </div>
      </Container></section>

      {/* Founder Section */}
      <section className="py-[118px] bg-white"><Container>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-14 items-center">
          <Reveal>
            <Plate src="" cap="Vetri, Founder & Managing Director" idx="FIG. 02" className="aspect-[4/5]" />
          </Reveal>
          <Reveal>
            <SectionHead>Meet the Founder.</SectionHead>
            <h3 className="text-3xl font-semibold mb-2">Vetri</h3>
            <p className="text-brand font-outfit text-sm uppercase tracking-[0.15em] mb-8">Founder & Managing Director</p>
            <div className="space-y-5 text-slate-500 leading-relaxed text-[17px]">
              <p>With a Bachelor's degree in Civil Engineering and a lifelong fascination with large-scale infrastructure, Vetri built his foundation working for corporate construction giants like L&T ECC. There, he mastered advanced construction technologies, rigorous project management, and strict quality standards.</p>
              <p>He founded Structora India Constructions with a clear vision: to bring that same level of large-scale corporate engineering excellence, transparency, and reliability into the residential and commercial market. His philosophy is that a home shouldn't just be built—it should be engineered to last, balancing cost with uncompromised durability.</p>
              <p>For Vetri, the most rewarding part of the job isn't just solving complex engineering challenges—it's the moment of handover. It's hearing a client say they are proud of the home built together, delivered with exact precision and strictly within the planned budget.</p>
              <p>Outside of the construction site, Vetri is an avid cricket fan and dedicates his time to giving back to the community by supporting children who have lost parental support.</p>
            </div>
          </Reveal>
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
          <Reveal><Plate cap="Handover or site photograph" idx="FIG. 03" className="aspect-[16/10]" /></Reveal>
        </div>
      </Container></section>



      <section className="py-[118px] bg-white"><Container>
        <Reveal><SectionHead>The standards we build by.</SectionHead></Reveal>
        <WhyChooseUs />
      </Container></section>
    </>
  );
}
