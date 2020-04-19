"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = signUp;

var _datum = require("../actions/datum");

var _usersAllowedAttributes = _interopRequireDefault(require("./users/usersAllowedAttributes"));

var _find3 = require("utils/find");

var _constants = require("helpers/constants");

var _ticketing = require("helpers/ticketing");

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var _login = _interopRequireDefault(require("utils/login"));

var _emailHelpers = require("utils/emailHelpers");

function signUp(req) {
  var reqSecured = (0, _reqSecure["default"])(req, _usersAllowedAttributes["default"]);
  return new Promise(function (resolve, reject) {
    // Using datum load as we want to avoid invoking authentication when loading users data here
    (0, _datum.datumLoad)({
      redisKey: 'users'
    }).then(function (userData) {
      (0, _datum.datumLoad)({
        redisKey: 'tickets'
      }).then(function (ticketData) {
        var _find = (0, _find3.find)(userData, reqSecured.body.email.toLowerCase(), 'email'),
            userProfile = _find.existingValue;

        if (userProfile) {
          resolve(_constants.EMAIL_TAKEN);
        } else {
          var _find2 = (0, _find3.find)(ticketData.filter(_ticketing.ticketCanBeReserved), reqSecured.body.ticketType, 'ticketType'),
              ticket = _find2.existingValue;

          if (Date.now() > _constants.TICKET_SALE_END) {
            resolve({
              error: 'Ticket sales are now closed.'
            });
          } else if (!ticket) {
            resolve({
              error: 'Ticket type is sold out.'
            });
          } else {
            reqSecured.body.email = reqSecured.body.email.toLowerCase();
            (0, _datum.datumCreate)({
              redisKey: 'users'
            }, {
              body: {
                email: reqSecured.body.email
              }
            }).then(function (createdUser) {
              (0, _login["default"])(reqSecured, createdUser).then(function (loginResult) {
                ticket = (0, _ticketing.reserveTicket)(ticket, createdUser, null);
                (0, _datum.datumUpdate)({
                  redisKey: 'tickets'
                }, {
                  body: ticket
                }).then(function () {
                  (0, _emailHelpers.sendEmailVerificationEmail)(loginResult);
                  resolve(loginResult);
                });
              });
            });
          }
        }
      });
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=signUpEpicc.js.map