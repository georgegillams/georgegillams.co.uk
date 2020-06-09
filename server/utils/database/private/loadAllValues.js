import redis from 'utils/redis';
import { PROJECT_NAME } from 'helpers/constants';

const loadValues = redisKey =>
  new Promise((resolve, reject) => {
    redis.lrange(`${PROJECT_NAME}_${redisKey}`, 0, -1, (err, reply) => {
      if (err) {
        reject(err);
      }
      resolve(reply.map(r => JSON.parse(r)));
    });
  });

export default loadValues;
