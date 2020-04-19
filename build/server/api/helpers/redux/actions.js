"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.defineActions = exports.defineAction = exports.mapActions = exports.populateConstants = void 0;

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

var defineAction = function defineAction(name, attributes) {
  return function () {
    var result = {
      type: name
    };

    for (var i = 0; i < attributes.length; i += 1) {
      var attributeName = attributes[i];
      result[attributeName] = i < 0 || arguments.length <= i ? undefined : arguments[i];
    }

    return result;
  };
};

exports.defineAction = defineAction;

var defineActions = function defineActions(actionDefinitions) {
  var result = {};

  for (var i = 0; i < actionDefinitions.length; i += 1) {
    var name = Object.keys(actionDefinitions[i])[0];
    var actionName = actionDefinitions[i][name];
    var action = defineAction(actionName, actionDefinitions[i].attributes);
    name = (0, _camelCase["default"])(name);
    result[name] = action;
  }

  return result;
};

exports.defineActions = defineActions;

var mapActions = function mapActions(dispatch, actions) {
  var result = {};
  var actionNames = Object.keys(actions);

  var _loop = function _loop(i) {
    var actionName = actionNames[i];
    var action = actions[actionName];

    result[actionName] = function () {
      return dispatch(action.apply(void 0, arguments));
    };
  };

  for (var i = 0; i < actionNames.length; i += 1) {
    _loop(i);
  }

  return result;
};

exports.mapActions = mapActions;

var populateConstants = function populateConstants(defs, constants) {
  var result = [];

  for (var i = 0; i < defs.length; i += 1) {
    var newDef = JSON.parse(JSON.stringify(defs[i]));
    var newDefId = Object.keys(newDef)[0];
    newDef[newDefId] = constants[newDefId];
    result.push(newDef);
  }

  return result;
};

exports.populateConstants = populateConstants;
var _default = defineActions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map