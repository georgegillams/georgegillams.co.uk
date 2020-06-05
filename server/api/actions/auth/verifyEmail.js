import { datumLoad, datumUpdate } from '../datum';

import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import { AuthError } from 'utils/errors';

export default function verifyEmail(req) {
  return lockPromise('emailVerificationCodes', () => {
    const { verificationKey } = req.body;
    let emailVerification = null;
    return datumLoad({ redisKey: 'emailVerificationCodes' })
      .then(emailVerificationData => {
        // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
        const { existingValue: emailVerificationMatch } = find(
          emailVerificationData,
          verificationKey,
          'key',
        );
        emailVerification = emailVerificationMatch;
        if (emailVerification) {
          if (Date.now() < new Date(emailVerification.expiry).getTime()) {
            // invalidate magic link (set expiry to 0)
            emailVerification.expiry = 0;
            return datumUpdate(
              { redisKey: 'emailVerificationCodes' },
              { body: emailVerification },
            );
          }
          throw new AuthError('Email verification link has expired');
        } else {
          throw new AuthError('Invalid verification link');
        }
      })
      .then(() => datumLoad({ redisKey: 'users' }))
      .then(userData => {
        const { existingValue: user } = find(
          userData,
          emailVerification.userId,
        );
        if (user) {
          user.emailVerified = true;
          return datumUpdate({ redisKey: 'users' }, { body: user });
        }
        throw new AuthError('Invalid user');
      })
      .then(() => ({ success: 'Email verified' }));
  });
}
