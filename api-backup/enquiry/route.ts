const reply=(status:number,error:string)=>Response.json({ok:false,error},{status});
export async function POST(req:Request) {
  const origin=req.headers.get("origin");
  if(origin && origin!==new URL(req.url).origin) return reply(403,"Request not allowed.");
  if(!req.headers.get("content-type")?.includes("application/json")) return reply(415,"Send JSON.");
  let data:Record<string,unknown>;
  try {
    const reader=req.body?.getReader();
    if(!reader) return reply(400,"Please complete the form.");
    let size=0;const chunks:Uint8Array[]=[];
    while(true){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>8192){await reader.cancel();return reply(413,"Your message is too long.");}chunks.push(part.value);}
    const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
    const parsed=JSON.parse(new TextDecoder().decode(bytes));
    if(!parsed||typeof parsed!=="object"||Array.isArray(parsed)) return reply(400,"Invalid form.");
    data=parsed;
  }catch{return reply(400,"Invalid form.");}
  const str=(key:string)=>typeof data[key]==="string"?(data[key] as string).trim():"";
  const name=str("name"),phone=str("phone"),email=str("email"),message=str("message"),type=str("type"),source=str("source");
  if(name.length<2||name.length>100||!/^\+?[\d ()-]{10,22}$/.test(phone)||phone.replace(/\D/g,"").length<10||phone.replace(/\D/g,"").length>15||email.length>254||(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))||message.length>2000||source.length>100||!["Residential","Commercial","Multi-storey Building","Renovation"].includes(type)||data.consent!==true||str("website")) return reply(400,"Check your name, phone, email and consent.");
  try {
    const response=await fetch("https://formspree.io/f/xyeknvjl",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name,phone,...(email?{email}:{}),message,type,source,_subject:"Structora website enquiry"}),signal:AbortSignal.timeout(12000),redirect:"error"});
    if(!response.ok)return reply(response.status===429?429:502,"We could not confirm delivery. Please try again or contact us directly.");
    const receipt=await response.json();
    if(receipt.ok!==true)return reply(502,"We could not confirm delivery. Please contact us directly.");
    return Response.json({ok:true});
  }catch{return reply(502,"We could not confirm delivery. Please try again or contact us directly.");}
}

