import { datumLoad } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  reqSecure(req, usersAllowedAttributes);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return datumLoad({ includeDeleted: true, redisKey: 'users' });
    }
    throw UNAUTHORISED_READ;
  });
}
