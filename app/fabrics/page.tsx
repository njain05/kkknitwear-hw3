import { Suspense } from "react";
import type { Metadata } from "next";
import {
  getAllProducts,
  getCategories,
  heroImage,
  gsmValue,
} from "@/lib/products";
import { Catalogue, type CatalogueItem } from "@/components/Catalogue";

export const metadata: Metadata = {
  title: "Fabrics",
  description:
    "Browse our knitted fabric range — sportswear, dot knit, matty, mesh, " +
    "terry and home furnishing. Filter by structure, weight and category.",
};

export default function FabricsPage() {
  const categories = getCategories();
  const items: CatalogueItem[] = getAllProducts().map((product) => ({
    product,
    photo: heroImage(product),
    gsmValue: gsmValue(product),
  }));

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-10 md:py-16">
      <header className="mb-10 md:mb-14 max-w-2xl">
        <p className="label-caps text-indigo">The range</p>
        <h1 className="display mt-3 text-4xl md:text-6xl text-ink">
          Fabrics we knit
        </h1>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">
          Filter by structure, weight or end use. Every quality is quoted per
          lot — tell us the quantity and shade and we&rsquo;ll come back with a
          rate and a lead time.
        </p>
      </header>

      <Suspense fallback={<div className="py-20 text-ink-3">Loading fabrics…</div>}>
        <Catalogue items={items} categories={categories} />
      </Suspense>
    </div>
  );
}
