import { dbLoad } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';

export default async function loadAll(req) {
  let user = await authentication(req);
  if (!user || !user.admin) {
    throw new Error('Unauthorized access');
  }

  let images = await dbLoad({
    redisKey: 'images',
    sortKey: 'timestamp',
    includeDeleted: false,
  });

  // Sort by timestamp descending (newest first)
  images.sort((a, b) => b.timestamp - a.timestamp);

  return { images };
}
