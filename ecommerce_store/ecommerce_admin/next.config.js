/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: [`lh3.googleusercontent.com`, `picsum.photos`]
  },
  // Workaround for experiments.topLevelAwait
  // Issue link: https://github.com/vercel/next.js/issues/43382
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

module.exports = nextConfig
