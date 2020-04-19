"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _datum = require("../datum");

var _commentsAllowedAttributes = _interopRequireDefault(require("./commentsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _commentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      resolve((0, _datum.datumCreate)({
        redisKey: 'comments',
        user: user
      }, reqSecured));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map