const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  output: 'export',
  // Tipamos config como 'any' y especificamos que isServer es un boolean
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.alias['react-dom$'] = 'next/dist/compiled/react-dom';
      config.resolve.alias['react-dom/client$'] = 'next/dist/compiled/react-dom/client';
    }
    return config;
  },
};

export default nextConfig;