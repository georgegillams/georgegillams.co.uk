import { datumUpdate } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return lockPromise(
    'notifications',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            if (user && user.admin) {
              resolve(datumUpdate({ redisKey: 'notifications' }, req));
            } else {
              reject(UNAUTHORISED_WRITE);
            }
          },
          err => reject(err),
        );
      }),
  );
}
