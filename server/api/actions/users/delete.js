import { datumRemove } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import authentication from 'utils/authentication';
import { userOwnsResource } from 'utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        userOwnsResource('users', req.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to delete their own user
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumRemove({ redisKey: 'users' }, req));
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
