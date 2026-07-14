import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/config/site";

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = site.services.find((x) => x.slug === params.slug);
  return { title: s ? s.name : "Service" };
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const s = site.services.find((x) => x.slug === params.slug) ?? site.services[0];
  return (
    <>
      <PageHero crumb={`Services · ${s.name}`} title={`${s.name}.`} intro={s.desc} />
      <section className="py-[118px]"><Container>
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 gap-14 items-center">
          <Reveal><Plate cap="Service photograph" idx="SRV. 01" className="aspect-[4/5]" /></Reveal>
          <Reveal>
            <SectionHead>What is included.</SectionHead>
            <ul className="list-none">
              {["Structural design and floor planning, worked out with you.",
                "Foundation, framing and full civil construction.",
                "Finishing to your chosen package, from basic to premium.",
                "A named engineer on site, and progress you can follow."].map((t,i)=>(
                <li key={i} className="grid grid-cols-[30px_1fr] gap-2 py-3.5 border-t border-line last:border-b text-base text-slate-900">
                  <span className="text-brand font-outfit">{String(i+1).padStart(2,"0")}</span><span>{t}</span>
                </li>))}
            </ul>
          </Reveal>
        </div>
      </Container></section>
    </>
  );
}
