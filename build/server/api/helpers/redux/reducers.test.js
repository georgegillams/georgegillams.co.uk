#!/usr/bin/env node
// eslint-disable-next-line
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _immutable = require("immutable");

var _reducers = _interopRequireWildcard(require("./reducers.js"));

var testInitialState = (0, _immutable.fromJS)({
  loading: false,
  error: null,
  blogId: null,
  success: false,
  blog: null,
  updating: false,
  updateError: null,
  newBlog: null,
  updateSuccess: false,
  creating: false,
  createError: null,
  createSuccess: false
});

var testReducer = function testReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : testInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CONSTANT_1':
      return state.set('loading', true).set('error', false).set('blogId', action.blogId);

    case 'CONSTANT_2':
      return state.set('loading', false).set('success', true).set('blog', action.blog);

    default:
      return state;
  }
};

test('correctly gets intial state from reducer', function (done) {
  var inferedInitialState = (0, _reducers.getInitialState)(testReducer);
  expect(inferedInitialState).toEqual(testInitialState);
  done();
});
test('correctly infers properties from initial state', function (done) {
  var inferedProperties = (0, _reducers["default"])((0, _reducers.getInitialState)(testReducer));
  expect(inferedProperties).toEqual(['newBlog', 'blog', 'success', 'updating', 'createSuccess', 'error', 'createError', 'creating', 'updateSuccess', 'loading', 'blogId', 'updateError']);
  done();
});
//# sourceMappingURL=reducers.test.js.map