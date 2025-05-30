const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rsixclient-chess-[name].js',
    clean: true,
    library: {
      // note there's no `name` here
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
    port: 5008,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'r6 client chess',
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
