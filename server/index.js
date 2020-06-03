/* eslint consistent-return:0 */

import http from 'http';
import { resolve } from 'path';

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import SocketIo from 'socket.io';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import slowDown from 'express-slow-down';

import logger from './util/logger';
import seo from './seo';
import api from './api/api';
import greasemonkey from './greasemonkey';
import redirectNonWWW from './redirectNonWWW';
import argv from './util/argv';
import setup from './middlewares/frontendMiddleware';

import {
  PORT,
  DOMAIN,
  NODE_ENV,
  SESSION_SECRET,
  SITE_URL,
  PROJECT_UNDER_TEST,
} from 'helpers/constants';

const app = express();
const server = new http.Server(app);

// Enable web-socket use
const io = new SocketIo(server);
io.path('/ws');

// trust the first proxy, as this will be nginx forwarding requests to us.
app.set('trust proxy', 1);

// Production security - helmet
app.use(helmet());

// Production security - cors
app.use(
  cors({
    origin: SITE_URL,
  }),
);

// Production security - rate limiting
app.use(
  slowDown({
    windowMs: 60 * 60 * 1000, // 60 minutes
    delayAfter: NODE_ENV === 'production' ? 100 : 10000, // allow 100 requests per hour without limiting...
    delayMs: 500, // begin adding 500ms of delay per request above 100...
    maxDelayMs: 20000, // with a maximum delay of 20 seconds
    // request # 1 no delay
    // ...
    // request # 100 no delay
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // ...
    // request # 140 is delayed by 20s
    // request # 141 is delayed by 20s <-- won't exceed 20s delay
    //
    // The max request rate is 100 in 0s + 40 in 400s + 160 in 3200s = 300 in 1 hour
    skip: req => {
      if (req.originalUrl.includes('api')) {
        return false;
      }
      return true;
    },
  }),
);

// enable sending API requests with files in form-data
app.use(fileupload());

// Redirect naked domain to include `www`
app.use(redirectNonWWW);

app.use(greasemonkey);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true, domain: DOMAIN, maxAge: 60000 },
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

// Exposes robots.txt and sitemap.xml
app.use(seo);

// Hook up API
app.use('/api', api);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(PORT, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(PORT, prettyHost);
});
