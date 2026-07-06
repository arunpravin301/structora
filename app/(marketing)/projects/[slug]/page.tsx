import PageHero from "@/components/ui/PageHero";
export default function ProjectDetail({ params }: { params: { slug: string } }) {
  return <PageHero crumb="Work" title="Project detail" intro={`Project detail page for "${params.slug}". Content comes from WordPress in the build.`} />;
}
