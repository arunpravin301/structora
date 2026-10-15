import type {MetadataRoute} from "next";
import {canIndex,siteUrl} from "@/lib/seo";

export const dynamic = "force-static";

export default function robots():MetadataRoute.Robots{
  return canIndex
    ? {rules:{userAgent:"*",allow:"/",disallow:["/studio/","/admin","/dashboard","/login"]},sitemap:siteUrl+"/sitemap.xml"}
    : {rules:{userAgent:"*",disallow:"/"}};
}
