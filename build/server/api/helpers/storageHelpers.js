"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getPostLoginRedirectAndRemove = exports.getPostLoginRedirect = exports.setPostLoginRedirect = exports.clearPostLoginRedirect = exports.redirectToCurrentPageAfterLogin = void 0;

var _moment = _interopRequireDefault(require("moment"));

var POST_LOGIN_REDIRECT_LOCATION = 'post-login-redirect-location';

var redirectToCurrentPageAfterLogin = function redirectToCurrentPageAfterLogin() {
  var currentLocation = window.location;
  setPostLoginRedirect(currentLocation);
};

exports.redirectToCurrentPageAfterLogin = redirectToCurrentPageAfterLogin;

var setPostLoginRedirect = function setPostLoginRedirect(location) {
  localStorage.setItem(POST_LOGIN_REDIRECT_LOCATION, location);
};

exports.setPostLoginRedirect = setPostLoginRedirect;

var clearPostLoginRedirect = function clearPostLoginRedirect() {
  setInterval(function () {
    localStorage.removeItem(POST_LOGIN_REDIRECT_LOCATION);
  }, 2000);
};

exports.clearPostLoginRedirect = clearPostLoginRedirect;

var getPostLoginRedirect = function getPostLoginRedirect() {
  var result = localStorage.getItem(POST_LOGIN_REDIRECT_LOCATION);
  return result;
};

exports.getPostLoginRedirect = getPostLoginRedirect;

var getPostLoginRedirectAndRemove = function getPostLoginRedirectAndRemove() {
  var result = getPostLoginRedirect();
  clearPostLoginRedirect();
  return result;
};

exports.getPostLoginRedirectAndRemove = getPostLoginRedirectAndRemove;
var _default = {
  redirectToCurrentPageAfterLogin: redirectToCurrentPageAfterLogin,
  clearPostLoginRedirect: clearPostLoginRedirect,
  setPostLoginRedirect: setPostLoginRedirect,
  getPostLoginRedirect: getPostLoginRedirect,
  getPostLoginRedirectAndRemove: getPostLoginRedirectAndRemove
};
exports["default"] = _default;
//# sourceMappingURL=storageHelpers.js.map