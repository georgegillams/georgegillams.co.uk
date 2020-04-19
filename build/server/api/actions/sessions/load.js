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
      if (user && user.admin) {
        resolve((0, _datum.datumLoad)({
          redisKey: 'sessions'
        }));
      } else {
        reject({
          error: 'authentication',
          reason: 'You are not authorised to read this resource'
        });
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=load.js.map