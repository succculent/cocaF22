const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
// var SRC = path.resolve(__dirname, 'src/index.js');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './docs',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'T.A.V.E.',
    }),
    new NodePolyfillPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.obj$/,
        loader: 'webpack-obj-loader'
      },
      {
        test: /\.mtl$/,
        loader: 'mtl-loader'
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.wav$/,
        loader: 'file-loader'
      },
    ],
  },
  resolve: {
    fallback: { // not present by default
    "fs": false,
    "tls": false,
    "net": false,
    "path": false,
    "zlib": false,
    "http": false,
    "https": false,
    "stream": false,
    "crypto": false,
    "os": false,
    "crypto-browserify": require.resolve('crypto-browserify')
    }
  }
};
