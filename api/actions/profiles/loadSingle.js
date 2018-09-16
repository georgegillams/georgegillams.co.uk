import { datumLoadSingle } from '../datum';
import authentication from '../../utils/authentication';

export default function loadSingle(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoadSingle({
            redisKey: 'profiles',
            includeDeleted: user && user.admin,
            filter: ar => ar.id === req.query.id,
          }),
        );
      },
      err => reject(err),
    );
  });
}
