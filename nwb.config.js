module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactCharts',
      externals: {
        react: 'React',
      },
    },
  },
}
