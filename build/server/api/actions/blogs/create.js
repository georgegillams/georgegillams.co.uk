"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

function create(req) {
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(req).then(function (user) {
      if (user && user.admin) {
        resolve((0, _datum.datumCreate)({
          redisKey: 'blogs',
          user: user
        }, req));
      } else {
        reject(_constants.UNAUTHORISED_WRITE);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map