import { datumCreate } from '../datum';

import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, analyticsAllowedAttributes);
  return lockPromise('analytics', () =>
    authentication(req).then(user => {
      let ipAddress = req.connection.remoteAddress;
      if (req.headers['x-forwarded-for']) {
        ipAddress = req.headers['x-forwarded-for'];
      }
      req.body.ipAddress = ipAddress;
      return datumCreate({ redisKey: 'analytics', user }, req);
    }),
  );
}
