const deps = require('./package.json').dependencies;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { FederatedTypesPlugin } = require('@module-federation/typescript');

const federationConfig = {
  name: 'rsixclient',
  filename: 'remoteEntry.js',
  shared: {
    'js-logger': {
      singleton: true,
      eager: true,
      version: deps['js-logger'],
    },
    react: {
      singleton: true,
      eager: true,
      version: deps.react,
    },
    'react-dom': {
      singleton: true,
      eager: true,
      version: deps['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      eager: true,
      version: deps['react-router-dom'],
    },
    zustand: {
      singleton: true,
      version: deps.zustand,
    },
  },
  // exposes: {
  //   './DateUtils': path.resolve(__dirname, '../', 'src/pages/utils.ts'),
  //   './Apod': path.resolve(__dirname, '../', 'src/components/apod/index.tsx'),
  //   './CommandsProvider': path.resolve(
  //     __dirname,
  //     '../',
  //     'src/providers/commands.tsx',
  //   ),
  // },
};

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'rsixclient-[name].js',
    clean: true,
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
    port: 9002,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'r6 client',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new Dotenv({
      defaults: true,
    }),
    new ModuleFederationPlugin({
      ...federationConfig,
    }),
    new FederatedTypesPlugin({
      federationConfig,
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
