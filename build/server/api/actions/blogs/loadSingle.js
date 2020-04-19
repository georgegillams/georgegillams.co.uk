"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadSingle;

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function loadSingle(req) {
  var reqSecured = (0, _reqSecure["default"])(req, []);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      resolve((0, _datum.datumLoadSingle)({
        redisKey: 'blogs',
        includeDeleted: user && user.admin,
        filter: function filter(ar) {
          if (ar.id !== reqSecured.query.id) {
            return false;
          }

          if (!ar.published && (!user || !user.admin)) {
            return false;
          }

          return true;
        }
      }));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=loadSingle.js.map