// shared config (dev and prod)
const { resolve } = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty', // workaround for Module not found: Error: Can't resolve 'fs'
    net: 'empty', // workaround for Module not found: Error: Can't resolve 'net'
    tls: 'empty', // workaround for Module not found: Error: Can't resolve 'tls'
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules\/(?!bpk-).*/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html.ejs' }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
  output: {
    publicPath: '/', // if you don't put the "/" here, you get this error:
  }, // "bundle.js:1 Uncaught SyntaxError: Unexpected token <"
};
