import { dbCreate } from 'utils/common/database';
import lockPromise from 'utils/common/lock';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'utils/common/errorConstants';

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
