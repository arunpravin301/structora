import type { MetadataRoute } from "next";
const base = "https://structoraindia.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/projects", "/about", "/journal", "/contact"];
  return routes.map((r) => ({ url: base + r, lastModified: new Date() }));
}
