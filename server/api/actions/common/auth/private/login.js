import { dbCreate } from 'utils/common/database';
import lockPromise from 'utils/common/lock';
import { generateKey } from 'utils/common/hash';
import setContentLastUpdatedTimestamp from 'utils/common/setContentLastUpdatedTimestamp';

/**
 * Creates a new session and assigns the user to it
 * @param {object} userProfile The user to assign to the new session
 * @returns {promise} A promise that resolves the new session's sessionKey
 */

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
      .then(createdSession => dbCreate({ redisKey: 'sessions' }, { body: createdSession }))
      .then(() => setContentLastUpdatedTimestamp())
      .then(() => session.sessionKey);
  });
}
