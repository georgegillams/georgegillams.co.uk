import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

import { datumCreate } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

export default function create(req) {
  const reqSecured = reqSecure(req, commentsAllowedAttributes);
  return lockPromise(
    'comments',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            resolve(datumCreate({ redisKey: 'comments', user }, reqSecured));
          },
          err => reject(err),
        );
      }),
  );
}
