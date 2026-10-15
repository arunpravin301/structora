import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getProjects, getProject } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { imageUrl } from "@/sanity/lib/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.filter((p) => p.slug?.current).map((p) => ({ slug: p.slug.current }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await getProject(slug);
  return pageMetadata(
    p?.title || "Project",
    p
      ? `${p.title}${p.location ? " in " + p.location : ""}. Explore this Structora India construction project.`
      : "Structora India projects.",
    "/projects/" + slug
  );
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  const images = [
    ...new Set(
      [p.coverImage, ...(p.gallery || [])]
        .map((img) => imageUrl(img, 1600))
        .filter((url): url is string => Boolean(url))
    ),
  ];

  return (
    <>
      <PageHero
        crumb="Selected work"
        title={p.title}
        intro={[p.location, p.status].filter(Boolean).join(" · ")}
      />
      <section className="py-16 md:py-24">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: p.title, path: "/projects/" + slug },
            ]}
          />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {images.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                <Image
                  src={src}
                  alt={p.title + " — photograph " + (i + 1)}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {!images.length && <p className="mt-8 text-slate-500">Project photographs will be added soon.</p>}
          <div className="mt-12 pt-8 border-t border-line flex flex-wrap gap-4 items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-outfit">Interested in a similar build?</h3>
              <p className="text-sm text-slate-500">Discuss floor plans, estimates, and specifications with our engineers.</p>
            </div>
            <Link href="/contact" className="btn btn-cta">
              Discuss your project
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
