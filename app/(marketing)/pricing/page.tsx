import { pageMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import PricingClient from "./PricingClient";
import CostEstimator from "@/components/tools/CostEstimator";
import EmiCalculator from "@/components/tools/EmiCalculator";

export const metadata = pageMetadata(
  "Pricing & Packages",
  "Transparent construction pricing packages, live build cost estimator, and home loan EMI calculator for Tamil Nadu.",
  "/pricing"
);

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing & Packages"
        title={
          <>
            Transparent pricing,{" "}
            <em className="font-serif italic font-medium text-brand">
              uncompromised engineering.
            </em>
          </>
        }
        intro="Select your district below to see our detailed tier packages for residential construction. We build with strict civil standards and absolute transparency."
      />

      <PricingClient />

      <section id="estimator" className="py-[118px] bg-mist border-t border-line">
        <Container>
          <Reveal><SectionHead>Estimate your construction cost.</SectionHead></Reveal>
          <Reveal><CostEstimator /></Reveal>
        </Container>
      </section>

      <section id="emi" className="py-[118px] bg-white border-t border-line">
        <Container>
          <Reveal><SectionHead>Plan your home loan EMI.</SectionHead></Reveal>
          <Reveal><EmiCalculator /></Reveal>
        </Container>
      </section>
    </>
  );
}
