import { datumLoadSingle } from '../datum';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadLatest(req) {
  const reqSecured = reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(
          datumLoadSingle({
            redisKey: 'blogs',
            includeDeleted: user && user.admin,
            filter: ar => ar.id === reqSecured.query.id,
          }),
        );
      },
      err => reject(err),
    );
  });
}
