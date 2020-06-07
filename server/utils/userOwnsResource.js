import { find } from './find';

import { datumLoad } from 'api/actions/datum';

const determineIfUserOwnsResource = (redisKey, resourceId, user) =>
  datumLoad({ redisKey }).then(data => {
    const { existingValue } = find(data, resourceId);
    if (existingValue) {
      return existingValue.authorId === user.id;
    }
    return false;
  });

const userOwnsResource = (redisKey, resourceId, user) =>
  Promise.resolve().then(() => {
    if (!user) {
      return false;
    }
    // Users should be honorary owners of themselves:
    if (redisKey === 'users' && resourceId === user.id) {
      return true;
    }
    return determineIfUserOwnsResource(redisKey, resourceId, user);
  });

export default userOwnsResource;
export { userOwnsResource };
