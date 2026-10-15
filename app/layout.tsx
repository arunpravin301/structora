import type {Metadata} from "next";
import BusinessSchema from "@/components/marketing/BusinessSchema";
import {canIndex,siteUrl} from "@/lib/seo";
import "./globals.css";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Structora India Constructions",template:"%s — Structora India"},description:"Residential and commercial construction in Tamil Nadu. Meet Structora India's engineers in Kumbakonam and Kovilpatti.",robots:{index:canIndex,follow:canIndex}};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..700&family=Manrope:wght@400..600&display=swap" rel="stylesheet" /></head><body><BusinessSchema />{children}</body></html>;
}

