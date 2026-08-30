import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { getCategories } from "@/lib/products";
import { QuoteBasketProvider } from "@/lib/quote-basket";
import "./globals.css";

/**
 * Archivo carries a width axis, so display type can be stretched into mill
 * signage without loading a second family. Plex Mono sets the spec tables —
 * GSM and widths should read as datasheet figures, not marketing copy.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Knitted Fabric Manufacturer, Ludhiana`,
    template: `%s — ${site.name}`,
  },
  description:
    "Mill-direct knitted fabric from Ludhiana since 1990. Sportswear, dot knit, terry, " +
    "mesh and home furnishing fabric. Small lots welcome, quick turnaround.",
  keywords: [
    "knitted fabric manufacturer",
    "polyester fabric Ludhiana",
    "sportswear fabric supplier",
    "dot knit fabric",
    "terry fabric manufacturer",
    "fabric wholesale India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} — Knitted Fabric Manufacturer, Ludhiana`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const categories = getCategories();

  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-paper text-ink pb-16 lg:pb-0">
        <OrganizationSchema />
        <QuoteBasketProvider>
          <SiteHeader categories={categories} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter categories={categories} />
          <MobileActionBar />
        </QuoteBasketProvider>
      </body>
    </html>
  );
}
