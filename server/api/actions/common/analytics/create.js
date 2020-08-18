import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

import { dbCreate } from 'utils/common/database';
import lockPromise from 'utils/common/lock';
import authentication from 'utils/common/authentication';
import reqSecure from 'utils/common/reqSecure';
import { ipPrefix } from 'utils/common/ipAddress';

export default function create(req) {
  reqSecure(req, analyticsAllowedAttributes);
  return lockPromise('analytics', () =>
    authentication(req).then(user => {
      let ipAddress = req.connection.remoteAddress;
      if (req.headers['x-forwarded-for']) {
        ipAddress = req.headers['x-forwarded-for'];
      }
      if (ipAddress) {
        req.body.ipAddressPrefix = ipPrefix(ipAddress);
      }
      return dbCreate({ redisKey: 'analytics', user }, req);
    })
  );
}
