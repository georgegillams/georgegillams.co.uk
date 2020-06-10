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

import seo from './seo';
import api from './api/api';
import greasemonkey from './greasemonkey';
import redirectNonWWW from './redirectNonWWW';
import setup from './middlewares/frontendMiddleware';

import { NODE_ENV, SESSION_SECRET } from 'helpers/constants';
import logger from 'utils/logger';
import appConfig from 'helpers/appConfig';

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
    origin: appConfig.siteUrl,
  }),
);

// Production security - rate limiting
app.use(
  slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: NODE_ENV === 'production' ? 50 : 10000, // allow 50 requests per window without limiting...
    delayMs: 1000, // add 1s delay per request above 50...
    maxDelayMs: 20000, // with a maximum delay of 20 seconds
    // request # 1 no delay
    // ...
    // request # 50 no delay
    // request # 51 is delayed by 1000ms
    // request # 52 is delayed by 2000ms
    // request # 53 is delayed by 3000ms
    // ...
    // request # 70 is delayed by 20s
    // request # 71 is delayed by 20s <-- won't exceed 20s delay
    //
    // The max request rate is 50 in 0s + 20 in 210s + 34 in 680s = 104 in 15 minutes = 416 in 1 hour
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
    cookie: {
      secure: true,
      httpOnly: true,
      domain: appConfig.domain,
      maxAge: 60000,
    },
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
const customHost = process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(appConfig.port, host, err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(appConfig.port, prettyHost);
});
