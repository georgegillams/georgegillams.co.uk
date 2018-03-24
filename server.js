const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

const xApiKeyPub = process.env.REST_PUBLIC_ACCESS_KEY;
const xApiKeyPrivate = process.env.REST_PRIVATE_ACCESS_KEY;

let client = null;
if (process.env.REDIS_URL) {
  // Heroku redis connection
  // eslint-disable-next-line global-require
  client = require('redis').createClient(process.env.REDIS_URL);
} else {
  // running locally
  // eslint-disable-next-line global-require
  client = require('redis').createClient();
}

let buildDirectory = null;
if (process.env.ON_HEROKU) {
  buildDirectory = '../build';
} else {
  buildDirectory = '../build';
  // in our codebase, client and server code is structured differently to when deployed on heroku
}
const staticFiles = express.static(path.join(__dirname, buildDirectory));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, page_id, Api-Key',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

client.on('connect', () => {
  client.set('framework', 'AngularJS');
});

// API Routing:

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

app.use(staticFiles);

router.get('/ontologies/2018/tv-listing-ontology', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      './server_content/ontologies',
      'tv-listing-ontology.owl',
    ),
    { headers: { 'Content-Type': 'text/xml' } },
  );
});

router.get('/api/greasemonkey/secureEcs_download', (req, res) => {
  res.sendFile(
    path.join(__dirname, './server_content/greasemonkey', 'secure ecs.js'),
  );
});

router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

router.get('/api/comments', (req, res) => {
  const pageId = req.headers.page_id;
  client.lrange(`${pageId}_comments`, 0, -1, (err, reply) => {
    const result = [];
    for (let i = 0; i < reply.length; i += 1) {
      result.push(JSON.parse(reply[i]));
    }
    res.send(result);
  });
});

router.get('/api/comments/page_ids', (req, res) => {
  client.lrange('pageIds', 0, -1, (err, reply) => {
    res.send(reply);
  });
});

router.post('/api/comments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPub) {
    res.end();
    return;
  }
  const pageId = req.body.page_id;
  const commentId = Math.random()
    .toString(36)
    .substring(7);
  const commenterName = req.body.commenter_name;
  const { comment } = req.body;
  client.lrem('pageIds', 0, pageId);
  client.rpush(['pageIds', pageId]);
  client.rpush([
    `${pageId}_comments`,
    JSON.stringify({
      commentId,
      commenterName,
      comment,
      timestamp: Date.now(),
    }),
  ]);
  res.end();
});

router.delete('/api/comments', (req, res) => {
  const apiKey = req.headers['api-key'];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    res.end();
    return;
  }
  const pageId = req.body.page_id;
  const { pattern } = req.body;
  const commentId = req.body.comment_id;
  if (pattern === '*') {
    client.del(`${pageId}_comments`);
  } else if (pattern !== undefined) {
    client.lrange(`${pageId}_comments`, 0, -1, (err, reply) => {
      for (let i = reply.length - 1; i > 0; i -= 1) {
        const comment = JSON.parse(reply[i]);
        if (`${comment.commenterName}${comment.comment}`.includes(pattern)) {
          client.lrem(`${pageId}_comments`, 1, reply[i]);
        }
      }
    });
  }
  if (commentId !== undefined) {
    client.lrange(`${pageId}_comments`, 0, -1, (err, reply) => {
      for (let i = 0; i < reply.length; i += 1) {
        const comment = JSON.parse(reply[i]);
        if (comment.commentId === commentId) {
          client.lrem(`${pageId}_comments`, 1, reply[i]);
          res.end();
          return;
        }
      }
    });
  }
  res.end();
});

router.get('/418', (req, res) => {
  res.status(418);
  res.sendFile(path.resolve(__dirname, buildDirectory, 'index.html'));
});

router.get('/teapot', (req, res) => {
  res.status(418);
  res.sendFile(path.resolve(__dirname, buildDirectory, 'index.html'));
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {});
