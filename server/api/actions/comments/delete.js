import { datumRemove } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        userOwnsResource('comments', req.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete comments that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumRemove({ redisKey: 'comments' }, req));
            } else {
              reject(UNAUTHORISED_WRITE);
            }
          },
        );
      },
      err => reject(err),
    );
  });
}
