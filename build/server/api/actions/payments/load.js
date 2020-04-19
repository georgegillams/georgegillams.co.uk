"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadAll;

var _datum = require("../datum");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _constants = require("helpers/constants");

var _objects = require("helpers/objects");

var _paymentsAllowedAttributes = _interopRequireDefault(require("./paymentsAllowedAttributes"));

function loadAll(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _paymentsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        (0, _datum.datumLoad)({
          redisKey: 'payments',
          includeDeleted: true
        }).then(function (paymentData) {
          (0, _datum.datumLoad)({
            redisKey: 'stripepayments',
            includeDeleted: true
          }).then(function (charges) {
            var result = (0, _objects.associate)(paymentData, charges, 'id', 'paymentId', 'charge', false);
            resolve(result);
          });
        });
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