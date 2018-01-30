const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

let client = null;
if (process.env.REDIS_URL) {
  // Heroku redistogo connection
  client = require("redis").createClient(process.env.REDIS_URL);
} else {
  // Localhost
  client = require("redis").createClient();
}

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
  const pageId = req.headers.blog_id;
  client.lrange(`${pageId}_comments`, 0, -1, function(err, reply) {
    res.send(reply);
  });
});

router.post("/api/comments", (req, res) => {
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
