import { dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default async function remove(req) {
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_WRITE;
  }
  return await dbRemove({ redisKey: 'support' }, req);
}
