const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const nextTranspileModules = require('next-transpile-modules');
const withImages = require('next-images');
const bundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
  distDir: 'build',
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'all',
    STARTED_AT: process.env.STARTED_AT,
  },
  env: {
    // NODE_ENV is handled automatically
    BUILT_AT: process.env.BUILT_AT,
    PORT: process.env.PORT,
    PROJECT_UNDER_TEST: process.env.PROJECT_UNDER_TEST,
    HOST: process.env.HOST,
  },
};

const withTM = nextTranspileModules(['gg-components']);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});

module.exports = withBundleAnalyzer(
  withImages(
    withTM(
      withSass(
        withCSS({
          cssModules: true,
          cssLoaderOptions: {
            importLoaders: 1,
            url: false,
            localIdentName: '[local]___[hash:base64:5]',
          },
          ...nextConfig,
        })
      )
    )
  )
);
