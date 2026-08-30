/**
 * Custom image loader for the static export.
 *
 * A static site has no image optimisation server, so the variants are built
 * ahead of time by scripts/optimise-images.mjs. This maps next/image's
 * request for a given width onto the nearest pre-generated WebP.
 *
 * Widths here must stay in step with WIDTHS in that script.
 */
const WIDTHS = [160, 320, 480, 640, 1000];

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Anything outside the recovered photo library is served as-is.
  if (!src.startsWith("/products/") || src.startsWith("/products/opt/")) {
    return src;
  }

  const file = src.slice("/products/".length);
  const base = file.replace(/\.[^.]+$/, "");
  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];

  return `/products/opt/${base}-${target}.webp`;
}
