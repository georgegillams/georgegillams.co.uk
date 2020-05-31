import { PROJECT_NAME } from 'helpers/constants';
import redis from 'utils/redis';

/**
 * Overwrites all redis data stores with the data values provided
 * @param {object} data The data object to perform the restoration from
 * @returns {null} none
 */
export default function performRestoration(data) {
  Object.keys(data).forEach(key => {
    redis.del(`${PROJECT_NAME}_${key}`);
    if (data[key].length > 0) {
      const newData = data[key].map(d => JSON.stringify(d));
      redis.rpush([`${PROJECT_NAME}_${key}`, ...newData]);
    }
  });
}
