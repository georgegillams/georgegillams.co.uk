import { datumCreate } from '../../datum';

import lockPromise from 'utils/lock';
import { generateKey } from 'utils/hash';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function login(userProfile) {
  return lockPromise('sessions', () => {
    let session = null;
    return Promise.resolve()
      .then(() => {
        session = {};
        session.sessionKey = generateKey();
        session.userId = userProfile.id;
        session.userAuthenticatedTimestamp = Date.now();
        return session;
      })
      .then(createdSession =>
        datumCreate({ redisKey: 'sessions' }, { body: createdSession }),
      )
      .then(() => setContentLastUpdatedTimestamp())
      .then(() => session.sessionKey);
  });
}
