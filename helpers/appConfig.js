require('babel-polyfill');

const { NODE_ENV, PROJECT_UNDER_TEST, PORT } = process.env;

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[NODE_ENV || 'development'];

const projectName = 'GEORGEGILLAMS';
const domain = 'georgegillams.co.uk';
const port = PORT || 3000;
const siteUrl =
  NODE_ENV === 'development' || PROJECT_UNDER_TEST
    ? `http://localhost:${port}`
    : `https://www.${domain}`;
const apiEndpoint = `${siteUrl}/api`;

module.exports = {
  host: process.env.HOST || 'localhost',
  port,
  projectName,
  domain,
  siteUrl,
  apiEndpoint,
  app: {
    title: 'George Gillams - open source software engineer',
    head: {
      titleTemplate: 'George Gillams: %s',
      meta: [
        { property: 'theme-color', content: '#025ca2' },
        {
          property: 'description',
          content:
            "I'm an open-source software engineer at Skyscanner, passionate about design, travel and photography. I mainly work on web (React) and iOS products.",
        },
        { property: 'og:site_name', content: 'George Gillams' },
        {
          property: 'og:image',
          content: 'https://i.imgur.com/FLA0jkg.jpg',
        },
        {
          property: 'og:url',
          content: 'https://georgegillams.co.uk/',
        },
        {
          property: 'og:logo',
          content: 'https://georgegillams.co.uk/favicon.ico',
        },
        { property: 'og:locale', content: 'en_GB' },
        {
          property: 'og:title',
          content: 'George Gillams - open source software engineer',
        },
        {
          property: 'og:description',
          content:
            'Open source software engineer, passionate about design, travel and photography.',
        },
        { property: 'og:card', content: 'summary' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:site', content: '@georgegillams' },
        { property: 'og:creator', content: '@georgegillams' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
  ...environment,
};
