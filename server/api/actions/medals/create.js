import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { dbCreate } from 'server-utils/common/database';

export default function create(req) {
  return lockPromise('medals', async () => {
    const user = await authentication(req);
    if (user && user.admin) {
      return dbCreate({ redisKey: 'medals', user }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}

