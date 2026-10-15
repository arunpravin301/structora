import type {Metadata} from "next";
export const siteUrl="https://structoraindia.com";
export function indexingAllowed(enabled:string|undefined,environment:string|undefined,nodeEnv:string|undefined):boolean {
 return enabled==="true" && (environment?environment==="production":nodeEnv==="production");
}
export const canIndex=indexingAllowed(process.env.PUBLIC_INDEXING_ENABLED,process.env.VERCEL_ENV,process.env.NODE_ENV);
export function pageMetadata(title:string,description:string,path:string):Metadata {
 const url=siteUrl+path,image=siteUrl+"/projects/2_balaji_residence_completed_final.webp";
 return {title,description,alternates:{canonical:url},robots:{index:canIndex,follow:canIndex},openGraph:{title,description,url,siteName:"Structora India Constructions",locale:"en_IN",type:"website",images:[{url:image}]},twitter:{card:"summary_large_image",title,description,images:[image]}};
}



