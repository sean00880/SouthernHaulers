/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@southernhaulers/domain',
    '@southernhaulers/agents',
    '@southernhaulers/db',
    '@southernhaulers/auth',
    '@southernhaulers/ui',
  ],
};

module.exports = nextConfig;
