"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = datumUpdate;

var _datumLoad = _interopRequireDefault(require("./datumLoad"));

var _redis = _interopRequireDefault(require("utils/redis"));

var _find2 = require("utils/find");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

function datumUpdate(settings, req) {
  return new Promise(function (resolve, reject) {
    // Need to unset all of these, as alternative values will affect the index, and cause the redis update command to update the wrong entry
    settings.includeDeleted = true;
    settings.sortKey = null;
    settings.filter = null;
    (0, _datumLoad["default"])(settings, req).then(function (data) {
      var values = data;
      var value = req.body;

      var _find = (0, _find2.find)(values, value.id),
          existingValue = _find.existingValue,
          existingValueIndex = _find.existingValueIndex;

      if (existingValue) {
        // Persist unchangeable values
        value.timestamp = existingValue.timestamp;
        value.lastUpdatedTimestamp = Date.now();
        value.authorId = existingValue.authorId;
        values[existingValueIndex] = value;

        _redis["default"].lset(settings.redisKey, existingValueIndex, JSON.stringify(value));

        if (settings.redisKey !== 'sessions' && settings.redisKey !== 'contentUpdates') {
          (0, _setContentLastUpdatedTimestamp["default"])();
        }
      }

      if (req.session) {
        req.session[settings.redisKey] = values;
      }

      resolve(value);
    }, function (err) {
      reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=datumUpdate.js.map