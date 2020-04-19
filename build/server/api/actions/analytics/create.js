"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _datum = require("../datum");

var _analyticsAllowedAttributes = _interopRequireDefault(require("./analyticsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _constants = require("helpers/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _analyticsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      var ipAddress = req.connection.remoteAddress;

      if (req.headers['x-forwarded-for']) {
        ipAddress = req.headers['x-forwarded-for'];
      }

      (0, _datum.datumCreate)({
        redisKey: 'analytics',
        user: user
      }, _objectSpread({}, reqSecured, {
        ipAddress: ipAddress
      })).then(function (r) {
        return resolve({});
      })["catch"](function (err) {
        return reject(err);
      });
    })["catch"](function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map