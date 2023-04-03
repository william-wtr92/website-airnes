/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // needs to get removed once the db/image link handler is set up
  images: {
    domains: ["images.unsplash.com"],
  },
}

module.exports = nextConfig
