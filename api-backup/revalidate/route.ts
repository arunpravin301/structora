import {revalidatePath} from "next/cache";
import {timingSafeEqual} from "node:crypto";
export async function POST(req:Request){
 const expected=process.env.REVALIDATE_SECRET,supplied=req.headers.get("authorization")?.replace(/^Bearer /,"");
 if(!expected||!supplied||Buffer.byteLength(expected)!==Buffer.byteLength(supplied)||!timingSafeEqual(Buffer.from(expected),Buffer.from(supplied)))return Response.json({ok:false},{status:401});
 revalidatePath("/","layout");return Response.json({ok:true});
}

