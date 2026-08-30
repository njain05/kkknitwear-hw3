import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export cannot use the Next image optimiser.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
