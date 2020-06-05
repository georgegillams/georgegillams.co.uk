import { datumRemove } from '../datum';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumRemove({ redisKey: 'sessions' }, req));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
