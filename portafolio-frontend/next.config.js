const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const legacyWorkRedirects = [
  {
    source: '/trabajos/1',
    destination: '/trabajos/paginas-web-chavez',
    statusCode: 301,
  },
  {
    source: '/trabajos/2',
    destination: '/trabajos/plomada',
    statusCode: 301,
  },
  {
    source: '/trabajos/3',
    destination: '/trabajos/jardineria-montanez',
    statusCode: 301,
  },
  {
    source: '/trabajos/4',
    destination: '/trabajos/elu',
    statusCode: 301,
  },
  {
    source: '/trabajos/5',
    destination: '/trabajos/esperanza-de-vida',
    statusCode: 301,
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify ya viene activado por defecto en versiones recientes
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  redirects: async () => legacyWorkRedirects,
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
