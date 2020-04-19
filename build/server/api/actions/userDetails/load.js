"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = load;

var _datum = require("../datum");

var _userDetailsAllowedAttributes = _interopRequireDefault(require("./userDetailsAllowedAttributes"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _constants = require("helpers/constants");

var _find2 = require("utils/find");

function load(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _userDetailsAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user) {
        (0, _datum.datumLoadSingle)({
          redisKey: 'userDetails',
          includeDeleted: user.admin,
          filter: function filter(ud) {
            return ud.authorId === user.id;
          }
        }).then(function (loadedUserDetails) {
          (0, _datum.datumLoad)({
            redisKey: 'tickets'
          }).then(function (ticketData) {
            var _find = (0, _find2.find)(ticketData, user.id, 'reservedTo'),
                ticket = _find.existingValue;

            loadedUserDetails.ticket = ticket;
            resolve(loadedUserDetails);
          });
        }, function (err) {
          resolve((0, _datum.datumCreate)({
            redisKey: 'userDetails',
            user: user
          }, reqSecured));
        });
      } else {
        resolve(_constants.UNAUTHORISED_READ);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=load.js.map