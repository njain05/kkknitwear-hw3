import Link from "next/link";
import { site, yearsInBusiness } from "@/lib/site";
import {
  getFeaturedProducts,
  getCategoriesWithCounts,
  getAllProducts,
  totalPhotoCount,
  heroImage,
} from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SwatchCard } from "@/components/SwatchCard";
import { FabricTexture } from "@/components/textures/FabricTexture";

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const categories = getCategoriesWithCounts();
  const productCount = getAllProducts().length;

  return (
    <>
      {/* ---- Hero ---------------------------------------------------- */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-8 pt-10 md:pt-16 pb-14 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:items-end">
          <div>
            <p className="label-caps text-indigo">
              Knitted fabric manufacturer · Ludhiana
            </p>

            <h1 className="display mt-5 text-[2.75rem] sm:text-6xl lg:text-[5.25rem] text-ink">
              Mill-direct
              <br />
              knitted fabric.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-ink-2 max-w-md leading-relaxed">
              Small lots, quick turnaround. We&rsquo;ll run the order a larger
              mill won&rsquo;t take.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fabrics"
                className="inline-flex items-center bg-indigo text-paper px-6 py-3.5 hover:bg-indigo-deep transition-colors"
              >
                Browse {productCount} fabrics
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center border border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                Request a quote
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-rule pt-6 max-w-lg">
              {[
                { n: yearsInBusiness, l: "Years knitting" },
                { n: productCount, l: "Fabrics in range" },
                { n: categories.length, l: "Categories" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="figure-mono block text-3xl md:text-4xl text-indigo leading-none">
                      {s.n}
                    </span>
                    <span className="label-caps block mt-2 text-ink-3">{s.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <SwatchCard totalQualities={productCount} />
        </div>
      </section>

      {/* ---- Why buyers work with us --------------------------------- */}
      <section className="border-y border-rule bg-paper-2">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Small lots welcome",
                d: "A large mill will turn away a short run. We take it, and we quote on it the same way we quote a full lot.",
              },
              {
                t: "Ready stock on the shelf",
                d: "Surplus lots are held here in Ludhiana. When a shade is in stock, it ships without waiting on a knitting slot.",
              },
              {
                t: `${yearsInBusiness} years in the trade`,
                d: `Knitting for the garment trade since ${site.established}, from the same works in Kabir Nagar.`,
              },
            ].map((c, i) => (
              <div key={c.t}>
                <span className="figure-mono text-2xs text-indigo">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-xl text-ink">{c.t}</h2>
                <p className="mt-2 text-ink-2 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Featured fabrics ---------------------------------------- */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-8 py-14 md:py-20">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="label-caps text-indigo">From the range</p>
            <h2 className="display mt-3 text-3xl md:text-5xl text-ink">
              Fabrics we knit
            </h2>
          </div>
          <Link
            href="/fabrics"
            className="hidden sm:inline-block text-sm text-ink-2 hover:text-indigo transition-colors whitespace-nowrap border-b border-rule pb-1"
          >
            All fabrics →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} photo={heroImage(p)} />
          ))}
        </div>

        <Link
          href="/fabrics"
          className="sm:hidden mt-10 block text-center border border-ink py-3.5 text-ink"
        >
          All fabrics
        </Link>
      </section>

      {/* ---- The range ------------------------------------------------ */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-14 md:py-20">
          <p className="label-caps text-indigo">Our range</p>
          <h2 className="display mt-3 text-3xl md:text-5xl text-ink mb-8">
            Sportswear to home furnishing
          </h2>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-rule border border-rule">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/fabrics/category/${c.slug}`}
                  className="group flex flex-col justify-between h-full bg-paper p-4 md:p-5 hover:bg-indigo-wash transition-colors min-h-[110px]"
                >
                  <span className="text-sm md:text-base text-ink group-hover:text-indigo transition-colors">
                    {c.name}
                  </span>
                  <span className="figure-mono text-2xs text-ink-3 mt-3">
                    {c.count} {c.count === 1 ? "fabric" : "fabrics"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Closing CTA ---------------------------------------------- */}
      <section className="relative overflow-hidden bg-indigo text-paper">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <FabricTexture structure="dotKnit" ground="indigo" scale={2.8} />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="display text-3xl md:text-5xl">
              Tell us the quality and the quantity.
            </h2>
            <p className="mt-5 text-lg text-paper/80 leading-relaxed">
              Send us the GSM, width and shade you need — or just the garment
              you&rsquo;re making. We&rsquo;ll come back with what we can run
              and how soon.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className="inline-flex items-center bg-paper text-indigo-deep px-6 py-3.5 hover:bg-paper-2 transition-colors"
              >
                Request a quote
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center border border-paper/40 px-6 py-3.5 text-paper hover:bg-paper/10 transition-colors figure-mono"
              >
                {site.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-2xs text-paper/50">
              {totalPhotoCount} fabric photographs · {site.address.city}, {site.address.state}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
