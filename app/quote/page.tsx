import type { Metadata } from "next";
import { getAllProducts, heroImage } from "@/lib/products";
import { QuoteRequest } from "@/components/QuoteRequest";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send one request for every quality you need. We reply with a rate, " +
    "a lead time and a sample if you need one.",
  robots: { index: false, follow: true },
};

export default function QuotePage() {
  // The basket only stores slugs, so the thumbnails are resolved here and
  // passed down — that keeps the image manifest out of the client bundle.
  const photos = Object.fromEntries(
    getAllProducts().map((p) => [p.slug, heroImage(p)]),
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-10 md:py-16">
      <header className="mb-10 md:mb-14 max-w-2xl">
        <p className="label-caps text-indigo">Enquiry</p>
        <h1 className="display mt-3 text-4xl md:text-6xl text-ink">
          Request a quote
        </h1>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">
          Tell us the qualities and quantities. We&rsquo;ll come back with a
          rate per kilo, a lead time, and whether it&rsquo;s in ready stock.
        </p>
      </header>

      <QuoteRequest photos={photos} />
    </div>
  );
}
