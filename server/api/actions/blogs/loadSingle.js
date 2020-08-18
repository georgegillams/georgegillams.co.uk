import { dbLoadSingle } from 'utils/common/database';
import authentication from 'utils/common/authentication';
import reqSecure from 'utils/common/reqSecure';

export default function loadSingle(req, params) {
  reqSecure(req, []);
  return authentication(req).then(user =>
    dbLoadSingle({
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
    })
  );
}
