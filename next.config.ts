import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bawdarrxifetqaeyasiw.supabase.co",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
