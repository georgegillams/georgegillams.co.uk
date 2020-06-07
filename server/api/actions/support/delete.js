import { datumRemove } from '../datum';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function remove(req) {
  return authentication(req).then(user => {
    if (user && user.admin) {
      return datumRemove({ redisKey: 'support' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
