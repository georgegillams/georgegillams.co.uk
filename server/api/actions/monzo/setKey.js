import { dbCreate } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function setKey(req) {
  return lockPromise('monzoapikeys', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbCreate({ redisKey: 'monzoapikeys', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
