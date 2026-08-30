import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The quote basket is per-buyer and holds nothing worth indexing.
        disallow: ["/quote/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
