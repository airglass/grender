const path = require('path');

module.exports = {
  entry: {
    "grender": "./src/main.ts"
  },
  output: {
    library: 'grender',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  devtool: 'hidden-source-map',
  resolve: {
    symlinks: true,
    extensions: ['.ts']
  },
  target: 'web',
  module: {
    unknownContextCritical: false,
    rules: [{
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader'
        }
      ]
    }]
  }
}