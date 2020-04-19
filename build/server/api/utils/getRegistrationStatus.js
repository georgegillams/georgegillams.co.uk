"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRegistrationStatus;

var _datum = require("../actions/datum");

var _find = require("utils/find");

var _constants = require("helpers/constants");

var _ticketing = require("helpers/ticketing");

var _hash = require("utils/hash");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

function getRegistrationStatus(user) {
  return new Promise(function (resolve, reject) {
    (0, _datum.datumLoadSingle)({
      redisKey: 'users',
      filter: function filter(u) {
        return u.id === user.id;
      }
    }).then(function (loadedUser) {
      (0, _datum.datumLoadSingle)({
        redisKey: 'userDetails',
        resolveIfNotFound: true,
        filter: function filter(u) {
          return u.authorId === user.id;
        }
      }).then(function (loadedUserDetails) {
        (0, _datum.datumLoadSingle)({
          redisKey: 'tickets',
          resolveIfNotFound: true,
          filter: function filter(u) {
            return u.reservedTo === user.id;
          }
        }).then(function (loadedTicket) {
          (0, _datum.datumLoad)({
            redisKey: 'stripepayments',
            filter: function filter(u) {
              return u.userId === user.id;
            }
          }).then(function (loadedPayments) {
            (0, _datum.datumLoadSingle)({
              redisKey: 'registrations',
              resolveIfNotFound: true,
              filter: function filter(u) {
                return u.userId === user.id;
              }
            }).then(function (loadedRegistration) {
              var ticket;
              var overall = 'INCOMPLETE';
              var userDetails = 'NOT STARTED';
              var photoRelease = 'NOT STARTED';
              var validTicket = 'NOT STARTED';
              var hasArrivedAtConferenceDay1 = false;
              var hasArrivedAtConferenceDay2 = false;

              if (loadedRegistration) {
                hasArrivedAtConferenceDay1 = loadedRegistration.hasArrivedAtConferenceDay1;
                hasArrivedAtConferenceDay2 = loadedRegistration.hasArrivedAtConferenceDay2;
              }

              if (loadedUserDetails) {
                userDetails = 'INCOMPLETE';

                if (loadedUserDetails.name && loadedUserDetails.surname && loadedUserDetails.university && loadedUserDetails.yearOfStudy) {
                  userDetails = 'COMPLETE';
                }

                if (loadedUserDetails.photoReleaseConsented) {
                  photoRelease = 'COMPLETE';
                }
              }

              if (loadedTicket && (0, _ticketing.ticketReservationIsValid)(loadedTicket)) {
                validTicket = 'INCOMPLETE';

                if ((0, _ticketing.calculateOutstandingBalance)(loadedTicket, loadedPayments) < 1) {
                  validTicket = 'COMPLETE';
                }
              }

              if (userDetails === 'NOT STARTED' && photoRelease === ' NOT STARTED' && validTicket === ' NOT STARTED') {
                overall = 'NOT STARTED';
              }

              if (userDetails === 'COMPLETE' && validTicket === 'COMPLETE') {
                overall = 'COMPLETE';
                ticket = {
                  email: loadedUser.email,
                  ticketId: loadedTicket.id
                };
              }

              resolve({
                userId: user.id,
                overall: overall,
                userDetails: userDetails,
                photoRelease: photoRelease,
                validTicket: validTicket,
                ticket: ticket,
                hasArrivedAtConferenceDay1: hasArrivedAtConferenceDay1,
                hasArrivedAtConferenceDay2: hasArrivedAtConferenceDay2
              });
            });
          });
        });
      });
    }, function (err) {
      reject({
        error: 'not-found',
        errorMessage: "No user found with id ".concat(user.id)
      });
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=getRegistrationStatus.js.map