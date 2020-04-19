"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = datumRemove;

var _datumLoad = _interopRequireDefault(require("./datumLoad"));

var _datumUpdate = _interopRequireDefault(require("./datumUpdate"));

var _constants = require("helpers/constants");

var _redis = _interopRequireDefault(require("utils/redis"));

var _find2 = require("utils/find");

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

function datumRemove(settings, req) {
  return new Promise(function (resolve, reject) {
    (0, _datumLoad["default"])(settings, req).then(function (data) {
      var _find = (0, _find2.find)(data, req.body.id),
          existingValue = _find.existingValue,
          existingValueIndex = _find.existingValueIndex;

      if (existingValue) {
        var value = JSON.parse(JSON.stringify(existingValue));
        value.deleted = true;
        resolve((0, _datumUpdate["default"])(settings, {
          body: value
        }));
      } else {
        reject(_constants.RESOURCE_NOT_FOUND);
      }
    }, function (err) {
      reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=datumRemove.js.map