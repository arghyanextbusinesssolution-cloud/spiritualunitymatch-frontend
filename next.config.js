/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["localhost", "res.cloudinary.com"],
    unoptimized: true,
  },

  // Only use export mode for production builds on Hostinger
  // Remove this for local development to enable dynamic features
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