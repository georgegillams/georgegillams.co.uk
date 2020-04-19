"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "mapActions", {
  enumerable: true,
  get: function get() {
    return _actions.mapActions;
  }
});
Object.defineProperty(exports, "composeContainer", {
  enumerable: true,
  get: function get() {
    return _containers.composeContainer;
  }
});
Object.defineProperty(exports, "mapSelectors", {
  enumerable: true,
  get: function get() {
    return _selectors.mapSelectors;
  }
});
exports["default"] = exports.createReduxComponents = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _immutable = require("immutable");

var _actions = require("./actions");

var _constants = require("./constants");

var _reducers = require("./reducers");

var _containers = require("./containers");

var _selectors = require("./selectors");

// TODO TEST THIS FILE
var createReduxComponents = function createReduxComponents(actionMeta) {
  var inferedConstants = (0, _constants.inferConstantsFromActionDefinitions)(actionMeta.actionDefinitions);

  var constants = _constants.defineConstants.apply(void 0, (0, _toConsumableArray2["default"])(inferedConstants));

  var initialStateObj = (0, _reducers.createInitialState)(actionMeta.actionDefinitions);
  var initialState = (0, _immutable.fromJS)(initialStateObj);
  var reducer = (0, _reducers.createAppReducer)(actionMeta.actionDefinitions, constants, initialState);
  var actions = (0, _actions.defineActions)((0, _actions.populateConstants)(actionMeta.actionDefinitions, constants));
  var selectors = (0, _selectors.createSelectors)(actionMeta.key, (0, _reducers.inferPropertiesFromInitialState)((0, _reducers.getInitialState)(reducer)));
  return {
    reducer: reducer,
    actions: actions,
    selectors: selectors,
    constants: constants
  };
};

exports.createReduxComponents = createReduxComponents;
var _default = createReduxComponents;
exports["default"] = _default;
//# sourceMappingURL=index.js.map