import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Phase 2: protect the client portal. Inert until Supabase auth is added.
export function middleware(_req: NextRequest) {
  // const { data } = await supabase.auth.getUser(); if (!data.user) redirect to /login
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
