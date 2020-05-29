import { datumLoadSingle } from '../datum';

import { UNAUTHORISED_READ } from 'helpers/constants';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req) {
  reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoadSingle({
              redisKey: 'users',
              filter: ar => ar.id === req.query.id,
            }),
          );
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
