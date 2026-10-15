import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
const root=path.resolve("out");
const read=(file)=>readFile(path.join(root,file),"utf8");
for(const route of ["","about","contact","services","projects","pricing","blogs","privacy"]){
 const html=await read(path.join(route,"index.html"));
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route+" heading");
 assert.match(html,/rel="canonical" href="https:\/\/structoraindia.com[^"]*"/,route+" canonical");
 assert.match(html,/name="description" content="[^"]+"/,route+" description");
}
const home=await read("index.html");
const graphs=[...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1])["@graph"]||[]);
assert.equal(graphs.filter(s=>s["@type"]==="GeneralContractor").length,2);
const studio=await read("studio/index.html");
assert.match(studio,/name="robots" content="noindex, nofollow"/);
await access(path.join(root,".htaccess"));
await access(path.join(root,"404.html"));
const sitemap=await read("sitemap.xml");
for(const [,url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)){
 const parsed=new URL(url);assert.equal(parsed.origin,"https://structoraindia.com");
 const relative=decodeURIComponent(parsed.pathname).replace(/^\/|\/$/g,"");
 await access(path.join(root,relative,"index.html"));
}
console.log("PASS static public pages, metadata, two-office schema, Studio noindex, and sitemap targets");
