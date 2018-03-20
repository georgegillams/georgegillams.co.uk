/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WrapperPlugin from 'wrapper-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import postCssPlugins from './scripts/webpack/postCssPlugins';
// import * as ROUTES from './src/Routes/index';
const ROUTES = [];

const { NODE_ENV, BPK_TOKENS, BPK_NEO, BPK_BUILT_AT } = process.env;
const useCssModules = true;
const isProduction = NODE_ENV === 'production';

const staticSiteGeneratorConfig = {
  paths: [...Object.keys(ROUTES).map(key => ROUTES[key])],
};

const sassIncludePaths = [path.resolve(__dirname, 'node_modules/bpk-mixins')];

// These files will be imported in every sass file
const sassResourcesPaths = [
  path.resolve(__dirname, 'node_modules/bpk-mixins/_index.sass'),
];

const sassOptions = {
  data: BPK_TOKENS
    ? fs.readFileSync(`packages/bpk-tokens/tokens/${BPK_TOKENS}.scss`)
    : '',
};

const config = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // include: path.resolve(__dirname, 'src'),
        // exclude: /node_modules\/(?!bpk-).*/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!bpk-).*/,
        // exclude: /node_modules\/(?!bpk-).*/,
        options: {
          // This is a feature of `babel-loader` for Webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules\/(?!bpk-).*/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules\/(?!bpk-).*/,
        // exclude: /node_modules\/(?!bpk-).*/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              camelCase: 'dashes',
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              data: fs.readFileSync(`node_modules/bpk-tokens/tokens/base.scss`),
              sourceMap: true,
              outputStyle: 'expanded',
              indentedSyntax: 'sass',
              includePaths: sassIncludePaths,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: sassResourcesPaths,
            },
          },
        ],
      },

      {
        test: /\.gif/,
        exclude: /node_modules\/(?!bpk-).*/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/gif',
            },
          },
        ],
      },
      {
        test: /\.jpg/,
        exclude: /node_modules\/(?!bpk-).*/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/jpg',
            },
          },
        ],
      },
      {
        test: /\.png/,
        exclude: /node_modules\/(?!bpk-).*/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/png',
              name: '[path][name].[ext]',
            },
          },
        ],
      },

      {
        test: /favicon\.ico$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /readme\.md$/,
        use: ['raw-loader'],
      },
    ],
  },

  plugins: [
    new WrapperPlugin({
      test: /\.css$/,
    }),
  ],

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
};

if (BPK_NEO) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BPK_NEO: true,
        BPK_BUILT_AT,
      },
    }),
  );
}

if (isProduction) {
  config.plugins.push(
    new StaticSiteGeneratorPlugin({
      entry: 'docs',
      paths: staticSiteGeneratorConfig.paths,
      locals: staticSiteGeneratorConfig,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    }),
    new CopyWebpackPlugin([
      { from: 'packages/bpk-docs/src/README.md', to: 'README.md' },
    ]),
  );
}

export default config;
