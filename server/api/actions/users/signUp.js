import loginUser from '../auth/private/login';
import { datumLoad, datumCreate } from '../datum';
import sendEmailVerificationEmail from '../auth/private/sendEmailVerificationEmail';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import lockPromise from 'utils/lock';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { USERNAMES_ENABLED } from 'helpers/constants';
import { EMAIL_TAKEN } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

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
            if (req.body.password) {
              req.body.hash = hash(req.body.password);
              req.body.password = null;
            }
            req.body.emailFingerprint = emailFingerprint(req.body.email);
            req.body.email = req.body.email.toLowerCase();
            req.body.emailVerified = false;
            datumCreate({ redisKey: 'users' }, req).then(createdUser => {
              loginUser(createdUser).then(sessionKey => {
                sendEmailVerificationEmail(createdUser).then(() => {
                  resolve({ ...createdUser, session: sessionKey });
                });
              });
            });
          }
        });
      }),
  );
}
