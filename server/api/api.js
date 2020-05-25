import apiStructure from './apiStructureWithActions';

import { mapUrl } from 'utils/url.js';

const getAction = (apiStruct, path) => {
  let result = { action: null, params: [] };
  Object.keys(apiStructure).forEach(key => {
    const apiCapability = apiStructure[key];
    if (apiCapability.path.toLowerCase() === path.toLowerCase()) {
      result = { action: apiCapability.action, params: [] };
    }
  });
  return result;
};

const appFunc = (req, res) => {
  const splittedUrlPath = req.url
    .split('?')[0]
    .split('/')
    .slice(1)
    .join('/');

  const { action, params } = getAction(apiStructure, `/${splittedUrlPath}`);

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
