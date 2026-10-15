import { pageMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ProjectFilters from "@/components/tools/ProjectFilters";
import {getProjects} from "@/lib/content";


export const metadata = pageMetadata("Construction projects in Tamil Nadu", "Explore Structora India's completed and ongoing construction projects across Tamil Nadu.", "/projects");


export default async function ProjectsPage() {
  const projects = await getProjects();
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
        intro="A curated showcase of completed residential and commercial builds across Tamil Nadu. Filter by construction status."
      />
      <section className="py-[118px]"><Container><ProjectFilters projects={projects} /></Container></section>
    </>
  );
}
