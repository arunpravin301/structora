import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 border-t-2 border-brand text-slatel pt-20 pb-10 text-sm">
      {/* Giant Background Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 bottom-[-0.08em] z-0 flex justify-center overflow-hidden"
      >
        <span className="font-outfit font-extrabold uppercase tracking-[-0.02em] leading-[0.82] text-white/[0.04] text-[clamp(3.75rem,13.5vw,11.75rem)] whitespace-nowrap">
          STRUCTORA
        </span>
      </div>
      <Container className="relative z-10">
        <div className="grid grid-cols-[1.5fr_1fr_1.2fr] max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-10 pb-20 max-[600px]:pb-14 border-b border-lined">
          {/* Brand Column */}
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
            <p className="leading-relaxed max-w-[34ch]">
              Designing and building homes, commercial, and industrial projects across Tamil Nadu, with engineers you can meet in person.
            </p>
          </div>

          {/* Navigate Column (2 Columns) */}
          <div className="max-w-[250px]">
            <h4 className="text-white text-xs font-semibold tracking-[.12em] uppercase pb-2.5 mb-4 border-b border-white/10 font-inter flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Navigate
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {site.nav.map((n) => (
                <Link
                  key={n.href}
                  className="block py-0.5 hover:text-brand transition-colors"
                  href={n.href}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect Column (with Office Locations & Icons) */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[.12em] uppercase pb-2.5 mb-4 border-b border-white/10 font-inter flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Connect
            </h4>
            <div className="space-y-3">
              {/* Office Locations: Kumbakonam | Kovilpatti */}
              <div className="flex items-center gap-3 py-0.5">
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="flex items-center flex-wrap gap-2">
                  {site.contact.addresses.map((o, i) => (
                    <span key={o.name} className="inline-flex items-center gap-2">
                      <Link
                        href={`/contact#${o.name.toLowerCase()}`}
                        className="hover:text-brand transition-colors"
                      >
                        {o.name}
                      </Link>
                      {i < site.contact.addresses.length - 1 && (
                        <span className="text-white/30">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 py-0.5">
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="flex items-center flex-wrap gap-2">
                  {site.contact.phones.map((phone, i) => (
                    <span key={phone} className="inline-flex items-center gap-2">
                      <a
                        className="hover:text-brand transition-colors"
                        href={`tel:+91${phone.replace(/\D/g, "").slice(-10)}`}
                      >
                        {phone}
                      </a>
                      {i < site.contact.phones.length - 1 && (
                        <span className="text-white/30">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                className="flex items-center gap-3 py-0.5 hover:text-brand transition-colors"
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener"
              >
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Email */}
              <a
                className="flex items-center gap-3 py-0.5 hover:text-brand transition-colors"
                href={`mailto:${site.contact.email}`}
              >
                <svg
                  className="w-4 h-4 text-brand shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{site.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-wrap gap-2.5 pt-6 text-xs text-slatel">
          <span>© 2026 Structora India Constructions Pvt Ltd · CIN {site.cin}</span>
          <Link href="/privacy" className="underline hover:text-brand transition-colors">
            Privacy notice
          </Link>
          <span>
            Website by{" "}
            <a
              href="https://zentumedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand transition-colors"
            >
              Zentu Media
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
