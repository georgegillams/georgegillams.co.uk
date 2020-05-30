import { datumLoad } from '../datum';

import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadAll(req) {
  reqSecure(req, commentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        resolve(
          datumLoad({
            redisKey: 'comments',
            includeOwnerUname: true,
            includeDeleted: user && user.admin,
            filter: req.query.pageId
              ? comment => comment.pageId === req.query.pageId
              : null,
          }),
        );
      },
      err => reject(err),
    );
  });
}
