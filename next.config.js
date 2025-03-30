/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add any external image domains if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Example for using Unsplash images
      },
      {
        protocol: "https",
        hostname: "cdn.example.com", // Example for your production CDN
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
