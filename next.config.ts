import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a parent-level package-lock.json otherwise makes
  // Next infer the wrong root and mis-trace files.
  turbopack: {
    root: __dirname,
  },
  // Allow Sanity's image CDN (future-proofs any next/image usage; the current
  // components render Sanity URLs via native <img>).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
};

export default nextConfig;
