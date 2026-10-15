import Link from "next/link";
import {siteUrl} from "@/lib/seo";
export default function Breadcrumbs({items}:{items:{name:string;path:string}[]}){
 const data={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,item:siteUrl+item.path}))};
 return <><nav aria-label="Breadcrumb" className="text-sm mb-8 flex flex-wrap gap-3">{items.map((item,i)=><span key={item.path}>{i>0&&<span aria-hidden="true">/ </span>}<Link href={item.path} aria-current={i===items.length-1?"page":undefined}>{item.name}</Link></span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}} /></>;
}

