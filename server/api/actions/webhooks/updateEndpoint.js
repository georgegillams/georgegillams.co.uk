import { dbUpdate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function updateEndpoint(req) {
  return lockPromise('webhooks', async () => {
    let user = await authentication(req);
    if (user && user.admin) {
      return await dbUpdate({ redisKey: 'webhooks' }, req);
    }
    throw UNAUTHORISED_WRITE;
  });
}
