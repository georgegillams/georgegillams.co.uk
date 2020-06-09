import loadAllValues from './private/loadAllValues';

import redis from 'utils/redis';
import { find } from 'utils/find';
import { PROJECT_NAME } from 'helpers/constants';

const idForNewEntity = (redisKey, requestedId) =>
  loadAllValues(redisKey).then(existingData => {
    if (requestedId) {
      const { existingValue: entityWithSameId } = find(
        existingData,
        requestedId,
      );
      if (!entityWithSameId) {
        return requestedId;
      }
    }
    return Math.random()
      .toString(36)
      .substring(7);
  });

export default function dbCreate(settings, req) {
  const newValue = req.body;
  const { requestedId } = newValue;

  return Promise.resolve()
    .then(() => idForNewEntity(settings.redisKey, requestedId))
    .then(newId => {
      newValue.id = newId;
      return true;
    })
    .then(() => {
      newValue.timestamp = Date.now();
      newValue.lastUpdatedTimestamp = newValue.timestamp;
      newValue.authorId = settings.user ? settings.user.id : undefined;
      // Write to redis:
      redis.rpush([
        `${PROJECT_NAME}_${settings.redisKey}`,
        JSON.stringify(newValue),
      ]);
      return newValue;
    });
}
