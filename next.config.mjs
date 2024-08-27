/* eslint-disable no-undef */

import NextBundleAnalyzer from '@next/bundle-analyzer'
import nextra from 'nextra'

import remarkGfm from 'remark-gfm'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * CSP headers
 * img-src https to allow loading images from SSO providers
 */
const cspHeader = `
  default-src 'self' https: wss:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
  style-src 'self' 'unsafe-inline' https:;
  img-src 'self' https: blob: data:;
  media-src 'self' https: blob: data:;
  font-src 'self' https:;
  frame-src 'self' https:;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  block-all-mixed-content;
`

const nonPermanentRedirects = [
  // Up to date Redirects:
  ['/discord', 'https://discord.librechat.ai'],
  ['/demo', 'https://demo.librechat.cfd'],
  ['/issue', 'https://github.com/danny-avila/LibreChat/issues/new/choose'],
  ['/new-issue', 'https://github.com/danny-avila/LibreChat/issues/new/choose'],
  ['/issues', 'https://github.com/danny-avila/LibreChat/issues'],
  ['/gh-support', 'https://github.com/danny-avila/LibreChat/discussions/categories/support'],
  ['/gh-discussions', 'https://github.com/danny-avila/LibreChat/discussions'],
  ['/roadmap', '/docs/roadmap'],
  /* Danny moved these :P */
  ['/docs/configuration/librechat_yaml/ai_endpoints/azure', '/docs/configuration/azure'],
  // Redirect to overview pages
  ...[].map((path) => [path, path + '/overview']),
]

const permanentRedirects = []

// nextra config
const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
  latex: {
    renderer: 'mathjax',
  },
  defaultShowCopyCode: true,
})

// next config
const nextraConfig = withNextra({
  experimental: {
    esmExternals: 'loose', // <-- add this
    serverComponentsExternalPackages: ['mongoose'],
    scrollRestoration: true,
  },
  transpilePackages: ['react-tweet', 'react-syntax-highlighter', 'geist'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.librechat.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // 启用文件系统缓存
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    }

    // 优化 splitChunks 设置以更好地进行代码拆分
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }

    return config
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-frame-options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'autoplay=*, fullscreen=*, microphone=*',
          },
        ],
      },
    ]
  },
  redirects: async () => [
    ...nonPermanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    })),
    ...permanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    })),
  ],
})

export default withBundleAnalyzer(nextraConfig)
