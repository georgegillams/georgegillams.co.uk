import { dbUpdate } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function update(req) {
  return lockPromise('blogs', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbUpdate({ redisKey: 'blogs' }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
