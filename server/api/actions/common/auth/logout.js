import authAllowedAttributes from './private/authAllowedAttributes';
import { SESSION_COOKIE_KEY } from 'helpers/storageConstants';

import { dbLoad, dbUpdate } from 'utils/common/database';
import { INVALID_SESSION } from 'utils/common/errorConstants';
import lockPromise from 'utils/common/lock';
import { find } from 'utils/common/find';
import setContentLastUpdatedTimestamp from 'utils/common/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/common/reqSecure';

export default function logout(req) {
  reqSecure(req, authAllowedAttributes);
  return lockPromise('sessions', () =>
    dbLoad({ redisKey: 'sessions' })
      .then(sessionData => {
        const { existingValue: session } = find(sessionData, req.cookies[SESSION_COOKIE_KEY], 'sessionKey');
        if (session) {
          session.userId = null;
          session.userAuthenticatedTimestamp = null;
          return dbUpdate({ redisKey: 'sessions' }, { body: session });
        }
        throw INVALID_SESSION;
      })
      .then(() => setContentLastUpdatedTimestamp())
      .then(() => ({ success: 'You are now logged out' }))
  );
}
