import { datumRemove } from '../datum';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';

export default function remove(req) {
  return authentication(req).then(user => {
    if (user && user.admin) {
      return datumRemove({ redisKey: 'blogs' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
