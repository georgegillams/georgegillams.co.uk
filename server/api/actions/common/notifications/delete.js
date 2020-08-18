import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import { dbRemove } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'utils/common/errorConstants';
import reqSecure from 'utils/common/reqSecure';

export default function remove(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbRemove({ redisKey: 'notifications' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
