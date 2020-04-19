"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createAppReducer = exports.createInitialState = exports.getInitialState = exports.inferPropertiesFromInitialState = void 0;

var inferPropertiesFromInitialStateRecursive = function inferPropertiesFromInitialStateRecursive(s) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (s && s._root) {
    return inferPropertiesFromInitialStateRecursive(s._root);
  }

  if (s && s[0] && typeof s[0] === 'string') {
    result.push(s[0]);
  }

  if (!s) {
    return result;
  }

  var sNodes = s.nodes;

  if (sNodes && sNodes.forEach) {
    sNodes.forEach(function (node) {
      var nodeProperties = inferPropertiesFromInitialStateRecursive(node);
      nodeProperties.forEach(function (property) {
        result.push(property);
      });
    });
  }

  var sEntries = s.entries;

  if (sEntries && sEntries.forEach) {
    sEntries.forEach(function (entry) {
      var nodeEntries = inferPropertiesFromInitialStateRecursive(entry);
      nodeEntries.forEach(function (property) {
        result.push(property);
      });
    });
  }

  var sEntry = s.entry;

  if (sEntry) {
    var entryResults = inferPropertiesFromInitialStateRecursive(sEntry);
    entryResults.forEach(function (entryResult) {
      result.push(entryResult);
    });
  }

  return result;
};

var inferPropertiesFromInitialState = function inferPropertiesFromInitialState(s) {
  if (!s || !s._root) {
    return [];
  }

  return inferPropertiesFromInitialStateRecursive(s._root);
};

exports.inferPropertiesFromInitialState = inferPropertiesFromInitialState;

var getInitialState = function getInitialState(reducer) {
  return reducer(undefined, {});
}; // TODO Write tests for this:


exports.getInitialState = getInitialState;

var createInitialState = function createInitialState(actionDefinitions) {
  var initialStateObj = {};
  actionDefinitions.forEach(function (aD) {
    if (!aD.stateMutations) {
      return;
    }

    Object.keys(aD.stateMutations).forEach(function (k) {
      initialStateObj[k] = null;
    });
  });
  return initialStateObj;
}; // TODO Write tests for this:


exports.createInitialState = createInitialState;

var createAppReducer = function createAppReducer(actionDefinitions, constants, initialState) {
  function appReducerFunc() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    // Work out which actionDefinition the `action.type` refers to.
    var actionDefinition = null;
    Object.keys(constants).forEach(function (constantKey) {
      var constantValue = constants[constantKey];

      if (constantValue === action.type) {
        actionDefinitions.forEach(function (aD) {
          if (Object.keys(aD)[0] === constantKey) {
            actionDefinition = aD;
          }
        });
      }
    }); // For each stateMutator on the actionDefinition, call `state.set(...)`

    if (actionDefinition && actionDefinition.stateMutations) {
      var stateMutations = actionDefinition.stateMutations;
      Object.keys(stateMutations).forEach(function (smKey) {
        var newValue = stateMutations[smKey];

        if (typeof newValue === 'function') {
          newValue = newValue(action, state.get(smKey));
        }

        state = state.set(smKey, newValue);
      });
    } // Return state


    return state;
  }

  return appReducerFunc;
};

exports.createAppReducer = createAppReducer;
var _default = inferPropertiesFromInitialState;
exports["default"] = _default;
//# sourceMappingURL=reducers.js.map