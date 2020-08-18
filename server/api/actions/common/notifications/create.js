import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbCreate } from 'utils/common/database';
import lockPromise from 'utils/common/lock';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'utils/common/errorConstants';
import reqSecure from 'utils/common/reqSecure';

export default function create(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return lockPromise('notifications', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return dbCreate({ redisKey: 'notifications', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    })
  );
}
