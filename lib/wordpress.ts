// Headless WordPress data layer (REST API).
// Set WORDPRESS_API_URL in .env.local, e.g. https://cms.structoraindia.com/wp-json/wp/v2
const API = process.env.WORDPRESS_API_URL;

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category?: string;
};

async function wp<T>(path: string, revalidate = 60): Promise<T | null> {
  if (!API) return null; // not configured yet
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  const data = await wp<any[]>(`/posts?_embed&per_page=12`);
  if (!data) return [];
  return data.map((p) => ({
    slug: p.slug,
    title: p.title?.rendered ?? "",
    excerpt: (p.excerpt?.rendered ?? "").replace(/<[^>]+>/g, "").trim(),
    content: p.content?.rendered ?? "",
    date: p.date,
    category: p._embedded?.["wp:term"]?.[0]?.[0]?.name
  }));
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await wp<any[]>(`/posts?slug=${slug}&_embed`);
  if (!data || !data[0]) return null;
  const p = data[0];
  return {
    slug: p.slug,
    title: p.title?.rendered ?? "",
    excerpt: "",
    content: p.content?.rendered ?? "",
    date: p.date,
    category: p._embedded?.["wp:term"]?.[0]?.[0]?.name
  };
}
