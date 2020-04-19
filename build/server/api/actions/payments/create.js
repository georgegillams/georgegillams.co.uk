"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _paymentsAllowedAttributes = _interopRequireDefault(require("./paymentsAllowedAttributes"));

function create(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _paymentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (reqSecured.body.amount < 30) {
        reject({
          error: 'invalid-input',
          errorMessage: 'Payments under 30p are not possible.'
        });
        return;
      }

      if (reqSecured.body.amount > 1000000) {
        reject({
          error: 'invalid-input',
          errorMessage: 'Payments over £10,000 are not possible.'
        });
        return;
      }

      resolve((0, _datum.datumCreate)({
        redisKey: 'payments',
        user: user
      }, reqSecured));
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=create.js.map