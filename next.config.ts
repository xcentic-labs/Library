import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disables ESLint checks during the build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // example value
      allowedOrigins: ["*"], // or your actual allowed origins
    },
  },
  
  webpack: (config, { isServer }) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve.alias || {}),
        'react-server-dom-turbopack/server.edge': 'react-server-dom-webpack/server.edge',
      },
    };
    return config;
  },
};

export default nextConfig;
