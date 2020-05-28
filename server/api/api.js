/* eslint-disable no-console */
import apiStructure from './apiStructureWithActions';

import {
  CategorisedError,
  InternalServerError,
  NotImplementedError,
} from 'helpers/Errors';
import { mapPathToAction } from 'utils/mapPathToAction.js';

const appFunc = (req, res) => {
  const splitUrlPath = req.url
    .split('?')[0]
    .split('/')
    .slice(1);

  const { action, params } = mapPathToAction(apiStructure, splitUrlPath);
  // TODO - verify that action `method` matches req method.
  // If not, return 405 error

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
          } else if (err instanceof CategorisedError) {
            res.status(err.httpStatus);
            res.json({ error: err.category, errorMessage: err.message });
          } else if (err instanceof Error) {
            // An error that we haven't created. Maybe created by redis or something
            const isError = new InternalServerError(err.message);
            res.status(isError.httpStatus);
            res.json({
              error: isError.category,
              errorMessage: isError.message,
            });
          } else {
            // THIS IS LEGACY, FOR OLD API ACTIONS WHICH REJECT NON-ERROR VALUES
            // Return a valid response even if there has been some server-side error.
            // TODO - update to return an internal server error instead
            res.json(err);
          }
        },
      );
    } else {
      const err = new NotImplementedError(
        'This method has not been implemented',
      );
      res.status(err.httpStatus);
      res.json({ error: err.category, errorMessage: err.message });
    }
  } catch (err) {
    console.error(err);
  }
};

export default appFunc;
