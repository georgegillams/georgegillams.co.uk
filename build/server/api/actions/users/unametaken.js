"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unametaken;

var _datum = require("../datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./usersAllowedAttributes"));

var _find2 = require("utils/find");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function unametaken(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve) {
    setTimeout(function () {
      (0, _datum.datumLoad)({
        redisKey: 'users'
      }).then(function (userData) {
        var _find = (0, _find2.find)(userData, reqSecured.body.uname, 'uname'),
            userWithUname = _find.existingValue;

        if (userWithUname) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    }, 750);
  });
}

module.exports = exports.default;
//# sourceMappingURL=unametaken.js.map