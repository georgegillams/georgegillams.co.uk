import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';

export default async function loadAll(req) {
  let user = await authentication(req);
  let blogs = await dbLoad({
    redisKey: 'blogs',
    sortKey: 'publishedTimestamp',
    includeDeleted: user && user.admin,
    filter: b => b.published || (user && user.admin),
  });
  const blogMeta = JSON.parse(JSON.stringify(blogs));
  blogMeta.forEach((_b, i) => {
    delete blogMeta[i].content;
    delete blogMeta[i].bibtex;
  });
  return { blogs: blogMeta };
}
