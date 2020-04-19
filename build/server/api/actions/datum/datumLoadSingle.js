"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = datumLoadSingle;

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _reverse = _interopRequireDefault(require("lodash/reverse"));

var _redis = _interopRequireDefault(require("utils/redis"));

var _constants = require("helpers/constants");

function notFound(settings, resolve, reject) {
  if (settings.resolveIfNotFound) {
    resolve(undefined);
  } else {
    reject(_constants.RESOURCE_NOT_FOUND);
  }
}

function datumLoadSingle(settings) {
  // load(req) {
  return new Promise(function (resolve, reject) {
    _redis["default"].lrange(settings.redisKey, 0, -1, function (err, reply) {
      var orderedReply = reply;

      if (settings.sortKey) {
        orderedReply = (0, _reverse["default"])((0, _sortBy["default"])(orderedReply, [settings.sortKey]));
      }

      for (var inc = 0; inc < orderedReply.length; inc += 1) {
        var value = JSON.parse(orderedReply[inc]);

        if (!settings.filter || settings.filter(value)) {
          if (settings.includeDeleted || !value.deleted) {
            resolve(value);
            return;
          }
        }
      }

      notFound(settings, resolve, reject);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=datumLoadSingle.js.map