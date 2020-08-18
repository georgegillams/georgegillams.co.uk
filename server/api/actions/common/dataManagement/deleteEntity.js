import { dbLoad } from 'utils/common/database';
import { STRING_REGEX, ID_REGEX } from 'helpers/regexConstants';
import appConfig from 'helpers/appConfig';
import { RESOURCE_NOT_FOUND, UNAUTHORISED_WRITE } from 'utils/common/errorConstants';
import { AuthError } from 'utils/common/errors';
import redis from 'utils/common/redis';
import { find } from 'utils/common/find';
import authentication from 'utils/common/authentication';
import setContentLastUpdatedTimestamp from 'utils/common/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/common/reqSecure';
import logger from 'utils/common/logger';

const deleteEntityAllowedAttributes = [
  { attribute: 'collectionName', pattern: STRING_REGEX },
  { attribute: 'id', pattern: ID_REGEX },
];

export default function deleteEntity(req) {
  reqSecure(req, deleteEntityAllowedAttributes);
  let collectionToDeleteFrom = null;
  let idToDelete = null;
  return authentication(req)
    .then(user => {
      if (!user || !user.admin) {
        throw UNAUTHORISED_WRITE;
      }
      const { collectionName, id } = req.body;
      collectionToDeleteFrom = collectionName;
      idToDelete = id;
      return dbLoad({
        redisKey: collectionToDeleteFrom,
        includeDeleted: true,
      });
    })
    .then(collectionData => {
      const { existingValue, existingValueIndex } = find(collectionData, idToDelete);
      if (!existingValue) {
        throw RESOURCE_NOT_FOUND;
      }
      if (!existingValue.deleted) {
        throw new AuthError('Only deleted entities can be permanently removed.');
      }
      logger.log(`Permanently removing ${existingValue.id} at index ${existingValueIndex}`);
      redis.lrem(`${appConfig.projectName}_${collectionToDeleteFrom}`, 1, JSON.stringify(existingValue));
      return true;
    })
    .then(() => setContentLastUpdatedTimestamp())
    .then(() => true);
}
