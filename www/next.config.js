// const Module = require('module')
const path = require('path')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const resolveFrom = require('resolve-from')

const node_modules = path.resolve(__dirname, 'node_modules')

// const originalRequire = Module.prototype.require

// // The following ensures that there is always only a single (and same)
// // copy of React in an app at any given moment.
// Module.prototype.require = function(modulePath) {
//   // Only redirect resolutions to non-relative and non-absolute modules
//   if (['/react/', '/react-dom/'].some(d => {
//     try {
//       return require.resolve(modulePath).includes(d)
//     } catch (err) {
//       return false
//     }
//   })) {
//     console.log(modulePath)
//     try {
//       modulePath = resolveFrom(
//         node_modules,
//         modulePath
//       )
//       console.log('New: ', modulePath)
//     } catch (err) {
//       //
//     }
//   }

//   return originalRequire.call(this, modulePath)
// }

const baseConfig = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx'],
  webpack(config) {
    config.resolve.modules = [...config.resolve.modules, path.resolve('./src')]
    config.resolve.alias = {
      ...config.resolve.alias,
      react$: path.resolve(resolveFrom(node_modules, 'react'), '..'),
      'react-dom$': path.resolve(resolveFrom(node_modules, 'react-dom'), '..')
    }
    return config
  }
}

module.exports = [
  withCSS, 
  withImages
].reduce(
  (a, b) => b(a),
  baseConfig
)
