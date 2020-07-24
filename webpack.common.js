const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['./src/index.js', './src/styles/main.scss'],
  output: {
    filename: 'scripts/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|woff|woff2|eot|ttf|otf|gif|pdf|ico)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyPlugin([
      { from: 'public', to: '', toType: 'dir', ignore: ['*.html'] },
    ]),
  ],
};
