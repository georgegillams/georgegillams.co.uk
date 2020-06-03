import loginUser from '../auth/private/login';
import { datumLoad, datumUpdate } from '../datum';

import magicLinksAllowedAttributes from './private/magicLinksAllowedAttributes';

import { InvalidInputError } from 'helpers/Errors';
import lockPromise from 'utils/lock';
import { find } from 'utils/find';
import reqSecure from 'utils/reqSecure';

export default function loginMagicLink(req) {
  reqSecure(req, magicLinksAllowedAttributes);
  const { magicLinkKey } = req.body;
  return lockPromise('magiclinks', () => {
    let magicLinkData = null;
    let matchingUser = null;
    return datumLoad({ redisKey: 'magiclinks' })
      .then(mld => {
        magicLinkData = mld;
        return true;
      })
      .then(() => datumLoad({ redisKey: 'users' }))
      .then(userData => {
        // `find` uses `safeCompare` so it is safe to use for finding the entry that matches the key
        const { existingValue: magicLink } = find(
          magicLinkData,
          magicLinkKey,
          'key',
        );
        if (!magicLink) {
          throw new InvalidInputError('Invalid magic link');
        }
        const { existingValue: user } = find(userData, magicLink.userId);
        matchingUser = user;
        if (!matchingUser) {
          throw new InvalidInputError(
            'The user who requested this magic link could not be found',
          );
        }
        if (Date.now() < new Date(magicLink.expiry).getTime()) {
          // invalidate magic link (set expiry to 0)
          magicLink.expiry = 0;
          return datumUpdate({ redisKey: 'magiclinks' }, { body: magicLink });
        }
        throw new InvalidInputError('Magic link has expired');
      })
      .then(() => loginUser(matchingUser))
      .then(sessionKey => ({
        ...matchingUser,
        session: sessionKey,
      }));
  });
}
