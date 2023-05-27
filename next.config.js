/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")

const nextConfig = {
  reactStrictMode: true,
  // needs to get removed once the db/image link handler is set up
  images: {
    domains: [
      "images.unsplash.com",
      "placeimg.com",
      "airnes.blob.core.windows.net",
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  i18n,
  async headers() {
    return [
      {
        source: "/locales/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
