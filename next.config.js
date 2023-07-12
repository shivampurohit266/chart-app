/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASEURL: "http://localhost:5000",
    PORT: 3000,
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
