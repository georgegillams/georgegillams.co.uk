import usersAllowedAttributes from './private/usersAllowedAttributes';

import { dbLoad } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_READ } from 'utils/common/errorConstants';
import reqSecure from 'utils/common/reqSecure';

export default function load(req) {
  reqSecure(req, usersAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({ includeDeleted: true, redisKey: 'users' });
      }
      throw UNAUTHORISED_READ;
    })
    .then(users => ({ users }));
}
