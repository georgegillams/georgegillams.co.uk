import { dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function update(req) {
  return lockPromise('blogs', async () => {
    let user = await authentication(req);
    if (user && user.admin) {
      return await dbUpdate({ redisKey: 'blogs' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
