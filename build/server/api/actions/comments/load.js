"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _datum = require("../datum");

var _commentsAllowedAttributes = _interopRequireDefault(require("./commentsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function load(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _commentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      resolve((0, _datum.datumLoad)({
        redisKey: 'comments',
        includeOwnerUname: true,
        includeDeleted: user && user.admin,
        filter: reqSecured.query.pageId ? function (comment) {
          return comment.pageId === reqSecured.query.pageId;
        } : null
      }));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=load.js.map