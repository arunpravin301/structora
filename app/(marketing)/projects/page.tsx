import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ProjectFilters from "@/components/tools/ProjectFilters";
import TransformReveal from "@/components/tools/TransformReveal";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = { title: "Selected Work" };
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery, {}, { cache: "no-store" });
  return (
    <>
      <PageHero
        crumb="Selected Work"
        title={
          <>
            Projects you can drive out and{" "}
            <em className="font-serif italic font-medium text-amber-400">
              stand in front of.
            </em>
          </>
        }
        intro="A curated showcase of completed residential and commercial builds across Tamil Nadu. Filter by district or project category."
      />
      <section className="py-[118px]"><Container><ProjectFilters projects={projects} /></Container></section>
      <section className="bg-mist pt-[118px]">
        <Container>
          <Reveal><SectionHead center>Scroll to watch a project transform.</SectionHead></Reveal>
        </Container>
        
        {/* First Slider: Balaji Residence */}
        <TransformReveal 
          beforeSrc="/projects/2_balaji_residence_completed_cover.webp"
          afterSrc="/projects/2_balaji_residence_completed_final.webp"
          label="Balaji Abode · Kumbakonam"
        />

        {/* Second Slider: Zaheer Residence */}
        <TransformReveal 
          beforeSrc="/projects/1_zaheer_residence_ongoing_cover.webp"
          afterSrc="/projects/zaheer_execution.jpeg"
          label="Zaheer Residence · Tiruvannamalai"
        />
      </section>
    </>
  );
}
