import { dbLoadSingle } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import reqSecure from 'server-utils/common/reqSecure';

export default async function loadSingle(req, params) {
  reqSecure(req, []);
  let user = await authentication(req);
  return await dbLoadSingle({
    redisKey: 'blogs',
    includeDeleted: user && user.admin,
    filter: ar => {
      if (ar.id !== params.id) {
        return false;
      }
      if (!ar.published && (!user || !user.admin)) {
        return false;
      }
      return true;
    },
  });
}
