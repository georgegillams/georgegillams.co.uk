import crypto from 'crypto';
import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function createEndpoint(req) {
  return lockPromise('webhooks', async () => {
    const user = await authentication(req);
    if (!user || !user.admin) {
      throw UNAUTHORISED_WRITE;
    }

    const body = { ...req.body, accessKey: crypto.randomBytes(20).toString('hex') };

    return await dbCreate({ redisKey: 'webhooks', user }, { ...req, body });
  });
}
