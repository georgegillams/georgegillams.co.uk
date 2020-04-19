"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = datumCreate;

var _datumLoad = _interopRequireDefault(require("./datumLoad"));

var _redis = _interopRequireDefault(require("utils/redis"));

var _find2 = require("utils/find");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

function datumCreate(settings, req) {
  return new Promise(function (resolve, reject) {
    var newValue = req.body;
    var requestedId = newValue.requestedId;
    newValue.id = Math.random().toString(36).substring(7);
    (0, _datumLoad["default"])({
      redisKey: settings.redisKey
    }).then(function (existingData) {
      if (requestedId) {
        var _find = (0, _find2.find)(existingData, requestedId),
            entityWithSameId = _find.existingValue;

        if (!entityWithSameId) {
          newValue.id = requestedId;
        }
      }

      newValue.timestamp = Date.now();
      newValue.lastUpdatedTimestamp = newValue.timestamp;
      newValue.authorId = settings.user ? settings.user.id : undefined; // Write to redis:

      _redis["default"].rpush([settings.redisKey, JSON.stringify(newValue)]);

      if (settings.redisKey !== 'sessions' && settings.redisKey !== 'contentUpdates') {
        (0, _setContentLastUpdatedTimestamp["default"])();
      }

      (0, _datumLoad["default"])(req).then(function (data) {
        if (req.session) {
          req.session[settings.redisKey] = data;
        }

        resolve(newValue);
      }, function (err) {
        reject(err);
      });
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=datumCreate.js.map