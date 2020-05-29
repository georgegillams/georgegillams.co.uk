import { datumLoad, datumUpdate } from '../datum';

import authAllowedAttributes from './private/authAllowedAttributes';

import { INVALID_SESSION } from 'helpers/constants';
import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

export default function logout(req) {
  reqSecure(req, authAllowedAttributes);
  return lockPromise(
    'sessions',
    () =>
      new Promise((resolve, reject) => {
        datumLoad({ redisKey: 'sessions' }).then(sessionData => {
          const { existingValue: session } = find(
            sessionData,
            req.cookies.session,
            'sessionKey',
          );
          if (session) {
            session.userId = null;
            session.userAuthenticatedTimestamp = null;
            datumUpdate({ redisKey: 'sessions' }, { body: session }).then(
              () => {
                resolve({ success: 'You are now logged out' });
              },
            );
            setContentLastUpdatedTimestamp();
          } else {
            reject(INVALID_SESSION);
          }
        });
      }),
  );
}
