import { datumLoad } from '../../datum';

import { REDIS_INFORMATION_STORES } from 'helpers/constants';

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
