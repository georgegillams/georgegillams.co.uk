import { datumLoad } from '../datum';

import authentication from 'utils/authentication';

export default function loadAll(req) {
  return authentication(req)
    .then(user =>
      datumLoad({
        redisKey: 'blogs',
        sortKey: 'publishedTimestamp',
        includeDeleted: user && user.admin,
        filter: b => b.published || (user && user.admin),
      }),
    )
    .then(blogs => {
      const blogMeta = JSON.parse(JSON.stringify(blogs));
      blogMeta.forEach((_b, i) => {
        delete blogMeta[i].content;
        delete blogMeta[i].bibtex;
      });

      return { blogs: blogMeta };
    });
}
