import { dbRemove } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'utils/common/errorConstants';

export default function remove(req) {
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbRemove({ redisKey: 'payments' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
