import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://structoraindia.com"),
  title: { default: "Structora India Constructions", template: "%s — Structora India" },
  description:
    "Structora India Constructions designs and builds residential, commercial and industrial projects across Kumbakonam and Kovilpatti, with engineers you can meet in person."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
