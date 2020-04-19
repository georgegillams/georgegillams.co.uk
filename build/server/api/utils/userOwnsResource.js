"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userOwnsResource = userOwnsResource;

var _datum = require("../actions/datum");

var _find2 = require("./find");

function userOwnsResource(redisKey, resourceId, user) {
  return new Promise(function (resolve) {
    if (!user) {
      resolve(false); // Users should be honary owners of themselves:
    } else if (redisKey === 'users' && resourceId === user.id) {
      resolve(true);
    } else {
      (0, _datum.datumLoad)({
        redisKey: redisKey
      }).then(function (data) {
        var _find = (0, _find2.find)(data, resourceId),
            existingValue = _find.existingValue;

        if (existingValue) {
          resolve(existingValue.authorId === user.id);
        } else {
          resolve(false);
        }
      });
    }
  });
}
//# sourceMappingURL=userOwnsResource.js.map