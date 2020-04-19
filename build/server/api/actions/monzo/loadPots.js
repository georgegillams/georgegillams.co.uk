"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = require("./helpers");

var _potConfigs = _interopRequireDefault(require("./potConfigs"));

function loadPots(req) {
  return new Promise(function (resolve, reject) {
    (0, _helpers.loadPotData)(req.body.password).then(function (potData) {
      if (potData.error || potData.warning) {
        resolve(potData);
        return;
      }

      var processedData = _potConfigs["default"].map(function (potConfig) {
        var pot = potData.filter(function (p) {
          return p.name === potConfig.name && !p.deleted;
        })[0];

        if (!pot) {
          reject({
            error: 'unknown',
            errorMessage: 'An unknown error occured'
          });
          return null;
        }

        var goalAmount = parseFloat(pot.goal_amount) / 100;
        var balance = parseFloat(pot.balance) / 100;
        var monthsElapsedPercentage = (0, _helpers.getMonthsElapsedPercentage)(potConfig);
        var expectedSavingsSoFar = (potConfig.startAmount || 0) + goalAmount * monthsElapsedPercentage / 100;
        var shortfall = expectedSavingsSoFar - balance;
        return {
          name: pot.name,
          balance: balance,
          goalAmount: parseFloat(pot.goal_amount) / 100,
          percentageExpected: 100.0 * expectedSavingsSoFar / goalAmount,
          shortfall: shortfall < 5 ? null : shortfall,
          percentageComplete: pot.goal_amount ? Math.ceil(100 * pot.balance / pot.goal_amount) : 100
        };
      });

      resolve(processedData);
    }, function (err) {
      return reject(err);
    });
  });
}

var _default = loadPots;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=loadPots.js.map