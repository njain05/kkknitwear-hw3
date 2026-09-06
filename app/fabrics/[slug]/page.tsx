import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  imagesFor,
  heroImage,
  getCategory,
} from "@/lib/products";
import { site } from "@/lib/site";
import type { Specs } from "@/lib/types";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToQuote } from "@/components/AddToQuote";
import { ProductCard } from "@/components/ProductCard";
import { FabricTexture, STRUCTURE_LABELS } from "@/components/textures/FabricTexture";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fabrics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const photo = heroImage(product);
  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: `${product.name} — ${site.name}`,
      description: product.summary,
      images: photo ? [{ url: photo }] : undefined,
    },
  };
}

const SPEC_ORDER: { key: keyof Specs; label: string }[] = [
  { key: "material", label: "Material" },
  { key: "gsm", label: "GSM" },
  { key: "width", label: "Width" },
  { key: "weave", label: "Knit / weave" },
  { key: "pattern", label: "Pattern" },
  { key: "colour", label: "Colour" },
  { key: "usage", label: "Usage" },
];

export default async function ProductPage({ params }: PageProps<"/fabrics/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const photos = imagesFor(product);
  const related = getAllProducts()
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((c) => product.categories.includes(c)),
    )
    .slice(0, 4);

  const specs = SPEC_ORDER.filter(({ key }) => product.specs[key]);
  const hasUnconfirmed = product.unconfirmed.length > 0;

  // Product schema deliberately carries no offer or price — everything is
  // quoted per lot. See CLAUDE.md rule 1.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: photos.map((p) => `${site.url}${p}`),
    category: product.categories.map((c) => getCategory(c)?.name).filter(Boolean),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: {
      "@type": "Organization",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.pin,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-6 md:py-10">
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-2xs text-ink-3">
            <li><Link href="/" className="hover:text-indigo">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/fabrics" className="hover:text-indigo">Fabrics</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-2">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {photos.length > 0 ? (
            <ProductGallery photos={photos} name={product.name} />
          ) : (
            <div className="relative aspect-square bg-paper-2">
              <FabricTexture structure={product.structure} ground="paper2" scale={2} />
              <p className="absolute inset-x-0 bottom-0 p-4 text-2xs text-ink-3">
                {STRUCTURE_LABELS[product.structure]} structure illustration —
                photograph available on request
              </p>
            </div>
          )}

          <div className="lg:sticky lg:top-28">
            <p className="label-caps text-indigo">
              {STRUCTURE_LABELS[product.structure]}
            </p>
            <h1 className="display mt-3 text-3xl md:text-5xl text-ink">
              {product.name}
            </h1>
            <p className="mt-5 text-lg text-ink-2 leading-relaxed">
              {product.summary}
            </p>

            <table className="mt-8 w-full text-sm border-t border-rule">
              <caption className="sr-only">
                Specifications for {product.name}
              </caption>
              <tbody>
                {specs.map(({ key, label }) => (
                  <tr key={key} className="border-b border-rule">
                    <th
                      scope="row"
                      className="text-left font-normal text-ink-3 py-3 pr-4 w-2/5 align-top"
                    >
                      {label}
                    </th>
                    <td className="py-3 figure-mono text-ink">
                      {product.specs[key]}
                      {product.unconfirmed.includes(key) && (
                        <span
                          className="ml-2 font-sans text-2xs text-clay"
                          title="Not published on the previous site — to be confirmed"
                        >
                          to confirm
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-rule">
                  <th scope="row" className="text-left font-normal text-ink-3 py-3 pr-4 align-top">
                    Price
                  </th>
                  <td className="py-3 text-ink">On request, per lot</td>
                </tr>
                <tr className="border-b border-rule">
                  <th scope="row" className="text-left font-normal text-ink-3 py-3 pr-4 align-top">
                    Minimum order
                  </th>
                  <td className="py-3 text-ink">
                    Small lots accepted — ask us
                  </td>
                </tr>
              </tbody>
            </table>

            {hasUnconfirmed && (
              <p className="mt-3 text-2xs text-ink-3 leading-relaxed">
                Figures marked <span className="text-clay">to confirm</span> are
                indicative. We&rsquo;ll confirm exact specifications against your
                requirement.
              </p>
            )}

            {product.applications.length > 0 && (
              <div className="mt-8">
                <p className="label-caps text-ink-3 mb-3">Typically used for</p>
                <ul className="flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <li
                      key={a}
                      className="border border-rule px-3 py-1.5 text-sm text-ink-2"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <AddToQuote slug={product.slug} name={product.name} />
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  `Hello K.K Knitwear Club, I'd like a rate on ${product.name}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-ink px-6 py-3.5 text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                Ask on WhatsApp
              </a>
            </div>

            <p className="mt-5 text-2xs text-ink-3">
              Or call{" "}
              <a href={`tel:${site.phone}`} className="figure-mono text-ink-2 hover:text-indigo">
                {site.phoneDisplay}
              </a>{" "}
              · {site.hours}
            </p>

            <ShareButtons productName={product.name} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 md:mt-28 pt-10 border-t border-rule">
            <h2 className="display text-2xl md:text-3xl text-ink mb-8">
              Related qualities
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} photo={heroImage(p)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
