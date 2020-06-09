import { dbCreate } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function create(req) {
  return lockPromise('blogs', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbCreate({ redisKey: 'blogs', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
