"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _datum = require("../datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./usersAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function load(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        resolve((0, _datum.datumLoad)({
          includeDeleted: true,
          redisKey: 'users'
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
//# sourceMappingURL=load.js.map