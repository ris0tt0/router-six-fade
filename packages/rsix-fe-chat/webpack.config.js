const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: { main: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chat-[name].js',
    library: {
      name: 'rsix-chat',
      type: 'umd',
    },
  },
  devServer: {
    static: false,
    historyApiFallback: {
      index: '/index.html',
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5004',
      },
    ],
    port: 5006,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'r6 client chat',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new Dotenv({
      defaults: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
