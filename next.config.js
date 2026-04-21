/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["localhost", "res.cloudinary.com"],
    unoptimized: true,
  },

  // IMPORTANT: Required for Hostinger Static Hosting
  output: "export",

  trailingSlash: true,

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;