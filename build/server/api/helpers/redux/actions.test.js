#!/usr/bin/env node
// eslint-disable-next-line
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _actions = _interopRequireWildcard(require("./actions.js"));

var testActionDefinitions = [{
  MY_ACTION_NAME: 'tbd',
  attributes: []
}, {
  MY_ACTION_NAME_SUCCESS: 'tbd',
  attributes: ['theFirstArgument', 'theSecondArgument']
}, {
  MY_ACTION_NAME_ERROR: 'tbd',
  attributes: ['theFirstErrorArgument']
}];
test('correctly creates actions action definitions', function (done) {
  var actions = (0, _actions["default"])(testActionDefinitions);
  var actionMethodNames = Object.keys(actions);
  expect(actionMethodNames.length).toBe(3);
  expect(actionMethodNames[0]).toBe('myActionName');
  expect(actionMethodNames[1]).toBe('myActionNameSuccess');
  expect(actionMethodNames[2]).toBe('myActionNameError');
  expect((0, _typeof2["default"])(actions[actionMethodNames[0]])).toEqual('function');
  expect((0, _typeof2["default"])(actions[actionMethodNames[1]])).toEqual('function');
  expect((0, _typeof2["default"])(actions[actionMethodNames[2]])).toEqual('function');
  done();
});
test('correctly populates action definition constants', function (done) {
  var constants = {
    MY_ACTION_NAME: 'asdfhh',
    MY_ACTION_NAME_SUCCESS: 'xcvbnm',
    MY_ACTION_NAME_ERROR: 'ertyuio'
  };
  var populatedActions = (0, _actions.populateConstants)(testActionDefinitions, constants);
  expect(populatedActions.length).toBe(3);
  expect(populatedActions[0].MY_ACTION_NAME).toBe('asdfhh');
  expect(populatedActions[0].MY_ACTION_NAME_SUCCESS).toBe(undefined);
  expect(populatedActions[0].MY_ACTION_NAME_ERROR).toBe(undefined);
  expect(populatedActions[1].MY_ACTION_NAME).toBe(undefined);
  expect(populatedActions[1].MY_ACTION_NAME_SUCCESS).toBe('xcvbnm');
  expect(populatedActions[1].MY_ACTION_NAME_ERROR).toBe(undefined);
  expect(populatedActions[2].MY_ACTION_NAME).toBe(undefined);
  expect(populatedActions[2].MY_ACTION_NAME_SUCCESS).toBe(undefined);
  expect(populatedActions[2].MY_ACTION_NAME_ERROR).toBe('ertyuio');
  done();
});
test('correctly maps actions for prop dispatching', function (done) {
  var calledArgs = [];

  var dispatchMock = function dispatchMock(functionReturnedValue) {
    calledArgs.push(functionReturnedValue);
  };

  var testActions = {
    actionOne: function actionOne() {
      var result = 'action1';

      for (var i = 0; i < arguments.length; i += 1) {
        result += "_".concat(i < 0 || arguments.length <= i ? undefined : arguments[i]);
      }

      return result;
    },
    actionTwo: function actionTwo() {
      var result = 'action2';

      for (var i = 0; i < arguments.length; i += 1) {
        result += "_".concat(i < 0 || arguments.length <= i ? undefined : arguments[i]);
      }

      return result;
    }
  };
  var mappedActions = (0, _actions.mapActions)(dispatchMock, testActions);
  var actionMethodNames = Object.keys(mappedActions);
  expect(actionMethodNames.length).toBe(2);
  expect(actionMethodNames[0]).toBe('actionOne');
  expect(actionMethodNames[1]).toBe('actionTwo');
  expect(calledArgs).toEqual([]);
  mappedActions.actionOne('a', 'b');
  expect(calledArgs).toEqual(['action1_a_b']);
  mappedActions.actionTwo('c', 'd');
  expect(calledArgs).toEqual(['action1_a_b', 'action2_c_d']);
  done();
});
//# sourceMappingURL=actions.test.js.map