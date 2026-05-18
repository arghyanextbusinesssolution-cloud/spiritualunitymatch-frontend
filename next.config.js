/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["localhost", "res.cloudinary.com"],
    unoptimized: true,
  },

  // Maintain the user's original export configuration for production
  ...(process.env.NODE_ENV === 'production' && {
    output: "export",
    trailingSlash: true,
  }),

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;