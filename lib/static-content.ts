export function headingId(text: string, key = "heading"): string {
 const label=text.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "section";
 return label+"-"+encodeURIComponent(key);
}
export function projectDetailPath(slug: string | undefined, built: Array<{slug?:{current:string}}>): string | null {
 return slug && built.some(p=>p.slug?.current===slug) ? "/projects/"+slug+"/" : null;
}
