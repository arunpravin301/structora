import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ProjectFilters from "@/components/tools/ProjectFilters";
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
    </>
  );
}
