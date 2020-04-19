"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = remove;

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function remove(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _grammarMLAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      resolve((0, _datum.datumRemove)({
        redisKey: 'grammarML'
      }, reqSecured));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=remove.js.map