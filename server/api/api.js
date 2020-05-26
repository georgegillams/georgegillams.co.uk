/* eslint-disable no-console */
import apiStructure from './apiStructureWithActions';

import { mapPathToAction } from 'utils/mapPathToAction.js';

const appFunc = (req, res) => {
  const splitUrlPath = req.url
    .split('?')[0]
    .split('/')
    .slice(1);

  const { action, params } = mapPathToAction(apiStructure, splitUrlPath);

  try {
    if (action) {
      action(req, params).then(
        result => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        },
        err => {
          if (err && err.redirect) {
            res.redirect(err.redirect);
          } else {
            // Return a valid response even if there has been some server-side error.
            // This gives us greater control over how we handle errors.
            // Due to a limitation in our `react-saga` exception handling mechanism.
            res.json(err);
          }
        },
      );
    } else {
      res.status(404).end('NOT FOUND');
    }
  } catch (err) {
    console.error(err);
  }
};

export default appFunc;
