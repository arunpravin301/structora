import type {MetadataRoute} from "next";
import {site} from "@/config/site";
import {siteUrl,canIndex} from "@/lib/seo";
import {getProjects,getBlogs} from "@/lib/content";

export const dynamic = "force-static";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  if(!canIndex)return [];
  const [projects,blogs]=await Promise.all([getProjects(),getBlogs()]);
  return [
    ...["","/services","/projects","/pricing","/about","/blogs","/contact","/privacy",...site.services.map(s=>"/services/"+s.slug)].map(p=>({url:siteUrl+p})),
    ...projects.filter(p=>p.slug?.current).map(p=>({url:siteUrl+"/projects/"+p.slug.current,...(p._updatedAt?{lastModified:p._updatedAt}:{})})),
    ...blogs.filter(p=>p.slug?.current).map(p=>({url:siteUrl+"/blogs/"+p.slug.current,...(p._updatedAt?{lastModified:p._updatedAt}:{})}))
  ];
}
