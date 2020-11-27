import { dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function remove(req) {
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbRemove({ redisKey: 'payments' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
