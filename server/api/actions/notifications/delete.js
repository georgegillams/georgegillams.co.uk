import { datumRemove } from '../datum';

import notificationsAllowedAttributes from './private/notificationsAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function remove(req) {
  reqSecure(req, notificationsAllowedAttributes);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return datumRemove({ redisKey: 'notifications' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
