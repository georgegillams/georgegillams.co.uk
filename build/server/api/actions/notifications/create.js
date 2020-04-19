"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _datum = require("../datum");

var _notificationsAllowedAttributes = _interopRequireDefault(require("./notificationsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _notificationsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        resolve((0, _datum.datumCreate)({
          redisKey: 'notifications',
          user: user
        }, reqSecured));
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