const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify ya viene activado por defecto en versiones recientes
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    // Solo aplicamos alias si estamos en el cliente
    if (!isServer) {
      config.resolve.alias['react-dom$'] = 'next/dist/compiled/react-dom';
      config.resolve.alias['react-dom/client$'] = 'next/dist/compiled/react-dom/client';
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);