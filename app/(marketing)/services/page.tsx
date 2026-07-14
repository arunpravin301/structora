import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ServiceIndex from "@/components/sections/ServiceIndex";
import CostEstimator from "@/components/tools/CostEstimator";
import EmiCalculator from "@/components/tools/EmiCalculator";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero crumb="Services" title="One discipline, from a single home to a factory floor."
        intro="Whatever you are building, the same engineers see it through from the first drawing to the final handover." />

      <section className="py-[118px]"><Container><Reveal><ServiceIndex /></Reveal></Container></section>

      <section className="py-[118px] bg-mist"><Container>
        <Reveal><SectionHead>Packages built around your budget.</SectionHead></Reveal>
        <Reveal><table className="w-full border-collapse border border-line">
          <thead><tr>{["Package","Per sq ft","What is included"].map(h=>(
            <th key={h} className="border border-line p-4.5 text-left bg-slate-900 text-white font-outfit font-semibold text-[19px]" style={{padding:18}}>{h}</th>))}</tr></thead>
          <tbody>
            {[["Basic","₹2,400 / sq ft","Structure, brickwork and plastering, to a ready-to-finish standard. (Inclusions draft, to confirm.)"],
              ["Standard","₹2,700 / sq ft","Everything in Basic, plus flooring, painting and standard fittings. (Inclusions draft, to confirm.)"],
              ["Premium","₹3,000 / sq ft","Everything in Standard, plus premium finishes and fittings. (Inclusions draft, to confirm.)"]].map(([p,pr,inc])=>(
              <tr key={p}>
                <th className="border border-line p-4.5 text-left font-outfit font-semibold text-[17px] text-brand bg-mist" style={{padding:18}}>{p}</th>
                <td className="border border-line p-4.5 font-outfit text-[22px] text-slate-900" style={{padding:18}}>{pr}</td>
                <td className="border border-line p-4.5 text-[15px] text-slate" style={{padding:18}}>{inc}</td>
              </tr>))}
          </tbody>
        </table></Reveal>
        <p className="text-[12.5px] text-slate italic mt-4">Starting prices. Exact inclusions per package to be confirmed with Structora.</p>
      </Container></section>

      <section id="estimator" className="py-[118px]"><Container>
        <Reveal><SectionHead>Estimate your construction cost.</SectionHead></Reveal>
        <Reveal><CostEstimator /></Reveal>
      </Container></section>

      <section id="emi" className="py-[118px] bg-mist"><Container>
        <Reveal><SectionHead>Plan your home loan EMI.</SectionHead></Reveal>
        <Reveal><EmiCalculator /></Reveal>
      </Container></section>
    </>
  );
}
