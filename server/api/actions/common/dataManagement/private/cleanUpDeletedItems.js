import appConfig from 'helpers/appConfig';
import redis from 'server-utils/common/redis';
import { REDIS_STORES, VOLATILE_DATA_STORES } from './redisStores';

const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

export default async function cleanUpDeletedItems() {
  const deleteCounts = {};

  for (let store of REDIS_STORES) {
    deleteCounts[store] = 0;

    const redisKey = `${appConfig.projectName}_${store}`;
    const data = await new Promise((resolve, reject) => {
      redis.lrange(redisKey, 0, -1, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });

    for (let dataItem of data) {
      const item = JSON.parse(dataItem);
      const itemIsMoreThanThirtyDaysOld =
        !item.lastUpdatedTimestamp || new Date(item.lastUpdatedTimestamp) < THIRTY_DAYS_AGO;
      const itemIsDeleted = item.deleted;

      const shouldDelete = VOLATILE_DATA_STORES.includes(store)
        ? itemIsMoreThanThirtyDaysOld
        : itemIsDeleted && itemIsMoreThanThirtyDaysOld;

      if (shouldDelete) {
        deleteCounts[store] += 1;
        await redis.lrem(redisKey, 1, dataItem);
      }
    }
  }
  return deleteCounts;
}
