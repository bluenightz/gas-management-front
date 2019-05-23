const merge = require('webpack-merge')
const common = require('./webpack.common')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano')
        })
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: [
    //   new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          title: 'BalloonArt Store',
          meta: {
            viewport: "width=device-width, initial-scale=1.0",
          }
      }),
      new MiniCssExtractPlugin({
          filename: "[name].css"
      })
    ],
    module: {
      rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: "css-loader"
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    }
                }
            ]
        }
      ]
    }
})
