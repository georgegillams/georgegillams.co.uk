"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deleteEntity;

var _datum = require("../actions/datum");

var _constants = require("helpers/constants");

var _redis = _interopRequireDefault(require("utils/redis"));

var _find2 = require("utils/find");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var deleteEntityAllowedAttributes = [{
  attribute: 'collectionName',
  pattern: _constants.STRING_REGEX
}, {
  attribute: 'id',
  pattern: _constants.ID_REGEX
}];

function deleteEntity(req) {
  var reqSecured = (0, _reqSecure["default"])(req, deleteEntityAllowedAttributes);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        var _reqSecured$body = reqSecured.body,
            collectionName = _reqSecured$body.collectionName,
            id = _reqSecured$body.id;
        (0, _datum.datumLoad)({
          redisKey: collectionName,
          includeDeleted: true
        }).then(function (collectionData) {
          var _find = (0, _find2.find)(collectionData, id),
              existingValue = _find.existingValue,
              existingValueIndex = _find.existingValueIndex;

          if (existingValue) {
            if (existingValue.deleted) {
              console.log("Permanently removing ".concat(existingValue.id, " at index ").concat(existingValueIndex));
              resolve(_redis["default"].lrem(collectionName, 1, JSON.stringify(existingValue)));
              (0, _setContentLastUpdatedTimestamp["default"])();
            } else {
              reject({
                error: 'wrong-input',
                errorMessage: 'Only deleted entities can be permanently removed.'
              });
            }
          } else {
            reject(_constants.RESOURCE_NOT_FOUND);
          }
        });
      } else {
        reject(_constants.UNAUTHORISED_WRITE);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=deleteEntity.js.map