"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = update;

var _datum = require("../datum");

var _userDetailsAllowedAttributes = _interopRequireDefault(require("./userDetailsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _userOwnsResource = require("utils/userOwnsResource");

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function update(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _userDetailsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      (0, _userOwnsResource.userOwnsResource)('userDetails', reqSecured.body.id, user).then(function (userOwnsResourceResult) {
        // Users should be able to update userDetails that they own
        if (user && (user.admin || userOwnsResourceResult)) {
          resolve((0, _datum.datumUpdate)({
            redisKey: 'userDetails'
          }, reqSecured));
        } else {
          resolve(_constants.UNAUTHORISED_WRITE);
        }
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=update.js.map