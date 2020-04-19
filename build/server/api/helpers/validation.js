"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.email = email;
exports.required = required;
exports.minLength = minLength;
exports.maxLength = maxLength;
exports.integer = integer;
exports.oneOf = oneOf;
exports.match = match;
exports.createValidator = createValidator;

var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

var join = function join(rules) {
  return function (value, data) {
    return rules.map(function (rule) {
      return rule(value, data);
    }).filter(function (error) {
      return !!error;
    })[0];
  };
};

function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

function minLength(min) {
  return function (value) {
    if (!isEmpty(value) && value.length < min) {
      return "Must be at least ".concat(min, " characters");
    }
  };
}

function maxLength(max) {
  return function (value) {
    if (!isEmpty(value) && value.length > max) {
      return "Must be no more than ".concat(max, " characters");
    }
  };
}

function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

function oneOf(enumeration) {
  return function (value) {
    if (!~enumeration.indexOf(value)) {
      return "Must be one of: ".concat(enumeration.join(', '));
    }
  };
}

function match(field) {
  return function (value, data) {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

function createValidator(rules) {
  return function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var errors = {};
    Object.keys(rules).forEach(function (key) {
      var rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions

      var error = rule(data[key], data);

      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
//# sourceMappingURL=validation.js.map