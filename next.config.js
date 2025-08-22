/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Explicitly allow camera usage in supported browsers
          { key: 'Permissions-Policy', value: 'camera=(self)' },
          // Legacy header for older browsers (some Android WebView variants)
          { key: 'Feature-Policy', value: "camera 'self'" },
        ],
      },
    ];
  },
};

module.exports = nextConfig
