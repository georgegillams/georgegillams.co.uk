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
  compiler: {
    styledComponents: true,
  },
};

const withTM = nextTranspileModules(['@george-gillams/components']);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});

module.exports = withBundleAnalyzer(
  withImages(
    withTM({
      ...nextConfig,
    })
  )
);
