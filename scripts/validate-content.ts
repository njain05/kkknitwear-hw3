/**
 * Content integrity check. Run with: node scripts/validate-content.ts
 *
 * Catches the failure modes that are invisible at build time: an image group
 * that doesn't exist, a category with no products, an orphaned photo, or a
 * price that leaked into the catalogue.
 */
import { readFileSync } from "node:fs";
import { products } from "../content/products.ts";
import { categories } from "../content/categories.ts";

const manifest: Record<string, { name: string; files: string[] }> = JSON.parse(
  readFileSync("content/image-manifest.json", "utf8"),
);

const errors: string[] = [];
const warnings: string[] = [];

const categorySlugs = new Set(categories.map((c) => c.slug));
const usedGroups = new Set<string>();
const slugs = new Set<string>();

for (const p of products) {
  if (slugs.has(p.slug)) errors.push(`duplicate product slug: ${p.slug}`);
  slugs.add(p.slug);

  for (const g of p.imageGroups) {
    if (!manifest[g]) {
      errors.push(`${p.slug}: image group "${g}" is not in the manifest`);
      continue;
    }
    usedGroups.add(g);
  }

  const photos = p.imageGroups.flatMap((g) => manifest[g]?.files ?? []);
  if (photos.length === 0) errors.push(`${p.slug}: resolves to zero photos`);

  for (const c of p.categories) {
    if (!categorySlugs.has(c)) errors.push(`${p.slug}: unknown category "${c}"`);
  }

  for (const key of p.unconfirmed) {
    if (!(key in p.specs)) {
      warnings.push(`${p.slug}: marks "${key}" unconfirmed but has no such spec`);
    }
  }
}

for (const c of categories) {
  const n = products.filter((p) => p.categories.includes(c.slug)).length;
  if (n === 0) warnings.push(`category "${c.slug}" has no products`);
}

const orphans = Object.keys(manifest).filter((g) => !usedGroups.has(g));

// Rule 1: no prices anywhere in the catalogue.
const catalogueText = readFileSync("content/products.ts", "utf8");
const priceHits = catalogueText.match(/₹|\bRs\.?\s*\d|\/\s*kg\b/gi);
if (priceHits) errors.push(`price leaked into catalogue: ${priceHits.join(", ")}`);

const totalPhotos = Object.values(manifest).reduce((n, g) => n + g.files.length, 0);
const usedPhotos = [...usedGroups].reduce((n, g) => n + manifest[g].files.length, 0);

console.log(`products     ${products.length}`);
console.log(`categories   ${categories.length} (${categories.filter((c) => products.some((p) => p.categories.includes(c.slug))).length} populated)`);
console.log(`photos       ${usedPhotos}/${totalPhotos} mapped to a product`);
if (orphans.length) console.log(`orphan groups ${orphans.join(", ")}`);
console.log("");

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);

if (errors.length) {
  console.log(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log(warnings.length ? `\nOK with ${warnings.length} warning(s).` : "\nAll checks passed.");
