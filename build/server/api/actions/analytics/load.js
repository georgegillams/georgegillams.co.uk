"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _datum = require("../datum");

var _analyticsAllowedAttributes = _interopRequireDefault(require("./analyticsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _constants = require("helpers/constants");

function load(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _analyticsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        resolve((0, _datum.datumLoad)({
          redisKey: 'analytics',
          includeOwnerUname: true,
          includeDeleted: true
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