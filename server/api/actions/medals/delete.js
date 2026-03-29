import { dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default async function remove(req) {
  const user = await authentication(req);
  if (user && user.admin) {
    return await dbRemove({ redisKey: 'medals' }, req);
  }
  throw UNAUTHORISED_WRITE;
}

