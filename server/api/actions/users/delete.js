import { datumRemove } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, usersAllowedAttributes);
  let user = null;
  return authentication(req)
    .then(authenticatedUser => {
      user = authenticatedUser;
      return true;
    })
    .then(() => userOwnsResource('users', req.body.id, user))
    .then(userOwnsResourceResult => {
      // Users should be able to delete their own user
      if (user && (user.admin || userOwnsResourceResult)) {
        return datumRemove({ redisKey: 'users' }, req);
      }
      throw UNAUTHORISED_WRITE;
    });
}
