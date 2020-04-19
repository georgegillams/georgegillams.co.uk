"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWidgets = getWidgets;
exports["default"] = load;
var initialWidgets = [{
  id: 1,
  color: 'Red',
  sprocketCount: 7,
  owner: 'John'
}, {
  id: 2,
  color: 'Taupe',
  sprocketCount: 1,
  owner: 'George'
}, {
  id: 3,
  color: 'Green',
  sprocketCount: 8,
  owner: 'Ringo'
}, {
  id: 4,
  color: 'Blue',
  sprocketCount: 2,
  owner: 'Paul'
}];

function getWidgets(req) {
  var widgets = req.session.widgets;

  if (!widgets) {
    widgets = initialWidgets;
    req.session.widgets = widgets;
  }

  return widgets;
}

function load(req) {
  return new Promise(function (resolve, reject) {
    // make async call to database
    setTimeout(function () {
      if (Math.random() < 0.33) {
        reject('Widget load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getWidgets(req));
      }
    }, 1000); // simulate async load
  });
}
//# sourceMappingURL=load.js.map