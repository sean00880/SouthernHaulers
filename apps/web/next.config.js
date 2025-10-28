/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@southernhaulers/domain',
    '@southernhaulers/db',
    '@southernhaulers/auth',
    '@southernhaulers/ui',
  ],
};

module.exports = nextConfig;