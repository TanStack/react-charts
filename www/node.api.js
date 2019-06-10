export default () => ({
  webpack: config => {
    return {
      ...config,
      node: {
        ...(config.node || {}),
        __filename: true
      }
    }
  }
})
