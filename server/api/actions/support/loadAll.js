import { dbLoad } from 'server-utils/common/database';

export default async function load() {
  const supportMessages = await dbLoad({
    redisKey: 'support',
    sortKey: 'lastUpdatedTimestamp',
  });

  return { supportMessages };
}
