import { datumLoadSingle } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadSingle(req) {
  reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoadSingle({
            redisKey: 'comments',
            includeDeleted: user && user.admin,
            filter: ar => ar.id === req.query.id,
          }),
        );
      },
      err => reject(err),
    );
  });
}
