import type {Metadata} from "next";
import BusinessSchema from "@/components/marketing/BusinessSchema";
import {canIndex,siteUrl} from "@/lib/seo";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Structora India Constructions", template: "%s — Structora India" },
  description:
    "Residential and commercial construction in Tamil Nadu. Meet Structora India's engineers in Kumbakonam and Kovilpatti.",
  robots: { index: canIndex, follow: canIndex },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400..700&family=Manrope:wght@400..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <BusinessSchema />
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}

