import { datumLoad } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'notifications',
            includeDeleted: user && user.admin,
          }),
        );
      },
      err => reject(err),
    );
  });
}
