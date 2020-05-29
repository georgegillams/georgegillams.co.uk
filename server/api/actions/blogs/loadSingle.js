import { datumLoadSingle } from '../datum';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req, params) {
  reqSecure(req, []);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoadSingle({
            redisKey: 'blogs',
            includeDeleted: user && user.admin,
            filter: ar => {
              if (ar.id !== params.id) {
                return false;
              }
              if (!ar.published && (!user || !user.admin)) {
                return false;
              }
              return true;
            },
          }),
        );
      },
      err => reject(err),
    );
  });
}
