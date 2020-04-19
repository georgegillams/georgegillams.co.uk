"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.associate = exports.formValueChanged = void 0;

var formValueChanged = function formValueChanged(object, attributeName, event, action) {
  var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var newValue = JSON.parse(JSON.stringify(object));
  newValue[attributeName] = event.target.value === 'on' ? event.target.checked : event.target.value;
  action(newValue);

  if (callback) {
    callback(newValue);
  }
};

exports.formValueChanged = formValueChanged;

var createDictionary = function createDictionary(data, keyProperty) {
  var dict = {};

  for (var i = 0; i < data.length; i += 1) {
    var key = data[i][keyProperty];

    if (dict[key]) {
      dict[key].push(data[i]);
    } else {
      dict[key] = [data[i]];
    }
  }

  return dict;
};

var deArrayitise = function deArrayitise(array) {
  if (array && array.length === 1) {
    return array[0];
  }

  return array;
};

var associate = function associate(data, additionalData, dataKey, additionalDataKey, associationName, preventDearrayisation) {
  var newData = JSON.parse(JSON.stringify(data)); // Create a dictionary of the additional data

  var additionalDataDictionary = createDictionary(additionalData, additionalDataKey);

  for (var i = 0; i < newData.length; i += 1) {
    var key = newData[i][dataKey];

    if (additionalDataDictionary[key]) {
      var finalValue = preventDearrayisation ? additionalDataDictionary[key] : deArrayitise(additionalDataDictionary[key]);
      newData[i][associationName] = finalValue;
    }
  }

  return newData;
};

exports.associate = associate;
var _default = {
  formValueChanged: formValueChanged,
  associate: associate
};
exports["default"] = _default;
//# sourceMappingURL=objects.js.map