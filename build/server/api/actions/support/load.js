"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

function load(req) {
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(req).then(function (user) {
      resolve((0, _datum.datumLoad)({
        redisKey: 'support',
        sortKey: 'lastUpdatedTimestamp'
      }));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=load.js.map