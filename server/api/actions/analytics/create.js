import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';

import { datumCreate } from '../datum';

import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

export default function create(req) {
  const reqSecured = reqSecure(req, analyticsAllowedAttributes);
  return lockPromise(
    'analytics',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured)
          .then(user => {
            let ipAddress = req.connection.remoteAddress;
            if (req.headers['x-forwarded-for']) {
              ipAddress = req.headers['x-forwarded-for'];
            }
            datumCreate(
              { redisKey: 'analytics', user },
              { ...reqSecured, ipAddress },
            )
              .then(r => resolve({}))
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      }),
  );
}
