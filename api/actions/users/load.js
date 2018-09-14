import { datumLoad } from '../datum';
import authentication from '../../utils/authentication';
import { UNAUTHORISED_READ } from '../../../src/utils/constants';

export default function create(req) {
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
