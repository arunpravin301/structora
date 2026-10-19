import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ServiceIndex from "@/components/sections/ServiceIndex";
import Testimonials from "@/components/sections/Testimonials";

export const metadata = pageMetadata("Construction services in Tamil Nadu", "Residential, commercial, renovation and multi-storey construction services from Structora India.", "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Engineering Services"
        title={
          <>
            Uncompromising engineering, from a single home to a{" "}
            <em className="font-serif italic font-medium text-brand">
              multi-storey complex.
            </em>
          </>
        }
        intro="Whatever you are building, the same corporate-grade civil engineers see it through from the initial soil test to the final handover."
      />

      <section className="py-[118px]"><Container><Reveal><ServiceIndex /></Reveal></Container></section>

      {/* CTA section replacing the old static pricing table & calculators */}
      <section className="py-[100px] bg-mist">
        <Container>
          <Reveal>
            <div className="bg-white border border-line p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="max-w-2xl">
                <div className="font-outfit uppercase tracking-[0.2em] text-xs text-brand font-semibold mb-3">Transparent Cost Breakdown</div>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                  Explore our detailed pricing packages & specifications.
                </h2>
                <p className="text-slate text-base md:text-lg leading-relaxed mb-6">
                  Compare our <strong>Basic</strong>, <strong>Standard</strong>, <strong>Premium</strong>, and <strong>Prestige</strong> tiers across Kumbakonam, Thiruvannamalai, and Kovilpatti — or request a custom Luxury build estimate.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-outfit uppercase tracking-wider text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="text-brand">✓</span> Live Cost Estimator</span>
                  <span className="flex items-center gap-1.5"><span className="text-brand">✓</span> Home Loan EMI Calculator</span>
                  <span className="flex items-center gap-1.5"><span className="text-brand">✓</span> Full Material Comparison</span>
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <Link
                  href="/pricing"
                  className="inline-block w-full md:w-auto text-center btn bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 font-outfit uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  View Pricing & Packages →
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-[118px] bg-white"><Container>
        <Reveal><SectionHead center>What our clients say.</SectionHead></Reveal>
        <Testimonials />
      </Container></section>
    </>
  );
}
