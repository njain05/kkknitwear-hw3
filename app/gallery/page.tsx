import type { Metadata } from "next";
import { getAllProducts, imagesFor, totalPhotoCount } from "@/lib/products";
import { GalleryGrid, type GalleryPhoto } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Fabric gallery",
  description:
    "Photographs of knitted fabric from our works in Ludhiana — sportswear, " +
    "dot knit, matty, rice knit, bon patti and home furnishing cloth.",
};

export default function GalleryPage() {
  // Every recovered photograph, grouped under the product it belongs to.
  const photos: GalleryPhoto[] = getAllProducts().flatMap((product) =>
    imagesFor(product).map((src) => ({
      src,
      productName: product.name,
      productSlug: product.slug,
    })),
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-8 py-10 md:py-16">
      <header className="max-w-2xl mb-10 md:mb-14">
        <p className="label-caps text-indigo">Gallery</p>
        <h1 className="display mt-3 text-4xl md:text-6xl text-ink">
          The cloth itself
        </h1>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">
          <span className="figure-mono">{totalPhotoCount}</span> photographs
          from the works. These are close-ups of the actual knit — tap any one
          to see it larger.
        </p>
      </header>

      <GalleryGrid photos={photos} />
    </div>
  );
}
