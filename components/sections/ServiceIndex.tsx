import Link from "next/link";
import {site} from "@/config/site";
export default function ServiceIndex(){return <div>{site.services.map(s=><Link key={s.slug} href={"/services/"+s.slug} className="grid md:grid-cols-[1fr_1fr_40px] gap-4 md:gap-8 py-8 border-t border-line last:border-b group"><h3 className="text-2xl md:text-3xl group-hover:text-brand">{s.name}</h3><p className="text-slate leading-relaxed">{s.desc}</p><span aria-hidden="true">→</span></Link>)}</div>;}

