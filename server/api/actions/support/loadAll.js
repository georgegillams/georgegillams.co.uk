import { datumLoad } from '../datum';

export default function load() {
  return datumLoad({
    redisKey: 'support',
    sortKey: 'lastUpdatedTimestamp',
  }).then(result => ({
    supportMessages: result,
  }));
}
