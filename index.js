if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-charts.production.min.js')
} else {
  module.exports = require('./dist/react-charts.development.js')
}
