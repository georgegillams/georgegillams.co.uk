import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbUpdate } from 'utils/common/database';
import lockPromise from 'utils/common/lock';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'utils/common/errorConstants';
import reqSecure from 'utils/common/reqSecure';

export default function update(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return lockPromise('notifications', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbUpdate({ redisKey: 'notifications' }, req);
      }
      throw UNAUTHORISED_WRITE;
    })
  );
}
