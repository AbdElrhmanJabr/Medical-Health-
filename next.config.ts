import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      fs: false, // Ignore fs module during the build process
    };
    return config;
  },
};

export default nextConfig;
