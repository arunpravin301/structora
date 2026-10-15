// Browser validation improves feedback; Formspree must enforce server-side spam protection.
export async function submitEnquiry(data: Record<string, unknown>, source: string): Promise<void> {
 const text=(key:string)=>typeof data[key]==="string" ? (data[key] as string).trim() : "";
 const name=text("name"),phone=text("phone"),email=text("email"),type=text("type"),message=text("message");
 if(name.length<2||name.length>100)throw new Error("Please enter your name.");
 if(!/^[+\d\s().-]+$/.test(phone)||phone.replace(/\D/g,"").length<10||phone.replace(/\D/g,"").length>15)throw new Error("Please enter a valid phone number.");
 if(email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254))throw new Error("Please enter a valid email address.");
 if(data.consent!=="on"||text("_gotcha")||message.length>2000||!["Residential","Commercial","Multi-storey Building","Renovation"].includes(type))throw new Error("Please check your enquiry and consent.");
 const response=await fetch("https://formspree.io/f/xyeknvjl",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name,phone,email,type,message,source,consent:true,_gotcha:"",_subject:"Structora Website Enquiry"}),signal:AbortSignal.timeout(15000)});
 const receipt=await response.json();
 if(!response.ok||receipt?.ok!==true)throw new Error("Delivery could not be confirmed. Please try again or call us.");
}
