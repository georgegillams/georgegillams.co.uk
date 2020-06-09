import commentsAllowedAttributes from './private/commentsAllowedAttributes';

import { dbLoad } from 'utils/database';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function loadAll(req, params = {}) {
  reqSecure(req, commentsAllowedAttributes);
  return authentication(req)
    .then(user =>
      dbLoad({
        redisKey: 'comments',
        includeOwnerUname: true,
        includeDeleted: user && user.admin,
        filter: params.pageId
          ? comment => comment.pageId === params.pageId
          : null,
      }),
    )
    .then(comments => ({ comments }));
}
