import { datumCreate } from '../datum';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function create(req) {
  return lockPromise('support', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return datumCreate({ redisKey: 'support', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
