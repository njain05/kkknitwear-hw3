import manifest from "@/content/image-manifest.json";
import { products } from "@/content/products";
import { categories, categoryBySlug } from "@/content/categories";
import type { Product, Category } from "@/lib/types";

type Manifest = Record<string, { name: string; files: string[] }>;
const images = manifest as Manifest;

/** Every photo for a product, in declared group order. */
export function imagesFor(product: Product): string[] {
  return product.imageGroups.flatMap((g) => images[g]?.files ?? []);
}

/** Lead image, or null when a product has no photo and needs a texture. */
export function heroImage(product: Product): string | null {
  return imagesFor(product)[0] ?? null;
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsInCategory(slug: string): Product[] {
  return products.filter((p) => p.categories.includes(slug));
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

/** Categories that actually have products, with their counts. */
export function getCategoriesWithCounts(): (Category & { count: number })[] {
  return categories
    .map((c) => ({ ...c, count: getProductsInCategory(c.slug).length }))
    .filter((c) => c.count > 0);
}

/** Products with the most photos read best on the homepage. */
export function getFeaturedProducts(limit = 6): Product[] {
  return [...products]
    .sort((a, b) => imagesFor(b).length - imagesFor(a).length)
    .slice(0, limit);
}

/** Distinct filter values, derived from the catalogue rather than hardcoded. */
export function getFilterFacets() {
  const structures = new Set<string>();
  const materials = new Set<string>();
  const applications = new Set<string>();

  for (const p of products) {
    structures.add(p.structure);
    if (p.specs.material) materials.add(p.specs.material);
    p.applications.forEach((a) => applications.add(a));
  }

  return {
    structures: [...structures].sort(),
    materials: [...materials].sort(),
    applications: [...applications].sort(),
  };
}

/**
 * Lowest GSM mentioned in a spec, used for range filtering.
 * Handles "150", "150-200" and "150–200 gsm".
 */
export function gsmValue(product: Product): number | null {
  const raw = product.specs.gsm;
  if (!raw) return null;
  const match = raw.match(/\d+/);
  return match ? Number(match[0]) : null;
}

export const totalPhotoCount = Object.values(images).reduce(
  (n, g) => n + g.files.length,
  0,
);
