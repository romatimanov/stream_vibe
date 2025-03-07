/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com data:;
              img-src 'self' https://image.tmdb.org data: https://i.ytimg.com;
              connect-src 'self' https://api.themoviedb.org https://www.youtube.com https://www.google.com https://www.youtube-nocookie.com;
              frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com;
              media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
            `.replace(/\s{2,}/g, " "),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
