import { datumLoadSingle } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req, params) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req).then(user =>
    datumLoadSingle({
      redisKey: 'notifications',
      includeDeleted: user && user.admin,
      filter: ar => ar.id === params.id,
    }),
  );
}
