import { datumRemove } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          resolve(datumRemove({ redisKey: 'notifications' }, req));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
