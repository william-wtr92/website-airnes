/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "images.unsplash.com", "unsplash.com"],
  },
}

module.exports = nextConfig
