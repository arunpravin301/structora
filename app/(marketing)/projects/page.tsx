import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ProjectFilters from "@/components/tools/ProjectFilters";
import TransformReveal from "@/components/tools/TransformReveal";

export const metadata: Metadata = { title: "Selected Work" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero crumb="Selected work" title="Projects you can drive out and stand in front of."
        intro="A selection of completed work across Tamil Nadu. Filter by district or by the type of build." />
      <section className="py-[118px]"><Container><ProjectFilters /></Container></section>
      <section className="bg-mist pt-[118px]">
        <Container>
          <Reveal><SectionHead center>Scroll to watch a project transform.</SectionHead></Reveal>
        </Container>
        <TransformReveal />
      </section>
    </>
  );
}
