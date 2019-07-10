const path = require('path')
const withCSS = require('@zeit/next-css')
const withOptimizedImages = require('next-optimized-images')
const resolveFrom = require('resolve-from')
// const withMDX = require('@next/mdx')({
//   // parse mdx files
//   extension: /\.mdx?$/
// })

const node_modules = path.resolve(__dirname, 'node_modules')

const baseConfig = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack(config) {
    config.resolve.modules = [...config.resolve.modules, path.resolve('./src')]
    config.resolve.alias = {
      ...config.resolve.alias,
      react$: resolveFrom(node_modules, 'react'),
      'react-dom$': resolveFrom(node_modules, 'react-dom')
    }
    return config
  }
}

module.exports = [withCSS, withOptimizedImages].reduce(
  (a, b) => b(a),
  baseConfig
)
