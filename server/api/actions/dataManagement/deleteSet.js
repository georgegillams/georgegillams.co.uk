import { datumLoad, datumUpdate } from '../datum';

import {
  STRING_REGEX,
  ID_REGEX,
  RESOURCE_NOT_FOUND,
  PROJECT_NAME,
  UNAUTHORISED_WRITE,
} from 'helpers/constants';
import redis from 'utils/redis';
import { find } from 'utils/find';
import authentication from 'utils/authentication';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';
import reqSecure from 'utils/reqSecure';

const deleteSetAllowedAttributes = [
  { attribute: 'collectionName', pattern: STRING_REGEX },
];

export default function deleteSet(req) {
  reqSecure(req, deleteSetAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          const { collectionName } = req.body;
          if (!collectionName) {
            reject({
              error: `wrong-input`,
              errorMessage: 'CollectionName must be provided',
            });
          } else {
            resolve(redis.del(`${PROJECT_NAME}_${collectionName}`));
            setContentLastUpdatedTimestamp();
          }
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
