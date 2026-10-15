"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { submitEnquiry } from "@/lib/enquiry";
export default function EnquiryForm({source="contact",initialMessage=""}:{source?:string;initialMessage?:string}) {
 const id=useId();const lock=useRef(false);const [busy,setBusy]=useState(false),[sent,setSent]=useState(false),[error,setError]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setError("");
  const data=Object.fromEntries(new FormData(e.currentTarget));
  try{await submitEnquiry(data,source);setSent(true);}
  catch(err){setError(err instanceof Error&&err.name!=="TimeoutError"?err.message:"Delivery could not be confirmed. Please try again or call us.");}
  finally{lock.current=false;setBusy(false);}
 }
 if(sent)return <div role="status" className="border border-line p-8">Thank you. Your enquiry has been received.</div>;
 return <form onSubmit={submit} className="space-y-6" aria-busy={busy}>
 {([["name","Your name","text"],["phone","Phone number","tel"],["email","Email (optional)","email"]] as const).map(([name,label,type])=><div key={name}><label htmlFor={id+name} className="block text-sm mb-2">{label}</label><input id={id+name} name={name} type={type} required={name!=="email"} minLength={name==="name"?2:undefined} maxLength={name==="name"?100:name==="phone"?22:254} autoComplete={name==="phone"?"tel":name} className="field" /></div>)}
 <div><label htmlFor={id+"type"} className="block text-sm mb-2">What are you building?</label><select id={id+"type"} name="type" className="field">{["Residential","Commercial","Multi-storey Building","Renovation"].map(t=><option key={t}>{t}</option>)}</select></div>
 <div><label htmlFor={id+"message"} className="block text-sm mb-2">Location and project details</label><textarea id={id+"message"} name="message" defaultValue={initialMessage} maxLength={2000} rows={5} className="field" /></div>
 <div hidden><label>Leave blank<input name="botcheck" tabIndex={-1} autoComplete="off" /></label></div>
 <label className="flex items-start gap-3 text-sm"><input type="checkbox" name="consent" required className="mt-1" /><span>I agree to be contacted about this enquiry. See our <Link href="/privacy" className="underline">privacy notice</Link>.</span></label>
 {error&&<p role="alert" className="text-red-800">{error}</p>}
 <button disabled={busy} className="btn btn-cta w-full">{busy?"Sending…":"Send enquiry"}</button>
 <p className="text-sm text-slate">Prefer to talk? <a href="tel:+918248362020" className="underline">Call 82483 62020</a>.</p>
 </form>;
}

