const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

const xApiKeyPub = process.env.REST_PUBLIC_ACCESS_KEY;
const xApiKeyPrivate = process.env.REST_PRIVATE_ACCESS_KEY;

let client = null;
if (process.env.REDIS_URL) {
  // Heroku redistogo connection
  client = require("redis").createClient(process.env.REDIS_URL);
} else {
  // Localhost
  client = require("redis").createClient();
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, page_id, Api-Key"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

client.on("connect", function() {
  console.log("connected");
  client.set("framework", "AngularJS");
});

// API Routing:

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

router.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

router.get("/api/my-first-list", (req, res) => {
  client.get("framework", function(err, reply) {
    res.send({ express: reply });
  });
});

router.get("/api/comments", (req, res) => {
  const pageId = req.headers.page_id;
  client.lrange(`${pageId}_comments`, 0, -1, function(err, reply) {
    const result = [];
    for (let i = 0; i < reply.length; i += 1) {
      result.push(JSON.parse(reply[i]));
    }
    res.send(result);
  });
});

router.post("/api/comments", (req, res) => {
  console.log(req.headers);
  console.log(req.headers["api-key"]);
  console.log(xApiKeyPub);
  const apiKey = req.headers["api-key"];
  if (apiKey === undefined || apiKey !== xApiKeyPub) {
    console.log("unauthenticated");
    res.end();
    return;
  }
  const pageId = req.body.page_id;
  const commenterName = req.body.commenter_name;
  const comment = req.body.comment;
  console.log(pageId);
  console.log(commenterName);
  console.log(comment);
  client.rpush([
    `${pageId}_comments`,
    JSON.stringify({ commenterName: commenterName, comment: comment, timestamp: Date.now() })
  ]);
  res.end();
});

router.delete("/api/comments", (req, res) => {
  console.log(req.headers);
  console.log(req.headers["api-key"]);
  console.log(xApiKeyPrivate);
  const apiKey = req.headers["api-key"];
  if (apiKey === undefined || apiKey !== xApiKeyPrivate) {
    console.log("unauthenticated");
    res.end();
    return;
  }
  const pageId = req.body.page_id;
  const pattern = req.body.pattern;
  console.log(pageId);
  if (pattern === "*") {
    client.del(`${pageId}_comments`);
  } else {
    //TODO CODE
  }
  res.end();
});

router.get("/cities", (req, res) => {
  const cities = [
    { name: "New York City", population: 8175133 },
    { name: "Los Angeles", population: 3792621 },
    { name: "Chicago", population: 2695598 }
  ];
  res.json(cities);
});

app.use(router);

// any routes not picked up by the server api will be handled by the react router
app.use("/*", staticFiles);

app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
