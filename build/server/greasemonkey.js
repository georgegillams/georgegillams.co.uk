"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fs = require('fs');

var path = require('path');

var express = require('express');

var wget = require('wget-improved');

var router = express.Router();

function getMeta(cb) {
  var download = wget.download('https://raw.githubusercontent.com/georgegillams/browser-scripts/master/scripts.json', path.join(__dirname, './server_content/greasemonkey', 'scripts.json'), {});
  download.on('end', function () {
    var metaData = JSON.parse(fs.readFileSync(path.join(__dirname, './server_content/greasemonkey', 'scripts.json'), 'utf8'));
    cb(metaData);
  });
}

function createWorkingDirectories() {
  var serverContentDir = path.join(__dirname, './server_content');
  var greasemonkeyDir = path.join(__dirname, './server_content/greasemonkey');

  if (!fs.existsSync(serverContentDir)) {
    fs.mkdirSync(serverContentDir);
  }

  if (!fs.existsSync(greasemonkeyDir)) {
    fs.mkdirSync(greasemonkeyDir);
  }
}

function sendGreasemonkeyFile(scriptId, req, res) {
  try {
    createWorkingDirectories();
    getMeta(function (metaData) {
      var matchingScripts = metaData.filter(function (m) {
        return m.id === scriptId;
      });

      if (matchingScripts.length > 0) {
        var fileName = matchingScripts[0].fileName;
        var download = wget.download("https://raw.githubusercontent.com/georgegillams/browser-scripts/master/src/".concat(fileName), path.join(__dirname, './server_content/greasemonkey', fileName), {});
        download.on('end', function () {
          res.sendFile(path.join(__dirname, './server_content/greasemonkey', fileName), {
            headers: {
              'Content-Type': 'text/plain'
            }
          });
        });
      } else {
        res.status(500).send({
          error: 'An error occured fetching resources from GitHub.'
        });
      }
    });
  } catch (e) {
    console.error("An error occured fetching resources from GitHub", err);
  }
}

router.get("/greasemonkey/*", function (req, res) {
  var pathValues = req.path.split('/');
  var scriptId = pathValues[pathValues.length - 1];
  sendGreasemonkeyFile(scriptId, req, res);
});
router.get("/api/greasemonkey/*", function (req, res) {
  var pathValues = req.path.split('/');
  var scriptId = pathValues[pathValues.length - 1];
  sendGreasemonkeyFile(scriptId, req, res);
});
var _default = router;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=greasemonkey.js.map