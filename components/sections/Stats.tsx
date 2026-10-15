import Container from "@/components/ui/Container";
export default function Stats(){return <section className="bg-slate-800 text-white"><Container><div className="grid sm:grid-cols-3 gap-8 py-12">{[["Since 2021","Company incorporated"],["Two offices","Kumbakonam & Kovilpatti"],["One team","Design through construction"]].map(([n,label])=><div key={n}><p className="font-outfit text-3xl">{n}</p><p className="text-slatel mt-3">{label}</p></div>)}</div></Container></section>;}

