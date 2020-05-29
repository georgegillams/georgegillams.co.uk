import { datumCreate } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, commentsAllowedAttributes);
  return lockPromise(
    'comments',
    () =>
      new Promise((resolve, reject) => {
        authentication(req).then(
          user => {
            resolve(datumCreate({ redisKey: 'comments', user }, req));
          },
          err => reject(err),
        );
      }),
  );
}
