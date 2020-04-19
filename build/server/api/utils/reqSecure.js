"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reqSecure;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _constants = require("helpers/constants");

var standardAttributes = [{
  attribute: 'deleted',
  pattern: 'BOOL'
}, {
  attribute: 'id',
  pattern: _constants.ID_REGEX
}, {
  attribute: 'requestedId',
  pattern: _constants.ID_REGEX
}, {
  attribute: 'apikey',
  pattern: _constants.PASSWORD_REGEX
}, {
  attribute: 'timestamp',
  pattern: _constants.INT_REGEX
}, {
  attribute: 'session',
  pattern: _constants.ID_REGEX
}];

function generateNewComponent(component, req, allAllowedAttributes) {
  if (!req[component]) {
    return undefined;
  }

  var newComponent = {};

  for (var i = 0; i < allAllowedAttributes.length; i += 1) {
    var name = allAllowedAttributes[i].attribute;
    var pattern = allAllowedAttributes[i].pattern;

    if (req[component][name]) {
      if (pattern === 'BOOL') {
        newComponent[name] = !!req[component][name];
      } else {
        // pattern is a regex:
        if (pattern && req[component][name].toString().match(pattern)) {
          newComponent[name] = req[component][name];
        }
      }
    }
  }

  return newComponent;
}

function reqSecure(req, allowedAttributes) {
  var allAllowedAttributes = [].concat((0, _toConsumableArray2["default"])(allowedAttributes), standardAttributes);
  req.body = generateNewComponent('body', req, allAllowedAttributes);
  req.query = generateNewComponent('query', req, allAllowedAttributes);
  req.headers = generateNewComponent('headers', req, allAllowedAttributes);
  req.cookies = generateNewComponent('cookies', req, allAllowedAttributes);
  return req;
}

module.exports = exports.default;
//# sourceMappingURL=reqSecure.js.map