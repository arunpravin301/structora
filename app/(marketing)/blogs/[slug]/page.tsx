import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getPost } from "@/lib/wordpress";

export default async function Article({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return (
    <>
      <PageHero crumb="Journal" title={post?.title ?? "Article"} intro={post?.category ?? "From the Structora team."} />
      <section className="py-[118px]"><Container>
        {post ? (
          <article className="max-w-[720px] mx-auto prose prose-lg [&_p]:text-slate [&_p]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p className="max-w-[720px] mx-auto text-slate">Article content loads from WordPress once connected.</p>
        )}
      </Container></section>
    </>
  );
}
