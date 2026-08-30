import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/fabrics/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/gallery/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/about/`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact/`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];

  const products: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${site.url}/fabrics/${p.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...products];
}
