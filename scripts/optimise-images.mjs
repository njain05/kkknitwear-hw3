/**
 * Generates responsive WebP variants of every recovered photograph.
 *
 * A static export cannot use Next's image optimiser, so the work is done at
 * build time instead: each source photo becomes a set of WebP files at the
 * widths the layout actually asks for. lib/image-loader.ts maps a request
 * for a given width onto the nearest variant.
 *
 * Without this a 137px-wide swatch leaf downloads a 1000px JPEG.
 *
 *   node scripts/optimise-images.mjs
 */
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC_DIR = "public/products";
const OUT_DIR = "public/products/opt";
export const WIDTHS = [160, 320, 480, 640, 1000];
const QUALITY = 70;

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter((f) =>
  /\.(jpe?g|png|webp)$/i.test(f),
);

let written = 0;
let skipped = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const file of files) {
  const src = join(SRC_DIR, file);
  const { name } = parse(file);
  bytesIn += (await stat(src)).size;

  // Every width is always written, even when the source is smaller than the
  // target — withoutEnlargement caps the real pixels, and a missing variant
  // would 404 for whichever layout asked for it.
  for (const w of WIDTHS) {
    const dest = join(OUT_DIR, `${name}-${w}.webp`);
    try {
      await stat(dest);
      skipped++;
      bytesOut += (await stat(dest)).size;
      continue;
    } catch {
      // not generated yet
    }

    const buf = await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();

    await writeFile(dest, buf);
    bytesOut += buf.byteLength;
    written++;
  }
}

console.log(`sources      ${files.length}`);
console.log(`variants     ${written} written, ${skipped} already present`);
console.log(`originals    ${(bytesIn / 1024 / 1024).toFixed(1)} MB`);
console.log(`variants     ${(bytesOut / 1024 / 1024).toFixed(1)} MB`);
