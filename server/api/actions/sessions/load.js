import { datumLoad } from '../datum';

import { UNAUTHORISED_READ } from 'utils/errorConstants';
import authentication from 'utils/authentication';

export default function load(req) {
  return authentication(req).then(user => {
    if (user && user.admin) {
      return datumLoad({ redisKey: 'sessions' });
    }
    throw UNAUTHORISED_READ;
  });
}
