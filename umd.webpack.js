const webpack = require('webpack')

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: './react-charts.js',
    libraryTarget: 'umd',
    library: 'ReactCharts'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
