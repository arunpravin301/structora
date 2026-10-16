import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getBlogs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { imageUrl } from "@/sanity/lib/image";

export const metadata = pageMetadata(
  "Construction Journal",
  "Notes on planning, building and construction from Structora India in Tamil Nadu.",
  "/blogs"
);

export const revalidate = 60;

export default async function Blogs() {
  const posts = await getBlogs();

  return (
    <>
      <PageHero
        crumb="Journal"
        title="Notes on building well."
        intro="Practical insights on planning, construction costs, materials, and engineering decisions."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {posts
              .filter((p) => p.slug?.current)
              .map((p) => {
                const thumb = p.coverImage || imageUrl(p.mainImage);
                return (
                  <article
                    key={p._id}
                    className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {thumb && (
                        <Link
                          href={"/blogs/" + p.slug.current}
                          className="block relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-slate-100"
                        >
                          <Image
                            src={thumb}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      )}
                      <div className="p-7 pb-0">
                        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500 font-outfit mb-3">
                          {p.category && (
                            <span className="bg-brand/10 text-brand px-2.5 py-0.5 rounded-sm font-semibold">
                              {p.category}
                            </span>
                          )}
                          {p.readTime && <span>{p.readTime}</span>}
                        </div>
                        <h2 className="text-[21px] leading-snug font-bold mb-3 text-slate-900 group-hover:text-brand transition-colors font-outfit">
                          <Link href={"/blogs/" + p.slug.current}>{p.title}</Link>
                        </h2>
                        {p.seoDescription && (
                          <p className="text-slate-600 line-clamp-3 leading-relaxed text-sm">
                            {p.seoDescription}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="p-7 pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-sm font-medium">
                      <Link
                        className="text-brand hover:underline flex items-center gap-1"
                        href={"/blogs/" + p.slug.current}
                      >
                        Read full guide <span>→</span>
                      </Link>
                      {p.publishedAt && (
                        <time
                          dateTime={p.publishedAt}
                          className="text-xs text-slate-400"
                        >
                          {new Date(p.publishedAt).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                  </article>
                );
              })}
          </div>

          {!posts.length && (
            <div className="text-center py-16 border border-dashed border-slate-300 rounded-xl max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Our journal is coming soon</h3>
              <p className="text-slate-500 text-sm mb-6">
                Our civil engineers are writing practical guides on building costs, approvals, and house construction in Tamil Nadu.
              </p>
              <Link href="/contact" className="btn btn-cta">
                Ask our team a question
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
