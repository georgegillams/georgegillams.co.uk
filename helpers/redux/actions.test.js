#!/usr/bin/env node

// eslint-disable-next-line
import defineActions, { populateConstants, mapActions } from './actions.js';

const testActionDefinitions = [
  { MY_ACTION_NAME: 'tbd', attributes: [] },
  {
    MY_ACTION_NAME_SUCCESS: 'tbd',
    attributes: ['theFirstArgument', 'theSecondArgument'],
  },
  { MY_ACTION_NAME_ERROR: 'tbd', attributes: ['theFirstErrorArgument'] },
];

test('correctly creates actions action definitions', done => {
  const actions = defineActions(testActionDefinitions);

  const actionMethodNames = Object.keys(actions);
  expect(actionMethodNames.length).toBe(3);
  expect(actionMethodNames[0]).toBe('myActionName');
  expect(actionMethodNames[1]).toBe('myActionNameSuccess');
  expect(actionMethodNames[2]).toBe('myActionNameError');

  expect(typeof actions[actionMethodNames[0]]).toEqual('function');
  expect(typeof actions[actionMethodNames[1]]).toEqual('function');
  expect(typeof actions[actionMethodNames[2]]).toEqual('function');

  done();
});

test('correctly populates action definition constants', done => {
  const constants = {
    MY_ACTION_NAME: 'asdfhh',
    MY_ACTION_NAME_SUCCESS: 'xcvbnm',
    MY_ACTION_NAME_ERROR: 'ertyuio',
  };
  const populatedActions = populateConstants(testActionDefinitions, constants);

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

test('correctly maps actions for prop dispatching', done => {
  // TODO This test ain't right!
  const calledArgs = [];
  const dispatchMock = (...args) => {
    for (let i = 0; i < args.length; i += 1) {
      calledArgs.push(args[i]);
    }
  };

  const testActions = {
    actionOne: () => 'test1',
    actionTwo: () => 'test2',
  };

  const mappedActions = mapActions(dispatchMock, testActions);

  const actionMethodNames = Object.keys(mappedActions);
  expect(actionMethodNames.length).toBe(2);
  expect(calledArgs).toEqual([]);

  mappedActions.actionOne();
  expect(calledArgs).toEqual(['test1']);
  mappedActions.actionTwo();
  expect(calledArgs).toEqual(['test1', 'test2']);
  done();
});
