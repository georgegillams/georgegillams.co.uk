import loginUser from '../auth/private/login';
import { datumCreate, datumLoad } from '../datum';
import sendEmailVerificationEmail from '../auth/private/sendEmailVerificationEmail';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, usersAllowedAttributes);
  return lockPromise(
    'users',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            datumLoad({ redisKey: 'users' }).then(userData => {
              // Only admins can create admins!
              if ((user && user.admin) || !req.body.admin) {
                // If a user already has the username, we cannot allow a new one to be created
                const { existingValue: userWithSameUname } = find(
                  userData,
                  req.body.uname,
                  'uname',
                );
                const { existingValue: userWithSameEmail } = find(
                  userData,
                  emailFingerprint(req.body.email),
                  'emailFingerprint',
                );
                if (userWithSameUname || userWithSameEmail) {
                  reject({
                    error: 'A user with that username or email already exists',
                    reason: 'A user with that username already exists',
                  });
                } else {
                  if (req.body.password) {
                    req.body.hash = hash(req.body.password);
                    req.body.password = null;
                  }
                  req.body.emailFingerprint = emailFingerprint(req.body.email);
                  req.body.email = req.body.email.toLowerCase();
                  req.body.emailVerified = false;
                  datumCreate({ redisKey: 'users', user }, req).then(
                    newUser => {
                      sendEmailVerificationEmail(newUser).then(() => {
                        loginUser(newUser);
                        resolve({ message: 'User created' });
                      });
                    },
                  );
                }
              } else {
                reject(UNAUTHORISED_WRITE);
              }
            });
          },
          err => reject(err),
        );
      }),
  );
}
