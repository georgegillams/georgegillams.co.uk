import { datumUpdate } from '../datum';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

export default function update(req) {
  return lockPromise('blogs', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return datumUpdate({ redisKey: 'blogs' }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
