import { datumLoad, datumUpdate } from '../datum';

import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import { AuthError } from 'helpers/Errors';

export default function verifyemail(req) {
  return lockPromise(
    'emailVerificationCodes',
    () =>
      new Promise((resolve, reject) => {
        const { verificationKey } = req.body;
        datumLoad({ redisKey: 'emailVerificationCodes' }).then(
          emailVerificationData => {
            // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
            const { existingValue: emailVerification } = find(
              emailVerificationData,
              verificationKey,
              'key',
            );
            if (emailVerification) {
              if (Date.now() < emailVerification.expiry) {
                // invalidate magic link (set expiry to 0)
                emailVerification.expiry = 0;
                datumUpdate(
                  { redisKey: 'emailVerificationCodes' },
                  { body: emailVerification },
                );
                datumLoad({ redisKey: 'users' }).then(userData => {
                  const { existingValue: user } = find(
                    userData,
                    emailVerification.userId,
                  );
                  if (user) {
                    user.emailVerified = true;
                    resolve(datumUpdate({ redisKey: 'users' }, { body: user }));
                  } else {
                    reject(new AuthError('Invalid user'));
                  }
                });
              } else {
                reject(new AuthError('Email verification link has expired'));
              }
            } else {
              reject(new AuthError('Invalid verification link'));
            }
          },
        );
      }),
  );
}
