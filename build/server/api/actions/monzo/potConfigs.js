"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var thisYear = (0, _moment["default"])().format('YYYY');
var lastYear = thisYear - 1;
var POT_CONFIGS = [{
  name: 'Weekly',
  monthly: true
}, {
  name: 'Eating out',
  monthly: true
}, {
  name: 'Buffer',
  monthly: true
}, {
  name: 'Spare',
  monthly: true
}, {
  name: 'Emergency',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Holidays',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Presents',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Charlie',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Extras',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Yearly subscriptions',
  startDate: "".concat(lastYear, "-12-01"),
  startAmount: 88.76
}, {
  name: 'Health',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Monthly subscriptions',
  monthly: true
}, {
  name: 'Health',
  startDate: "".concat(lastYear, "-12-01")
}, {
  name: 'Season ticket',
  startDate: "".concat(lastYear, "-12-01"),
  startAmount: 4484.1
}];
var _default = POT_CONFIGS;
exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=potConfigs.js.map