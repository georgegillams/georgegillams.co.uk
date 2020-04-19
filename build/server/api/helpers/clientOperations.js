"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.downloadStringAsCsv = exports.downloadFile = void 0;

var downloadFile = function downloadFile(file) {
  var link = document.createElement('a');
  link.setAttribute('href', window.URL.createObjectURL(file));
  link.setAttribute('download', file.name);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  return Promise.resolve(file.name);
};

exports.downloadFile = downloadFile;

var downloadStringAsCsv = function downloadStringAsCsv(fileName, data) {
  downloadFile(new File([data], fileName, {
    type: 'text/csv',
    lastModified: new Date()
  }));
};

exports.downloadStringAsCsv = downloadStringAsCsv;
var _default = {
  downloadFile: downloadFile,
  downloadStringAsCsv: downloadStringAsCsv
};
exports["default"] = _default;
//# sourceMappingURL=clientOperations.js.map