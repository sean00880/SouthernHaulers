let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config.js')
} catch (e) {
  // ignore error
}

function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) {
    return baseConfig
  }

  const mergedConfig = { ...baseConfig }

  for (const key in userConfig) {
    if (
      typeof mergedConfig[key] === 'object' &&
      !Array.isArray(mergedConfig[key])
    ) {
      mergedConfig[key] = {
        ...mergedConfig[key],
        ...userConfig[key],
      }
    } else {
      mergedConfig[key] = userConfig[key]
    }
  }

  return mergedConfig
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async redirects() {
    return [
      {
        source: '/services/containers/page',
        destination: '/services/containers',
        permanent: true,
      },
      {
        source: '/services/page',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/refrigerated/page',
        destination: '/services/refrigerated',
        permanent: true,
      },
      {
        source: '/services/warehouse/page',
        destination: '/services/warehouse',
        permanent: true,
      },
    ]
  },
}

export default mergeConfig(nextConfig, userConfig?.default)
