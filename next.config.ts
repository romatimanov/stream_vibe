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
              img-src * data: blob:;
              connect-src 'self' https://api.themoviedb.org https://www.youtube.com
                          https://www.google.com https://www.youtube-nocookie.com
                          https://newsapi.org https://api.openweathermap.org
                          https://api.weatherapi.com https://eodhd.com wss://ws.eodhistoricaldata.com
                          https://openexchangerates.org;
              frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com;
              media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
