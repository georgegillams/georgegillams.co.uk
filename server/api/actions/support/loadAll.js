import { dbLoad } from 'server-utils/common/database';

export default function load() {
  return dbLoad({
    redisKey: 'support',
    sortKey: 'lastUpdatedTimestamp',
  }).then(result => ({
    supportMessages: result,
  }));
}
