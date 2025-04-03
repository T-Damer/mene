import type { NextConfig } from 'next'

const analyze = process.env.ANALYZE === 'true'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: analyze,
})

const nextConfig: NextConfig = {
  basePath: '/mene',
  assetPrefix: '/mene/',
  reactStrictMode: true,
}

export default analyze ? withBundleAnalyzer(nextConfig) : nextConfig
