const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'BalloonArt Store',
        meta: {
          viewport: "width=device-width, initial-scale=1.0",
        }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        include: [path.resolve(__dirname, "src")],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
          test: /\.(css|scss)$/,
          // include: [path.resolve(__dirname, "assets/styles")],
          use: [
              'style-loader',
              'css-loader'
          ]
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
              'file-loader'
          ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
