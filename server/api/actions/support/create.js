import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function create(req) {
  return lockPromise('support', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbCreate({ redisKey: 'support', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    })
  );
}
