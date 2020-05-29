import crypto from 'crypto';

import { datumCreate } from '../datum';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { generateKey } from 'utils/hash';

export default function create(req) {
  reqSecure(req, []);
  return lockPromise(
    'sessions',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            req.body.sessionKey = generateKey();
            req.body.lastActive = Date.now();
            resolve(datumCreate({ redisKey: 'sessions', user }, req));
          },
          err => reject(err),
        );
      }),
  );
}
