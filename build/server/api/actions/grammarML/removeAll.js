"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeAll;

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _redis = _interopRequireDefault(require("utils/redis"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function removeAll(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _grammarMLAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      (0, _datum.datumLoad)({
        redisKey: 'grammarML',
        includeDeleted: true
      }).then(function (collectionData) {
        for (var i = 0; i < collectionData.length; i += 1) {
          var existingValue = collectionData[i];
          console.log("Permanently removing ".concat(existingValue.id, " at index ").concat(i));
          resolve(_redis["default"].lrem('grammarML', 1, JSON.stringify(existingValue)));
        }
      });
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=removeAll.js.map