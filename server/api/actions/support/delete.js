import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

import { datumRemove } from '../datum';

export default function remove(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumRemove({ redisKey: 'support' }, req));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}