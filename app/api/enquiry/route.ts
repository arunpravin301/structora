import { NextResponse } from "next/server";

// Phase 1: receive the contact form. Wire to email / WhatsApp / CRM here.
export async function POST(req: Request) {
  const data = await req.json();
  // TODO: send to email (Resend), or forward to WhatsApp Business API, or store.
  console.log("New enquiry:", data);
  return NextResponse.json({ ok: true });
}
