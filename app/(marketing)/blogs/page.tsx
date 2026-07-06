import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = { title: "Journal" };

// placeholders shown until WordPress is connected
const FALLBACK = [
  { slug: "#", title: "Understanding what a home actually costs to build", category: "Cost", excerpt: "A short standfirst previewing the article." },
  { slug: "#", title: "What happens between your enquiry and your keys", category: "Process", excerpt: "A short standfirst previewing the article." },
  { slug: "#", title: "Choosing between a G+1 and a G+2 for your plot", category: "Tips", excerpt: "A short standfirst previewing the article." }
];

export default async function JournalPage() {
  const posts = await getPosts();
  const items = posts.length ? posts : FALLBACK;
  return (
    <>
      <PageHero crumb="Journal" title="Notes on building, cost, and getting it right."
        intro="Practical writing for anyone planning to build in Tamil Nadu, from the Structora team." />
      <section className="py-[118px]"><Container>
        <div className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
          {items.map((p:any,i:number)=>(<Reveal key={i}>
            <Link href={p.slug === "#" ? "#" : `/journal/${p.slug}`} className="block border border-line hover:shadow-[0_12px_30px_rgba(10,22,38,.08)] hover:-translate-y-1 transition">
              <Plate cap="Article image" idx={`JNL. ${String(i+1).padStart(3,"0")}`} className="aspect-[16/10]" />
              <div className="p-6">
                <div className="text-[11px] tracking-[.12em] uppercase text-red">{p.category ?? "Journal"} · 2026</div>
                <h3 className="text-[21px] font-semibold my-2.5 leading-tight">{p.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{p.excerpt}</p>
              </div>
            </Link>
          </Reveal>))}
        </div>
        {!posts.length && <p className="text-[12.5px] text-slate italic mt-8">Showing placeholders. Connect WordPress (WORDPRESS_API_URL) to load real posts.</p>}
      </Container></section>
    </>
  );
}
