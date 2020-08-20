const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export const email = value => {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return null;
};

export const required = value => {
  if (isEmpty(value)) {
    return 'Required';
  }
  return null;
};

export const minLength = min => value => {
  if (!isEmpty(value) && value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return null;
};

export const maxLength = max => value => {
  if (!isEmpty(value) && value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return null;
};

export const integer = value => {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
  return null;
};

export function oneOf(enumeration) {
  return value => {
    if (!enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
    return null;
  };
}

export const match = field => (value, data) => {
  if (data) {
    if (value !== data[field]) {
      return 'Do not match';
    }
  }
  return null;
};

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
