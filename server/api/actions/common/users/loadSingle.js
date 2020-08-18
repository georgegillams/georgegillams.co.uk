import { dbLoadSingle } from 'utils/common/database';
import { UNAUTHORISED_READ } from 'utils/common/errorConstants';
import authentication from 'utils/common/authentication';
import reqSecure from 'utils/common/reqSecure';

export default function loadSingle(req) {
  reqSecure(req, []);
  return authentication(req).then(user => {
    if (user && user.admin) {
      return dbLoadSingle({
        redisKey: 'users',
        filter: ar => ar.id === req.query.id,
      });
    }
    throw UNAUTHORISED_READ;
  });
}
