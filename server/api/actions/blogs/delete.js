import { dbRemove } from 'utils/database';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'utils/errorConstants';

export default function remove(req) {
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbRemove({ redisKey: 'blogs' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
