"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = remove;

var _datum = require("../datum");

var _userDetailsAllowedAttributes = _interopRequireDefault(require("./userDetailsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _userOwnsResource = require("utils/userOwnsResource");

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function remove(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _userDetailsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      (0, _userOwnsResource.userOwnsResource)('userDetails', reqSecured.body.id, user).then(function (userOwnsResourceResult) {
        // Users should be able to delete userDetails that they own
        if (user && (user.admin || userOwnsResourceResult)) {
          resolve((0, _datum.datumRemove)({
            redisKey: 'userDetails'
          }, reqSecured));
        } else {
          reject(_constants.UNAUTHORISED_WRITE);
        }
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=remove.js.map