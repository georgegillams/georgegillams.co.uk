const webpack = require('webpack');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/build`,
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // to support eg. background-image property
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          outputPath: 'images/',
          // the images will be emmited to public/assets/images/ folder
          // the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          name: '[name].[ext]',
          outputPath: 'fonts/',
          // the fonts will be emmited to public/assets/fonts/ folder
          // the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }
        },
      },
      {
        test: /\.scss$/,
        loaders: ['css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: process.argv.indexOf('-p') === -1 ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
  ],
};
