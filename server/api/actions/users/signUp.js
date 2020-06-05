import loginUser from '../auth/private/login';
import { datumLoad, datumCreate } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import { USERNAMES_ENABLED } from 'helpers/constants';
import { EMAIL_TAKEN } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';

const usernameTakenErrorMessage = {
  ...EMAIL_TAKEN,
  errorMessage: 'Username already taken.',
};

export default function signUp(req) {
  reqSecure(req, usersAllowedAttributes);
  return lockPromise(
    'users',
    () =>
      new Promise((resolve, reject) => {
        // Using datum load as we want to avoid invoking authentication when loading users data here
        datumLoad({ redisKey: 'users' }).then(userData => {
          const { existingValue: userWithSameEmail } = find(
            userData,
            req.body.email.toLowerCase(),
            'email',
          );
          const { existingValue: userWithSameUname } = find(
            userData,
            req.body.uname,
            'uname',
          );
          if (userWithSameEmail) {
            reject(EMAIL_TAKEN);
          } else if (userWithSameUname && USERNAMES_ENABLED) {
            reject(usernameTakenErrorMessage);
          } else {
            datumCreate({ redisKey: 'users' }, req).then(createdUser => {
              loginUser(createdUser).then(sessionKey => {
                sendEmailVerificationEmail(createdUser);
                resolve({ ...createdUser, session: sessionKey });
              });
            });
          }
        });
      }),
  );
}
