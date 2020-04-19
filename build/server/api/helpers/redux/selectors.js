"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createSelectors = exports.mapSelectors = void 0;

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

var _reselect = require("reselect");

var createSelectors = function createSelectors(id, stateEntities) {
  var result = {};

  var selectState = function selectState(state) {
    return state.get(id);
  };

  var _loop = function _loop(i) {
    var entity = stateEntities[i];
    var selectorName = (0, _camelCase["default"])("MAKE_SELECT_".concat(entity));

    var entitySelector = function entitySelector() {
      return (0, _reselect.createSelector)(selectState, function (state) {
        return state.get(entity);
      });
    };

    result[selectorName] = entitySelector;
  };

  for (var i = 0; i < stateEntities.length; i += 1) {
    _loop(i);
  }

  return result;
};

exports.createSelectors = createSelectors;

var mapSelectors = function mapSelectors(selectors) {
  var result = {};
  var selectorNames = Object.keys(selectors);

  for (var i = 0; i < selectorNames.length; i += 1) {
    if (selectorNames[i].includes('makeSelect')) {
      var shortName = (0, _camelCase["default"])(selectorNames[i].split('makeSelect'));
      result[shortName] = selectors[selectorNames[i]]();
    }
  }

  return result;
};

exports.mapSelectors = mapSelectors;
var _default = createSelectors;
exports["default"] = _default;
//# sourceMappingURL=selectors.js.map