import { datumLoad } from '../datum';

import {
  STRING_REGEX,
  ID_REGEX,
  RESOURCE_NOT_FOUND,
  PROJECT_NAME,
  UNAUTHORISED_WRITE,
} from 'helpers/constants';
import { AuthError } from 'utils/errors';
import redis from 'utils/redis';
import { find } from 'utils/find';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

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
      return datumLoad({
        redisKey: collectionToDeleteFrom,
        includeDeleted: true,
      });
    })
    .then(collectionData => {
      const { existingValue, existingValueIndex } = find(
        collectionData,
        idToDelete,
      );
      if (!existingValue) {
        throw RESOURCE_NOT_FOUND;
      }
      if (!existingValue.deleted) {
        throw new AuthError(
          'Only deleted entities can be permanently removed.',
        );
      }
      console.log(
        `Permanently removing ${existingValue.id} at index ${existingValueIndex}`,
      );
      redis.lrem(
        `${PROJECT_NAME}_${collectionToDeleteFrom}`,
        1,
        JSON.stringify(existingValue),
      );
      return true;
    })
    .then(() => setContentLastUpdatedTimestamp())
    .then(() => true);
}
