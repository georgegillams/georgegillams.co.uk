const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
// const {
//   DECIMAL_REGEX,
//   INT_REGEX,
//   SORT_CODE_REGEX,
//   STRING_REGEX,
//   MONZOME_LINK_REGEX,
// } = require('./src/shared/constants');
const wget = require('wget-improved');
const crypto = require('crypto');
const compare = require('secure-compare');
const bcrypt = require('bcrypt');

const portNumber = process.env.DEV ? 3001 : 3000;

const app = express();

const adminUserName = process.env.ADMIN_USERNAME;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

let client = null;
if (process.env.DEV) {
  // Heroku redis connection
  // eslint-disable-next-line global-require
  client = require('redis').createClient(process.env.REDIS_URL);
} else {
  // running locally
  // eslint-disable-next-line global-require
  client = require('redis').createClient();
}

const buildDirectory = './dist';
const staticFiles = express.static(path.join(__dirname, buildDirectory));

client.on('connect', () => {
  client.set('framework', 'React');
});

// API Routing:

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

app.use(staticFiles);

if (!process.env.DEV) {
  router.get('/teapot', (req, res) => {
    res.status(418);
    res.sendFile(path.resolve(__dirname, buildDirectory, 'index.html'));
  });

  // any routes not picked up by the server api will be handled by the react router
  router.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, buildDirectory, 'index.html'));
  });
}

app.use(router);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${buildDirectory}/`);
});
