import { notFound } from "next/navigation";
import { headingId } from "@/lib/static-content";
import type { PortableTextBlock } from "next-sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getBlogs, getBlog } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { imageUrl } from "@/sanity/lib/image";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const valid = blogs.filter((b) => b.slug?.current).map((b) => ({ slug: b.slug.current }));
  return valid.length > 0 ? valid : [{ slug: "welcome-to-structora" }];
}

function extractHeadings(body: PortableTextBlock[]) {
  if (!Array.isArray(body)) return [];
  const headings: { id: string; text: string; level: number }[] = [];
  body.forEach((block) => {
    if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
      const text = block.children?.map((c) => c.text).join("") || "";
      if (text.trim()) {
        headings.push({
          id: headingId(text, block._key),
          text: text.trim(),
          level: block.style === "h2" ? 2 : 3,
        });
      }
    }
  });
  return headings;
}

function calculateReadTime(body: PortableTextBlock[], override?: string) {
  if (override && override.trim()) return override;
  if (!Array.isArray(body)) return "3 min read";
  let totalWords = 0;
  body.forEach((block) => {
    if (block._type === "block" && Array.isArray(block.children)) {
      block.children.forEach((c) => {
        if (typeof c.text === "string") {
          totalWords += c.text.trim().split(/\s+/).filter(Boolean).length;
        }
      });
    }
  });
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await getBlog(slug);
  return pageMetadata(
    p?.seoTitle || p?.title || "Article",
    p?.seoDescription || "Structora India construction journal.",
    "/blogs/" + slug
  );
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const [p, allBlogs] = await Promise.all([getBlog(slug), getBlogs()]);
  if (!p) notFound();

  const relatedBlogs = allBlogs.filter(
    (b) => b.slug?.current && b.slug.current !== slug
  );

  const cover = imageUrl(p.mainImage) || siteUrl + "/projects/2_balaji_residence_completed_final.webp";
  const headings = extractHeadings(p.body || []);
  const readTime = calculateReadTime(p.body || [], p.readTime);
  const showToc = p.showToc !== false && headings.length >= 2;

  // Schema.org Graph for SEO (BlogPosting + FAQPage if faqs exist)
  const schemaGraph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: p.title,
      description: p.seoDescription,
      datePublished: p.publishedAt,
      dateModified: p._updatedAt || p.publishedAt,
      mainEntityOfPage: siteUrl + "/blogs/" + slug,
      author: { "@id": siteUrl + "/#organization" },
      publisher: { "@id": siteUrl + "/#organization" },
      image: cover,
    },
  ];

  if (p.faqs && p.faqs.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      mainEntity: p.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": schemaGraph,
  };

  return (
    <>
      <PageHero
        crumb="Journal"
        title={p.title}
        intro={p.seoDescription || ""}
      />

      <Container>
        <article className="article-body max-w-3xl mx-auto py-16">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Journal", path: "/blogs" },
              { name: p.title, path: "/blogs/" + slug },
            ]}
          />

          {/* Metadata bar: Category, Date, Read Time */}
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-slate-500 font-outfit mt-4 mb-8 pb-4 border-b border-line">
            {p.category && (
              <span className="bg-brand/10 text-brand px-2.5 py-1 rounded-sm font-semibold">
                {p.category}
              </span>
            )}
            {p.publishedAt && (
              <time dateTime={p.publishedAt}>
                {new Date(p.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            )}
            <span>·</span>
            <span>{readTime}</span>
          </div>

          {/* Table of Contents */}
          {showToc && (
            <nav
              aria-label="Table of Contents"
              className="my-8 p-6 bg-mist/60 border border-slate-200 rounded-xl"
            >
              <div className="font-outfit uppercase tracking-wider text-xs font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-2 text-sm">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className={
                      h.level === 3 ? "pl-4 text-slate-600" : "font-medium text-slate-800"
                    }
                  >
                    <a
                      href={`#${h.id}`}
                      className="hover:text-brand hover:underline transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-slate-400">›</span> {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Body Content */}
          {p.body ? (
            <PortableText
              value={p.body}
              components={{
                block: {
                  h2: ({ children, value }) => {
                    const text =
                      value.children?.map((c) => c.text).join("") || "";
                    const id = headingId(text, value._key);
                    return (
                      <h2
                        id={id}
                        className="scroll-mt-24 text-2xl font-bold mt-10 mb-4 text-slate-900"
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children, value }) => {
                    const text =
                      value.children?.map((c) => c.text).join("") || "";
                    const id = headingId(text, value._key);
                    return (
                      <h3
                        id={id}
                        className="scroll-mt-24 text-xl font-semibold mt-8 mb-3 text-slate-800"
                      >
                        {children}
                      </h3>
                    );
                  },
                },
                types: {
                  image: ({ value }) => {
                    const src = imageUrl(value);
                    return src ? (
                      <figure className="my-8">
                        <Image
                          src={src}
                          alt={value.alt || p.title}
                          width={1200}
                          height={800}
                          className="w-full h-auto rounded-lg"
                        />
                        {value.alt && (
                          <figcaption className="text-xs text-slate-500 mt-2 text-center italic">
                            {value.alt}
                          </figcaption>
                        )}
                      </figure>
                    ) : null;
                  },
                },
                marks: {
                  link: ({ value, children }) => {
                    const href =
                      typeof value?.href === "string" &&
                      /^(https?:\/\/|mailto:|\/[^/])/.test(value.href)
                        ? value.href
                        : "#";
                    return (
                      <a href={href} rel="noopener noreferrer" className="text-brand underline">
                        {children}
                      </a>
                    );
                  },
                },
              }}
            />
          ) : (
            <p>This article is being updated.</p>
          )}

          {/* FAQ Accordion Section */}
          {p.faqs && p.faqs.length > 0 && (
            <section className="mt-14 pt-10 border-t border-line">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-outfit">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {p.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-slate-200 rounded-lg p-5 bg-white shadow-sm transition [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 group-open:text-brand">
                      <span>{faq.question}</span>
                      <span className="transition duration-200 group-open:rotate-180 text-slate-400">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Internal CTA Card */}
          <div className="mt-14 p-8 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold font-outfit mb-2 text-white">Planning to build in Tamil Nadu?</h3>
              <p className="text-slate-300 text-sm max-w-md">
                Meet our engineers in Kumbakonam or Kovilpatti, or estimate your build budget in seconds.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/pricing#estimator" className="btn bg-brand text-white text-xs px-5 py-2.5">
                Calculate Cost →
              </Link>
              <Link href="/contact" className="btn border-white/60 text-white text-xs px-5 py-2.5">
                Speak with Engineers
              </Link>
            </div>
          </div>

          {/* Related Guides for SEO Internal Linking */}
          {relatedBlogs.length > 0 && (
            <section className="mt-14 pt-10 border-t border-line">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-outfit">
                More Construction Guides from Our Engineers
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedBlogs.slice(0, 2).map((rb) => (
                  <Link
                    key={rb._id}
                    href={"/blogs/" + rb.slug.current}
                    className="group block border border-slate-200 rounded-xl p-6 bg-white hover:border-brand transition-colors no-underline"
                  >
                    {rb.category && (
                      <div className="text-[11px] uppercase tracking-wider text-brand font-semibold mb-2">
                        {rb.category}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand transition-colors mb-2">
                      {rb.title}
                    </h3>
                    {rb.seoDescription && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {rb.seoDescription}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
