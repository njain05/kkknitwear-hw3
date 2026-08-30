import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no optimisation server. Variants are generated at
    // build time by scripts/optimise-images.mjs and resolved by this loader.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Kept in step with the generated widths so next/image never builds a
    // srcset entry that has no file behind it.
    imageSizes: [160, 320, 480],
    deviceSizes: [640, 1000],
  },
  trailingSlash: true,
};

export default nextConfig;
