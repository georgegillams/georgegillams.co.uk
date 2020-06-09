import { dbLoad } from 'utils/database';

export default function load() {
  return dbLoad({
    redisKey: 'support',
    sortKey: 'lastUpdatedTimestamp',
  }).then(result => ({
    supportMessages: result,
  }));
}
