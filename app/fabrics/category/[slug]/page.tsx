import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategories,
  getCategory,
  getProductsInCategory,
  heroImage,
} from "@/lib/products";
import { site } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { FabricTexture } from "@/components/textures/FabricTexture";

/**
 * A landing page per category.
 *
 * The catalogue filter covers this for someone already on the site, but a
 * filter lives behind a query string and gives search engines nothing to
 * index. These pages are what a buyer searching "sportswear fabric
 * manufacturer Ludhiana" can actually land on.
 */

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fabrics/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const count = getProductsInCategory(slug).length;
  const title = `${category.name} manufacturer in ${site.address.city}`;

  return {
    title,
    description: `${category.blurb} ${
      count > 0
        ? `${count} ${count === 1 ? "quality" : "qualities"} in stock or knitted to order.`
        : "Knitted to order."
    } Mill-direct from ${site.address.city} since ${site.established}.`,
    alternates: { canonical: `${site.url}/fabrics/category/${slug}/` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/fabrics/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsInCategory(slug);
  const others = getCategories().filter((c) => c.slug !== slug);

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-6 md:py-10">
      <nav aria-label="Breadcrumb" className="mb-6 md:mb-10">
        <ol className="flex flex-wrap items-center gap-2 text-2xs text-ink-3">
          <li><Link href="/" className="hover:text-indigo">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/fabrics" className="hover:text-indigo">Fabrics</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink-2">{category.name}</li>
        </ol>
      </nav>

      <header className="max-w-2xl mb-10 md:mb-14">
        <p className="label-caps text-indigo">Category</p>
        <h1 className="display mt-3 text-4xl md:text-6xl text-ink">
          {category.name}
        </h1>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">
          {category.blurb}
        </p>
        <p className="mt-3 text-ink-2 leading-relaxed">
          Knitted at our own works in {site.address.city} since{" "}
          {site.established}. Small lots accepted, and every quality is quoted
          per lot against your quantity and shade.
        </p>
      </header>

      {products.length > 0 ? (
        <>
          <p className="text-sm text-ink-2 mb-6 pb-3 border-b border-rule">
            <span className="figure-mono text-ink">{products.length}</span>{" "}
            {products.length === 1 ? "quality" : "qualities"} in this category
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
            {products.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                photo={heroImage(p)}
                priority={i < 4}
              />
            ))}
          </div>
        </>
      ) : (
        /* Listed on the previous site but with no photographs or specifications
           behind it. We say so rather than inventing a range. */
        <div className="relative border border-rule overflow-hidden">
          <div className="absolute inset-0 opacity-[0.09]" aria-hidden="true">
            <FabricTexture structure="terry" ground="paper2" scale={2} />
          </div>
          <div className="relative py-16 px-6 text-center">
            <h2 className="text-xl text-ink">Available on request</h2>
            <p className="mt-3 text-ink-2 max-w-md mx-auto leading-relaxed">
              We don&rsquo;t have photographs of this range online yet. Tell us
              the quality, weight and quantity you need and we&rsquo;ll confirm
              what we can run.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link href="/quote" className="bg-indigo text-paper px-6 py-3.5">
                Ask about {category.name.toLowerCase()}
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink px-6 py-3.5 text-ink"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <section className="mt-20 pt-10 border-t border-rule">
        <h2 className="label-caps text-ink-3 mb-5">Other categories</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/fabrics/category/${c.slug}`}
                className="inline-block border border-rule px-3.5 py-2 text-sm text-ink-2 hover:border-indigo hover:text-indigo transition-colors"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
