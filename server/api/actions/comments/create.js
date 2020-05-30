import { datumCreate } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  reqSecure(req, commentsAllowedAttributes);
  return lockPromise('comments', () =>
    authentication(req).then(user => {
      if (user && user.uname) {
        req.body.displayName = user.uname;
      }
      return datumCreate({ redisKey: 'comments', user }, req);
    }),
  );
}
