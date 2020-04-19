"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var path = require('path');

var express = require('express');

var wget = require('wget-improved');

var router = express.Router();
router.get('/robots.txt', function (req, res) {
  res.sendFile(path.join(__dirname, './server_content', 'robots.txt'), {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
});
router.get('/sitemap.xml', function (req, res) {
  res.sendFile(path.join(__dirname, './server_content', 'sitemap.xml'), {
    headers: {
      'Content-Type': 'text/xml'
    }
  });
});
var _default = router;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=seo.js.map