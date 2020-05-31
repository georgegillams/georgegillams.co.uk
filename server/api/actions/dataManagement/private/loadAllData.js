import { datumLoad } from '../../datum';

import { REDIS_INFORMATION_STORES } from 'helpers/constants';

/**
 * Loads all data from key redis stores and compiles it into a single object
 * @returns {promise} A promise that resolves the data
 */
export default function loadAllData() {
  const data = {};
  const loadPromises = [];
  REDIS_INFORMATION_STORES.forEach(redisKey => {
    loadPromises.push(
      datumLoad({
        redisKey,
        includeDeleted: true,
      }).then(loadedData => {
        data[redisKey] = loadedData;
        return true;
      }),
    );
  });
  return Promise.all(loadPromises).then(() => data);
}
