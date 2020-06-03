import { datumLoad } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadAll(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req)
    .then(user =>
      datumLoad({
        redisKey: 'notifications',
        includeDeleted: user && user.admin,
      }),
    )
    .then(notifications => ({ notifications }));
}
