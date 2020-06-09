import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import { dbUpdate } from 'utils/database';
import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  reqSecure(req, commentsAllowedAttributes);
  return lockPromise('comments', () => {
    let user = null;
    return authentication(req)
      .then(userResult => {
        user = userResult;
        return userOwnsResource('comments', req.body.id, user);
      })
      .then(userOwnsResourceResult => {
        // Users should be able to update comments that they own
        if (user && (user.admin || userOwnsResourceResult)) {
          return dbUpdate({ redisKey: 'comments' }, req);
        }
        throw UNAUTHORISED_WRITE;
      });
  });
}
