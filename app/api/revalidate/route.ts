import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// WordPress webhook calls this when content is published, so pages refresh
// without a redeploy. Protect with a shared secret (?secret=...).
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/journal");
  revalidatePath("/projects");
  return NextResponse.json({ ok: true, revalidated: true });
}
