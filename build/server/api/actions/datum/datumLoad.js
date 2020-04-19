"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = datumLoad;

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _reverse = _interopRequireDefault(require("lodash/reverse"));

var _redis = _interopRequireDefault(require("utils/redis"));

var _find2 = require("utils/find");

function datumLoad(settings) {
  // load(req) {
  return new Promise(function (resolve) {
    if (settings.includeOwnerUname && settings.redisKey !== 'users') {
      datumLoad({
        redisKey: 'users'
      }).then(function (userData) {
        _redis["default"].lrange(settings.redisKey, 0, -1, function (err, reply) {
          var result = [];

          var _loop = function _loop(inc) {
            var value = JSON.parse(reply[inc]);

            if (value.authorId) {
              var _find = (0, _find2.find)(userData, value.authorId),
                  commentOwner = _find.existingValue;

              var ownerUname = 'Anon';

              if (commentOwner && commentOwner.uname) {
                ownerUname = commentOwner.uname;
              }

              value.ownerUname = ownerUname;

              if (settings.removeFields) {
                settings.removeFields.forEach(function (rf) {
                  value[rf] = null;
                });
              }
            }

            if (!settings.filter || settings.filter(value)) {
              if (!value.deleted || settings.includeDeleted) {
                result.push(value);
              }
            }
          };

          for (var inc = 0; inc < reply.length; inc += 1) {
            _loop(inc);
          }

          if (settings.sortKey) {
            result = (0, _reverse["default"])((0, _sortBy["default"])(result, [settings.sortKey]));
          }

          resolve(result);
        });
      });
    } else {
      _redis["default"].lrange(settings.redisKey, 0, -1, function (err, reply) {
        var result = [];

        var _loop2 = function _loop2(inc) {
          var value = JSON.parse(reply[inc]);

          if (!settings.filter || settings.filter(value)) {
            if (!value.deleted || settings.includeDeleted) {
              result.push(value);
            }
          }

          if (settings.removeFields) {
            settings.removeFields.forEach(function (rf) {
              value[rf] = null;
            });
          }
        };

        for (var inc = 0; inc < reply.length; inc += 1) {
          _loop2(inc);
        }

        if (settings.sortKey) {
          result = (0, _reverse["default"])((0, _sortBy["default"])(result, [settings.sortKey]));
        }

        resolve(result);
      });
    }
  });
}

module.exports = exports.default;
//# sourceMappingURL=datumLoad.js.map