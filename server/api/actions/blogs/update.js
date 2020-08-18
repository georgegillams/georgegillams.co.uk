import { dbUpdate } from 'utils/common/database';
import lockPromise from 'utils/common/lock';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'utils/common/errorConstants';

export default function update(req) {
  return lockPromise('blogs', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbUpdate({ redisKey: 'blogs' }, req);
      }
      throw UNAUTHORISED_WRITE;
    })
  );
}
