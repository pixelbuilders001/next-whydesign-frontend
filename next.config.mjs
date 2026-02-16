import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: [
      'images.pexels.com',
      'lh3.googleusercontent.com',
      'ui-avatars.com',
      'why-designers.s3.ap-south-1.amazonaws.com', // ✅ fixed
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },

  // Configure headers for better caching
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api-proxy/:path*',
  //       destination: 'https://api.whydesigners.com/api/:path*',
  //     },
  //   ];
  // },
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/images\.pexels\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'pexels-images',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|eot)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
  fallbacks: {
    image: '/logo.png',
    document: '/offline.html',
  },
  disable: false,
  compress: true,
  output: 'standalone',
});

export default pwaConfig(nextConfig);
