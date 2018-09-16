import { datumUpdate } from '../datum';
import authentication from '../../utils/authentication';
import { userOwnsResource } from '../../utils/userOwnsResource';
import { UNAUTHORISED_WRITE } from '../../../src/utils/constants';

export default function update(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        userOwnsResource('profiles', req.body.id, user).then(
          userOwnsResourceResult => {
            // Users should be able to update profiles that they own
            if (user && (user.admin || userOwnsResourceResult)) {
              resolve(datumUpdate({ redisKey: 'profiles' }, req));
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
