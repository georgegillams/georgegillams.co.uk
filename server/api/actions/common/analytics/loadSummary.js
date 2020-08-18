import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';
import processAnalytics from './private/processAnalytics';

import { dbLoad } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import reqSecure from 'utils/common/reqSecure';
import { UNAUTHORISED_READ } from 'utils/common/errorConstants';

export default function loadSummary(req) {
  reqSecure(req, analyticsAllowedAttributes);
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return dbLoad({
          redisKey: 'analytics',
          includeOwnerUname: true,
          includeDeleted: true,
        });
      }
      throw UNAUTHORISED_READ;
    })
    .then(result => ({ analytics: processAnalytics(result) }));
}
