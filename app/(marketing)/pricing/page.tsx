import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PricingClient from "./PricingClient";

export const metadata: Metadata = { title: "Pricing & Packages" };

export default function PricingPage() {
  return (
    <>
      <PageHero crumb="Pricing" title="Transparent pricing, uncompromised quality."
        intro="Select your location below to see our detailed tier packages for residential construction. We build with the finest materials and absolute transparency." />
      <PricingClient />
    </>
  );
}
