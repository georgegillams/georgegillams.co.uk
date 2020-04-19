"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadSingle;

var _datum = require("../datum");

var _constants = require("helpers/constants");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function loadSingle(req) {
  var reqSecured = (0, _reqSecure["default"])(req, []);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        resolve((0, _datum.datumLoadSingle)({
          redisKey: 'users',
          filter: function filter(ar) {
            return ar.id === reqSecured.query.id;
          }
        }));
      } else {
        reject(_constants.UNAUTHORISED_READ);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=loadSingle.js.map