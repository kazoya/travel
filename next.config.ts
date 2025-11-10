import type {NextConfig} from 'next';
const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // This is required to extend the default timeout of 60s for server actions.
    // Video generation can take longer than this.
    serverActions: {
      bodySizeLimit: '10mb', // Increase body size limit for potential video uploads
      serverActionsTimeout: 120, // Set timeout to 120 seconds (2 minutes)
    },
  },
  turbopack: {
    // Turbopack configuration
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
