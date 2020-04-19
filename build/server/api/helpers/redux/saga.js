"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sagaHelper = sagaHelper;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _actions = require("containers/RequestStatusWrapper/actions");

var _request = _interopRequireDefault(require("utils/request"));

var _constants = require("helpers/constants");

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(sagaHelper);

function sagaHelper(requestURL, requestParams, registerErrorAction, registerSuccessAction, successMessage, postSuccessCallback) {
  var result;
  return _regenerator["default"].wrap(function sagaHelper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_request["default"], requestURL, requestParams);

        case 3:
          result = _context.sent;

          if (!result.error) {
            _context.next = 11;
            break;
          }

          _context.next = 7;
          return (0, _effects.put)(registerErrorAction(result));

        case 7:
          _context.next = 9;
          return (0, _effects.put)((0, _actions.pushMessage)({
            type: 'error',
            message: result.errorMessage
          }));

        case 9:
          _context.next = 22;
          break;

        case 11:
          if (!result.warning) {
            _context.next = 14;
            break;
          }

          _context.next = 14;
          return (0, _effects.put)((0, _actions.pushMessage)({
            type: 'warn',
            message: result.warningMessage
          }));

        case 14:
          if (!successMessage) {
            _context.next = 17;
            break;
          }

          _context.next = 17;
          return (0, _effects.put)((0, _actions.pushMessage)(successMessage));

        case 17:
          _context.next = 19;
          return (0, _effects.put)(registerSuccessAction(result));

        case 19:
          if (!postSuccessCallback) {
            _context.next = 22;
            break;
          }

          _context.next = 22;
          return postSuccessCallback();

        case 22:
          _context.next = 30;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          _context.next = 28;
          return (0, _effects.put)(registerErrorAction(_context.t0));

        case 28:
          _context.next = 30;
          return (0, _effects.put)((0, _actions.pushMessage)(_constants.COMMUNICATION_ERROR_MESSAGE));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 24]]);
}
//# sourceMappingURL=saga.js.map