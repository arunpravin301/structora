import {site} from "@/config/site";
import {siteUrl} from "@/lib/seo";
export default function BusinessSchema(){
 const data={"@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":siteUrl+"/#organization",name:site.name,legalName:"Structora India Constructions Pvt Ltd.",url:siteUrl,logo:siteUrl+"/logo/logo-light.png",email:site.contact.email,telephone:site.contact.phones.map(p=>"+91"+p.replace(/\D/g,"")),identifier:site.cin},
 {"@type":"WebSite","@id":siteUrl+"/#website",url:siteUrl,name:site.name,publisher:{"@id":siteUrl+"/#organization"}},
 ...site.contact.addresses.map((office,i)=>({"@type":"GeneralContractor","@id":siteUrl+"/#office-"+office.name.toLowerCase(),name:site.name+" — "+office.name,url:siteUrl+"/contact#"+office.name.toLowerCase(),parentOrganization:{"@id":siteUrl+"/#organization"},image:siteUrl+"/logo/logo-light.png",email:site.contact.email,hasMap:office.mapUrl,geo:{"@type":"GeoCoordinates",latitude:office.lat,longitude:office.lng},address:{"@type":"PostalAddress",streetAddress:i===0?"Plot No. 4, Mangalambikai Homes, Annai Anjugam Nagar, Ullur":"354 M4D/4, Nalattinputtur",addressLocality:office.name,addressRegion:"Tamil Nadu",postalCode:i===0?"612001":"628716",addressCountry:"IN"}}))
 ]};
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}} />;
}

