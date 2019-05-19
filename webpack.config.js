const path = require('path')

module.exports = {
  entry: './src/js/accords/index.js',
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: 'accords.js'
  },
  mode: 'production'
}
