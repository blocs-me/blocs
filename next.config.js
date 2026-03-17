const { withPlausibleProxy } = require('next-plausible')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlausibleProxy({
  customDomain: 'https://analytics.aryanbhasin.com'
})(withBundleAnalyzer({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}))
