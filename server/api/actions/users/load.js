import { datumLoad } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumLoad({ includeDeleted: true, redisKey: 'users' }));
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
