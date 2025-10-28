/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@southernhaulers/domain',
    '@southernhaulers/db',
    '@southernhaulers/agents',
  ],
};

module.exports = nextConfig;
