import { datumLoad } from '../datum';
import authentication from '../../utils/authentication';
import { UNAUTHORISED_READ } from '../../../src/utils/constants';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'payments',
              includeOwnerUname: true,
              includeDeleted: user && user.admin,
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