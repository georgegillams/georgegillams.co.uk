import { datumLoad } from '../datum';

import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';

export default function load(req) {
  reqSecure(req, analyticsAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return datumLoad({
          redisKey: 'analytics',
          includeOwnerUname: true,
          includeDeleted: true,
        });
      }
      throw UNAUTHORISED_READ;
    })
    .then(result => ({ analytics: result }));
}