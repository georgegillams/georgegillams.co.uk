import { datumCreate } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return lockPromise('notifications', () =>
    authentication(req).then(user => {
      if (user && user.admin) {
        return datumCreate({ redisKey: 'notifications', user }, req);
      }
      throw UNAUTHORISED_WRITE;
    }),
  );
}
