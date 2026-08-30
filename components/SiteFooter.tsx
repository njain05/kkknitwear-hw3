import Link from "next/link";
import { site, yearsInBusiness } from "@/lib/site";
import type { Category } from "@/lib/types";
import { FabricTexture } from "@/components/textures/FabricTexture";

export function SiteFooter({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-auto bg-indigo-deep text-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <FabricTexture structure="jersey" ground="indigoDeep" scale={2.4} />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <p className="display text-2xl md:text-3xl leading-none">K.K Knitwear Club</p>
            <p className="mt-3 text-sm text-paper/70 max-w-xs leading-relaxed">
              {site.supportingLine} {yearsInBusiness} years of knitting for the
              garment trade.
            </p>
            <p className="label-caps mt-6 text-paper/50">
              GST {site.gst}
            </p>
          </div>

          <div>
            <p className="label-caps text-paper/50 mb-4">Our range</p>
            <ul className="space-y-2">
              {categories.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/fabrics/category/${c.slug}`}
                    className="text-sm text-paper/80 hover:text-paper transition-colors inline-block py-1"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps text-paper/50 mb-4">Company</p>
            <ul className="space-y-2">
              {[
                { href: "/fabrics", label: "All fabrics" },
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About us" },
                { href: "/contact", label: "Contact" },
                { href: "/quote", label: "Request a quote" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-paper/80 hover:text-paper transition-colors inline-block py-1"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps text-paper/50 mb-4">Visit or call</p>
            <address className="not-italic text-sm text-paper/80 leading-relaxed">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} — {site.address.pin}
              <br />
              {site.address.state}, {site.address.country}
            </address>
            <p className="mt-4 text-sm">
              <a href={`tel:${site.phone}`} className="figure-mono text-paper hover:underline inline-block py-1.5">
                {site.phoneDisplay}
              </a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${site.email}`} className="text-paper/80 hover:text-paper inline-block py-1.5">
                {site.email}
              </a>
            </p>
            <p className="mt-4 text-2xs text-paper/50">{site.hours}</p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-paper/15 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <p className="text-2xs text-paper/50">
            © {new Date().getFullYear()} {site.name}. {site.legalStatus}, {site.natureOfBusiness}.
          </p>
          <div className="flex items-center gap-5">
            <span className="label-caps text-paper/40">Share</span>
            {[
              { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${site.url}` },
              { label: "X", href: `https://twitter.com/intent/tweet?url=${site.url}` },
              { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${site.url}` },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xs text-paper/60 hover:text-paper transition-colors inline-block py-2"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
