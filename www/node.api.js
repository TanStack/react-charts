export default () => ({
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'reach-charts': '../src/',
    }
    return config
  },
})
