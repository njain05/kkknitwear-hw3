import type { Metadata } from "next";
import Link from "next/link";
import { site, addressOneLine } from "@/lib/site";
import { FabricTexture } from "@/components/textures/FabricTexture";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Contact K.K Knitwear Club, ${site.address.city}. Call, WhatsApp or email ` +
    "for rates, samples and lead times on knitted fabric.",
};

const mapQuery = encodeURIComponent(addressOneLine);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-10 md:py-16">
      <header className="max-w-2xl mb-12">
        <p className="label-caps text-indigo">Contact</p>
        <h1 className="display mt-3 text-4xl md:text-6xl text-ink">
          Talk to the works directly.
        </h1>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">
          No agent in between. Call or message us with the quality and quantity
          you need and we&rsquo;ll come back with a rate and a lead time.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <div className="space-y-10">
          <div>
            <h2 className="label-caps text-ink-3 mb-4">Reach us</h2>
            <ul className="border-t border-rule">
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-4">
                <span className="text-ink-3 text-sm">Phone</span>
                <a
                  href={`tel:${site.phone}`}
                  className="figure-mono text-ink hover:text-indigo transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-4">
                <span className="text-ink-3 text-sm">WhatsApp</span>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figure-mono text-ink hover:text-indigo transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-4">
                <span className="text-ink-3 text-sm">Email</span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink hover:text-indigo transition-colors break-all text-right"
                >
                  {site.email}
                </a>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-4">
                <span className="text-ink-3 text-sm">Hours</span>
                <span className="text-ink text-right">{site.hours}</span>
              </li>
              <li className="border-b border-rule py-4 flex items-baseline justify-between gap-4">
                <span className="text-ink-3 text-sm">GST</span>
                <span className="figure-mono text-ink">{site.gst}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="label-caps text-ink-3 mb-4">The works</h2>
            <address className="not-italic text-lg text-ink leading-relaxed">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} — {site.address.pin}
              <br />
              {site.address.state}, {site.address.country}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-indigo border-b border-indigo/40 hover:border-indigo"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo text-paper px-6 py-3.5"
            >
              Message on WhatsApp
            </a>
            <a href={`tel:${site.phone}`} className="border border-ink px-6 py-3.5 text-ink">
              Call the works
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden min-h-[420px] lg:min-h-[560px] bg-indigo-deep">
          <div className="absolute inset-0 opacity-25" aria-hidden="true">
            <FabricTexture structure="dotKnit" ground="indigoDeep" scale={1.8} />
          </div>
          <div className="relative h-full flex flex-col justify-between p-7 md:p-10 text-paper">
            <div>
              <p className="label-caps text-paper/60">Sending an enquiry</p>
              <h2 className="display mt-4 text-2xl md:text-4xl">
                Send several qualities at once.
              </h2>
              <p className="mt-4 text-paper/80 leading-relaxed max-w-sm">
                Add the fabrics you want rated to a single request rather than
                messaging about each one separately.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/quote"
                className="inline-flex bg-paper text-indigo-deep px-6 py-3.5 hover:bg-paper-2 transition-colors"
              >
                Request a quote
              </Link>
              <p className="mt-5 text-2xs text-paper/50 leading-relaxed max-w-xs">
                Rates are quoted per lot against quantity and shade, so no
                prices are published online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
