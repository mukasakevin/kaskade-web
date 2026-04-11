import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  output: 'standalone',
  experimental: {
    // @ts-ignore
    outputFileTracingRoot: __dirname,
  },
};

export default nextConfig;                         