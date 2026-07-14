import Link from "next/link";
import Container from "../ui/Container";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#06101C] text-slatel pt-20 pb-7 text-sm">
      <Container>
        <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr] max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-9 pb-11 border-b border-lined">
          <div>
            <div className="font-outfit font-semibold text-2xl tracking-[.05em] text-white mb-4">STRUCTORA</div>
            <p className="leading-relaxed max-w-[34ch]">Designing and building homes, commercial, and industrial projects across Tamil Nadu, with engineers you can meet in person.</p>
          </div>
          <div><h4 className="text-white text-xs font-medium tracking-[.1em] uppercase mb-4 font-inter">Navigate</h4>
            {site.nav.map((n) => <Link key={n.href} className="block py-1.5 hover:text-white" href={n.href}>{n.label}</Link>)}
          </div>
          <div><h4 className="text-white text-xs font-medium tracking-[.1em] uppercase mb-4 font-inter">Offices</h4>
            {site.contact.addresses.map((o) => <span key={o.name} className="block py-1.5">{o.name}</span>)}
          </div>
          <div><h4 className="text-white text-xs font-medium tracking-[.1em] uppercase mb-4 font-inter">Connect</h4>
            <a className="block py-1.5 hover:text-white" href={`tel:${site.contact.phones[0].replace(/\s/g, "")}`}>{site.contact.phones[0]}</a>
            <a className="block py-1.5 hover:text-white" href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
            <a className="block py-1.5 hover:text-white" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-2.5 pt-6 text-xs text-[#3F4F66]">
          <span>© 2026 Structora India Constructions Pvt Ltd · CIN {site.cin}</span><span>Website by Zentu Media</span>
        </div>
      </Container>
    </footer>
  );
}
