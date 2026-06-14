/* @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, 
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /**
   * @param {import('webpack').Configuration} config
   * @param {{ isServer: boolean }} options
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['react-dom$'] = 'next/dist/compiled/react-dom';
      config.resolve.alias['react-dom/client$'] = 'next/dist/compiled/react-dom/client';
    }
    return config;
  },
};