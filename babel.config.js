const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    'babel-plugin-add-module-exports',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          helpers: './shared/helpers',
          'server-utils': './server/utils',
          'client-utils': './src/utils',
        },
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: !isProduction,
        fileName: !isProduction,
        preprocess: false,
      },
    ],
  ],
};
