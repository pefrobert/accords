const path = require('path')

module.exports = {
  entry: './src/js/accord/index.js',
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: 'accord.js'
  },
  mode: 'production'
}
