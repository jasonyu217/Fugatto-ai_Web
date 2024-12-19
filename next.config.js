/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://api.openai.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src 'self' blob: data:; img-src 'self' data: blob:; connect-src 'self' https://api.openai.com"
          }
        ],
      },
    ];
  },
}

export default nextConfig; 