import { datumLoad } from '../api/actions/datum';

import { find } from './find';

const userOwnsResource = (redisKey, resourceId, user) =>
  new Promise(resolve => {
    if (!user) {
      resolve(false);
      // Users should be honorary owners of themselves:
    } else if (redisKey === 'users' && resourceId === user.id) {
      resolve(true);
    } else {
      datumLoad({ redisKey }).then(data => {
        const { existingValue } = find(data, resourceId);
        if (existingValue) {
          resolve(existingValue.authorId === user.id);
        } else {
          resolve(false);
        }
      });
    }
  });

export default userOwnsResource;
export { userOwnsResource };
