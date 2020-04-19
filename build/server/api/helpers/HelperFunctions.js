"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var HelperFunctions =
/*#__PURE__*/
function () {
  function HelperFunctions() {
    (0, _classCallCheck2["default"])(this, HelperFunctions);
  }

  (0, _createClass2["default"])(HelperFunctions, null, [{
    key: "includes",
    value: function includes(container, value) {
      var returnValue = false;
      var pos = container.indexOf(value);

      if (pos >= 0) {
        returnValue = true;
      }

      return returnValue;
    }
  }, {
    key: "isLocalHost",
    value: function isLocalHost(url) {
      var returnValue = false;
      var pos = url.indexOf(':3000') + url.indexOf('localhost') + url.indexOf('10.0.2.2') + url.indexOf('127.0.0.1');

      if (pos >= 0) {
        returnValue = true;
      }

      return returnValue;
    }
  }, {
    key: "evalCompat",
    value: function evalCompat(code) {
      if (typeof window === 'undefined' || this.getBrowser(window).ie) {
        return function () {
          return null;
        };
      }

      return eval(code); // eslint-disable-line
    }
  }, {
    key: "getBrowser",
    value: function getBrowser(window) {
      var ua = window.navigator.userAgent;
      var browser = false; // Test values; Uncomment to check result …
      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
      // Edge 12 (Spartan)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
      // Edge 13
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      var msie = ua.indexOf('MSIE ');

      if (msie > 0) {
        // IE 10 or older => return version number
        browser = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');

      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        browser = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');

      if (edge > 0) {
        // Edge (IE 12+) => return version number
        browser = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      if (browser === false) {
        return {
          good: true,
          ie: false,
          edge: false
        };
      } else if (browser >= 12) {
        return {
          good: false,
          ie: false,
          edge: true
        };
      }

      return {
        good: false,
        ie: true,
        edge: false
      };
    }
  }]);
  return HelperFunctions;
}();

module.exports = HelperFunctions;
//# sourceMappingURL=HelperFunctions.js.map