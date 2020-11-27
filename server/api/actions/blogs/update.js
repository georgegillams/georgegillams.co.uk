import { dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

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
