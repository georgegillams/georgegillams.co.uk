"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deleteSet;

var _datum = require("../actions/datum");

var _constants = require("helpers/constants");

var _redis = _interopRequireDefault(require("utils/redis"));

var _find = require("utils/find");

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _setContentLastUpdatedTimestamp = _interopRequireDefault(require("utils/setContentLastUpdatedTimestamp"));

var _reqSecure = _interopRequireDefault(require("utils/reqSecure"));

var deleteSetAllowedAttributes = [{
  attribute: 'collectionName',
  pattern: _constants.STRING_REGEX
}];

function deleteSet(req) {
  var reqSecured = (0, _reqSecure["default"])(req, deleteSetAllowedAttributes);
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(reqSecured).then(function (user) {
      if (user && user.admin) {
        var collectionName = reqSecured.body.collectionName;

        if (!collectionName) {
          reject({
            error: "wrong-input",
            errorMessage: 'CollectionName must be provided'
          });
        } else {
          resolve(_redis["default"].del(collectionName));
          (0, _setContentLastUpdatedTimestamp["default"])();
        }
      } else {
        reject(_constants.UNAUTHORISED_WRITE);
      }
    }, function (err) {
      return reject(err);
    });
  });
}

module.exports = exports.default;
//# sourceMappingURL=deleteSet.js.map