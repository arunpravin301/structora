import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t-2 border-brand text-slatel pt-20 pb-7 text-sm">
      <Container>
        <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr] max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-9 pb-11 border-b border-lined">
          <div>
            <div className="mb-6">
              <Image
                src="/logo/logo-dark.png"
                alt="Structora India Constructions"
                width={849}
                height={179}
                className="h-[68px] max-[600px]:h-[56px] w-auto object-contain"
              />
            </div>
            <p className="leading-relaxed max-w-[34ch]">Designing and building homes, commercial, and industrial projects across Tamil Nadu, with engineers you can meet in person.</p>
          </div>
          <div><h4 className="text-white text-xs font-semibold tracking-[.12em] uppercase mb-4 font-inter flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" />Navigate</h4>
            {site.nav.map((n) => <Link key={n.href} className="block py-1.5 hover:text-brand transition-colors" href={n.href}>{n.label}</Link>)}
          </div>
          <div><h4 className="text-white text-xs font-semibold tracking-[.12em] uppercase mb-4 font-inter flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" />Offices</h4>
            {site.contact.addresses.map((o) => (
              <Link key={o.name} className="block py-1.5 hover:text-brand transition-colors" href={`/contact#${o.name.toLowerCase()}`}>
                {o.name}
              </Link>
            ))}
          </div>
          <div><h4 className="text-white text-xs font-semibold tracking-[.12em] uppercase mb-4 font-inter flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand" />Connect</h4>
            <a className="block py-1.5 hover:text-brand transition-colors" href={`tel:+91${site.contact.phones[0].replace(/\D/g, "").slice(-10)}`}>{site.contact.phones[0]}</a>
            <a className="block py-1.5 hover:text-brand transition-colors" href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
            <a className="block py-1.5 hover:text-brand transition-colors" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-2.5 pt-6 text-xs text-slatel">
          <span>© 2026 Structora India Constructions Pvt Ltd · CIN {site.cin}</span><Link href="/privacy" className="underline hover:text-brand transition-colors">Privacy notice</Link><span>Website by Zentu Media</span>
        </div>
      </Container>
    </footer>
  );
}
