import path from 'path'

export default () => ({
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config
  },
})
