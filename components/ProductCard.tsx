import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { FabricTexture, STRUCTURE_LABELS } from "@/components/textures/FabricTexture";

/**
 * Photos are close-up texture shots on inconsistent backgrounds, so they run
 * edge-to-edge rather than floating on a white tile. Where a product has no
 * photo, a generated texture stands in — labelled as a structure, never
 * captioned as a photograph of that fabric.
 *
 * The photo is passed in rather than resolved here so the card can be
 * rendered from both server and client components without pulling the image
 * manifest into the browser bundle.
 */
export function ProductCard({
  product,
  photo,
  priority = false,
}: {
  product: Product;
  photo: string | null;
  priority?: boolean;
}) {
  const { gsm, width } = product.specs;

  return (
    <Link href={`/fabrics/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        {photo ? (
          <Image
            src={photo}
            alt={`${product.name} — knitted fabric by K.K Knitwear Club`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <FabricTexture structure={product.structure} ground="paper2" scale={1.6} />
            <span className="absolute inset-x-0 bottom-0 p-3 text-2xs text-ink-3">
              {STRUCTURE_LABELS[product.structure]} structure — photograph on request
            </span>
          </>
        )}

        <span className="absolute left-0 top-0 bg-paper/92 px-2.5 py-1.5 label-caps text-ink-2">
          {STRUCTURE_LABELS[product.structure]}
        </span>
      </div>

      <div className="pt-3">
        <h3 className="text-sm md:text-base text-ink leading-snug group-hover:text-indigo transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-2xs text-ink-3">
          {gsm && <span className="figure-mono">{gsm} GSM</span>}
          {gsm && width && <span aria-hidden="true">·</span>}
          {width && <span className="figure-mono">{width}</span>}
        </p>
      </div>
    </Link>
  );
}
