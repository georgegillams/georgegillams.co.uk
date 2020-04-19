"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.composeContainer = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reselect = require("reselect");

var _injectSaga = _interopRequireDefault(require("utils/injectSaga"));

var _injectReducer = _interopRequireDefault(require("utils/injectReducer"));

var _selectors = require("./selectors");

var _actions = require("./actions");

// TODO Write tests for this:
var composeContainer = function composeContainer(PageComponent, key, selectors, actions, reducer, saga) {
  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return (0, _actions.mapActions)(dispatch, actions);
  };

  var mapStateToProps = (0, _reselect.createStructuredSelector)((0, _selectors.mapSelectors)(selectors));
  var withConnect = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);
  var withReducer = (0, _injectReducer["default"])({
    key: key,
    reducer: reducer
  });
  var withSaga = (0, _injectSaga["default"])({
    key: key,
    saga: saga
  });
  var composed = (0, _redux.compose)(withReducer, withSaga, withConnect)(PageComponent);
  return {
    __esModule: true,
    mapDispatchToProps: mapDispatchToProps,
    "default": composed
  };
};

exports.composeContainer = composeContainer;
var _default = composeContainer;
exports["default"] = _default;
//# sourceMappingURL=containers.js.map