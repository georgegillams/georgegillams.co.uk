import { datumLoad } from '../datum';

import authentication from 'utils/authentication';

export default function load(req) {
  return authentication(req)
    .then(user =>
      datumLoad({
        redisKey: 'blogs',
        sortKey: 'publishedTimestamp',
        includeDeleted: user && user.admin,
        filter: b => b.published || (user && user.admin),
      }),
    )
    .then(blogs => ({ blogs }));
}
