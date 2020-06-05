import { datumRemove } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, commentsAllowedAttributes);
  let user = null;
  return authentication(req)
    .then(authenticatedUser => {
      user = authenticatedUser;
      return true;
    })
    .then(() => userOwnsResource('comments', req.body.id, user))
    .then(userOwnsResourceResult => {
      // Users should be able to delete comments that they own
      if (user && (user.admin || userOwnsResourceResult)) {
        return datumRemove({ redisKey: 'comments' }, req);
      }
      throw UNAUTHORISED_WRITE;
    });
}
