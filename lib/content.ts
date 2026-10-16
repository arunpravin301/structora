import "server-only";
import {cache} from "react";
import type {Image} from "sanity";
import type {PortableTextBlock} from "next-sanity";
import {client} from "@/sanity/lib/client";
import {projectsQuery,projectBySlugQuery,blogsQuery,blogBySlugQuery} from "@/sanity/lib/queries";
import {getLocalBlogs} from "@/lib/local-blogs";
export type Project={_id:string;_updatedAt?:string;title:string;slug:{current:string};location?:string;status?:string;coverImage?:Image;gallery?:Image[];builtUp?:number;plotSize?:string;projectValue?:number};
export type Blog={_id:string;_updatedAt?:string;title:string;slug:{current:string};publishedAt?:string;mainImage?:Image;coverImage?:string;category?:string;readTime?:string;showToc?:boolean;faqs?:Array<{question:string;answer:string}>;seoTitle?:string;seoDescription?:string;body?:PortableTextBlock[]};
export const getProjects=cache(()=>client.fetch<Project[]>(projectsQuery,{}, {next:{revalidate:60},signal:AbortSignal.timeout(8000)}));
export const getProject=cache((slug:string)=>client.fetch<Project|null>(projectBySlugQuery,{slug},{next:{revalidate:60},signal:AbortSignal.timeout(8000)}));
export const getBlogs=cache(async ():Promise<Blog[]>=>{
  const local=getLocalBlogs();
  let remote:Blog[]=[];
  try{
    remote=await client.fetch<Blog[]>(blogsQuery,{},{next:{revalidate:60},signal:AbortSignal.timeout(8000)});
  }catch{
    remote=[];
  }
  const validRemote=(remote||[]).filter(b=>b.slug?.current);
  const seen=new Set(validRemote.map(b=>b.slug.current));
  return [...validRemote,...local.filter(b=>b.slug?.current && !seen.has(b.slug.current))];
});
export const getBlog=cache(async (slug:string):Promise<Blog|null>=>{
  try{
    const remote=await client.fetch<Blog|null>(blogBySlugQuery,{slug},{next:{revalidate:60},signal:AbortSignal.timeout(8000)});
    if(remote)return remote;
  }catch{
    // fallback to local
  }
  return getLocalBlogs().find(b=>b.slug?.current===slug)||null;
});

