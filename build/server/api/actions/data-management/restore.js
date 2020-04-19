"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = create;

var _performRestoration = _interopRequireDefault(require("./performRestoration"));

var _authentication = _interopRequireDefault(require("utils/authentication"));

var _constants = require("helpers/constants");

function create(req) {
  return new Promise(function (resolve, reject) {
    (0, _authentication["default"])(req).then(function (user) {
      if (user && user.admin) {
        if (req.files && req.files.backupFile) {
          var dataBuffer = req.files.backupFile.data;
          var restorationObject = JSON.parse(dataBuffer.toString());

          if (restorationObject.projectName !== _constants.PROJECT_NAME) {
            reject({
              error: 'wrong-input',
              errorMessage: 'The backup was taken from a different project.'
            });
          } else {
            (0, _performRestoration["default"])(restorationObject.data).then(function (result) {
              resolve(true);
            });
          }

          return;
        }

        reject({
          error: 'wrong-input',
          errorMessage: 'A backup file must be provided to carry out the restoration.'
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
//# sourceMappingURL=restore.js.map