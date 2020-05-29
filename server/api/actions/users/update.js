import { datumLoad, datumUpdate } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { hash } from 'utils/hash';
import { find, emailFingerprint } from 'utils/find';
import { userOwnsResource } from 'utils/userOwnsResource';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';
import { UNAUTHORISED_WRITE, RESOURCE_NOT_FOUND } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  reqSecure(req, usersAllowedAttributes);
  return lockPromise(
    'users',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            userOwnsResource('users', req.body.id, user).then(
              userOwnsResourceResult => {
                datumLoad({ redisKey: 'users' }).then(userData => {
                  const { existingValue: userBeingUpdated } = find(
                    userData,
                    req.body.id,
                  );
                  // Users should be able to update their own user
                  if (!userBeingUpdated) {
                    reject(RESOURCE_NOT_FOUND);
                    return;
                  }

                  if (!user) {
                    reject(UNAUTHORISED_WRITE);
                    return;
                  }

                  // The user editing must either be the user themselves, or an admin
                  if (!user.admin && !userOwnsResourceResult) {
                    reject(UNAUTHORISED_WRITE);
                    return;
                  }

                  // Only admins can upgrade someone to being admins!
                  if (req.body.admin && (!user || !user.admin)) {
                    reject(UNAUTHORISED_WRITE);
                    return;
                  }

                  const otherUsersWithSameUname = userData.filter(
                    u => u.uname === req.body.uname && u.id !== req.body.id,
                  );

                  // If another user already with the same username, we cannot allow it to be updated, as usernames must be unique
                  if (otherUsersWithSameUname.length > 0) {
                    reject({
                      error: 'user already exists',
                      errorMessage: 'A user with that username already exists',
                    });
                    return;
                  }

                  if (req.body.password) {
                    req.body.hash = hash(req.body.password);
                    req.body.password = null;
                  } else {
                    req.body.hash = userBeingUpdated.hash;
                  }

                  // IF USER EMAIL HAS CHANGED, IT NEED RE-VERIFYING
                  const emailVerificationRequired =
                    req.body.email !== userBeingUpdated.email;
                  if (emailVerificationRequired) {
                    req.body.email = req.body.email.toLowerCase();
                    req.body.emailVerified = false;
                    req.body.emailFingerprint = emailFingerprint(
                      req.body.email,
                    );
                  } else {
                    req.body.emailFingerprint =
                      userBeingUpdated.emailFingerprint;
                    req.body.emailVerified = userBeingUpdated.emailVerified;
                  }

                  datumUpdate({ redisKey: 'users' }, req).then(updatedUser => {
                    if (emailVerificationRequired) {
                      sendEmailVerificationEmail(updatedUser);
                    }
                    resolve(updatedUser);
                  });
                });
              },
            );
          },
          err => reject(err),
        );
      }),
  );
}
