import { datumLoad, datumUpdate } from '../actions/datum';
import { find } from '../utils/find';
import {
  INVALID_SESSION,
  INVALID_CREDENTIALS,
} from '../../src/utils/constants';
import { hash, compareHash } from '../utils/hash';
import setContentLastUpdatedTimestamp from '../utils/setContentLastUpdatedTimestamp';
import reqSecure from '../utils/reqSecure';
import usersAllowedAttributes from './users/usersAllowedAttributes';

export default function login(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    // Using datum load as we want to avoid invoking authentication when loading users data here
    datumLoad({ redisKey: 'users' }).then(userData => {
      const { existingValue: userProfile } = find(
        userData,
        reqSecured.body.email.toLowerCase(),
        'email',
      );
      if (userProfile) {
        if (!compareHash(reqSecured.body.password, userProfile.hash)) {
          reject(INVALID_CREDENTIALS);
        } else {
          datumLoad({ redisKey: 'sessions' }).then(sessionData => {
            const { existingValue: session } = find(
              sessionData,
              reqSecured.cookies.session,
              'sessionKey',
            );
            if (session) {
              session.userId = userProfile.id;
              session.userAuthenticatedTimestamp = Date.now();
              resolve(datumUpdate({ redisKey: 'sessions' }, { body: session }));
              resolve(userProfile);
              setContentLastUpdatedTimestamp();
            } else {
              reject(INVALID_SESSION);
            }
          });
        }
      } else {
        reject(INVALID_CREDENTIALS);
      }
    });
  });
}
