import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  }
};

export default nextConfig;