"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _crypto = _interopRequireDefault(require("crypto"));

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _hash = require("utils/hash");

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, []);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      reqSecured.body.sessionKey = (0, _hash.generateKey)();
      reqSecured.body.lastActive = Date.now();
      resolve((0, _datum.datumCreate)({
        redisKey: 'sessions',
        user: user
      }, reqSecured));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map