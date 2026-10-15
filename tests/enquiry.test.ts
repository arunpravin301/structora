import test from "node:test";
import assert from "node:assert/strict";
import { submitEnquiry } from "../lib/enquiry";
const valid={name:" QA Example ",phone:"2025550123",email:"",type:"Residential",message:"Test",consent:"on",_gotcha:""};
test("invalid enquiries do not reach the provider",async(t)=>{
 let calls=0;t.mock.method(globalThis,"fetch",async()=>{calls++;return Response.json({ok:true});});
 for(const data of [{...valid,name:" "},{...valid,consent:""},{...valid,phone:"x"},{...valid,email:"bad"},{...valid,_gotcha:"spam"}])
  await assert.rejects(()=>submitEnquiry(data,"contact"));
 assert.equal(calls,0);
});
test("valid enquiries use approved destination and normalized details",async(t)=>{
 let endpoint="",payload:Record<string,unknown>={};
 t.mock.method(globalThis,"fetch",async(url,init)=>{endpoint=String(url);payload=JSON.parse(String(init?.body));return Response.json({ok:true});});
 await submitEnquiry(valid,"contact");
 assert.equal(endpoint,"https://formspree.io/f/xyeknvjl");
 assert.equal(payload.name,"QA Example");assert.equal(payload.source,"contact");assert.equal(payload.consent,true);
});
for(const [name,response] of [
 ["negative receipt",()=>Response.json({ok:false})],
 ["missing receipt",()=>Response.json({})],
 ["malformed receipt",()=>new Response("{",{status:200})],
 ["provider error",()=>Response.json({ok:true},{status:500})],
 ["rate limit",()=>Response.json({},{status:429})],
 ["network error",()=>{throw new TypeError("network");}],
 ["timeout",()=>{throw new DOMException("timeout","TimeoutError");}]
] as const)test(name+" never reports success",async(t)=>{
 t.mock.method(globalThis,"fetch",async()=>response());
 await assert.rejects(()=>submitEnquiry(valid,"contact"));
});



