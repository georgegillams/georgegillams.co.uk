import { datumLoad, datumCreate } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import {
  INVALID_SESSION,
  EMAIL_TAKEN,
  INVALID_CREDENTIALS,
  USERNAMES_ENABLED,
} from 'helpers/constants';
import { hash, compareHash } from 'utils/hash';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';
import loginUser from 'utils/login';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';

const usernameTakenErrorMessage = {
  ...EMAIL_TAKEN,
  errorMessage: 'Username already taken.',
};

export default function signUp(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return lockPromise(
    'users',
    () =>
      new Promise((resolve, reject) => {
        // Using datum load as we want to avoid invoking authentication when loading users data here
        datumLoad({ redisKey: 'users' }).then(userData => {
          const { existingValue: userWithSameEmail } = find(
            userData,
            reqSecured.body.email.toLowerCase(),
            'email',
          );
          const { existingValue: userWithSameUname } = find(
            userData,
            reqSecured.body.uname,
            'uname',
          );
          if (userWithSameEmail) {
            reject(EMAIL_TAKEN);
          } else if (userWithSameUname && USERNAMES_ENABLED) {
            reject(usernameTakenErrorMessage);
          } else {
            datumCreate({ redisKey: 'users' }, reqSecured).then(createdUser => {
              loginUser(reqSecured, createdUser).then(loginResult => {
                sendEmailVerificationEmail(loginResult);
                resolve(loginResult);
              });
            });
          }
        });
      }),
  );
}