import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function create(req) {
  return lockPromise('books', async () => {
    let user = await authentication(req);
    if (user && user.admin) {
      return dbCreate({ redisKey: 'books', user }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
