import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disables ESLint checks during the build process
    ignoreDuringBuilds: true,
  },
  typescript : {
    ignoreBuildErrors : true
  }
  /* Add other Next.js configuration options here */
};

export default nextConfig;