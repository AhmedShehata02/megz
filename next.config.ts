import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
      remotePatterns: [
        { hostname: "firebasestorage.googleapis.com", protocol: "https" },
      ]
    },
};


export default nextConfig;
