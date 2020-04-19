"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _datum = require("../datum");

var _grammarMLAllowedAttributes = _interopRequireDefault(require("./grammarMLAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

function load(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _grammarMLAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      resolve((0, _datum.datumLoad)({
        redisKey: 'grammarML'
      }));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=load.js.map