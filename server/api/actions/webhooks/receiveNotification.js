import safeCompare from 'safe-compare';
import { dbCreate, dbLoad } from 'server-utils/common/database';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { find } from 'server-utils/common/find';

export default async function receive(req, params) {
  const webhooks = await dbLoad({
    redisKey: 'webhooks',
    sortKey: 'lastUpdatedTimestamp',
  });

  const matchingWebhook = find(webhooks, params.id).existingValue;
  const webhookAccessKey = matchingWebhook.accessKey;
  const accessKeyUsed = req.headers['access-key'];
  if (!accessKeyUsed || !webhookAccessKey || !safeCompare(webhookAccessKey, accessKeyUsed)) {
    throw UNAUTHORISED_WRITE;
  }

  dbCreate(
    { redisKey: 'webhook-notifications' },
    {
      body: {
        webhookId: params.id,
        payload: req.body,
      },
    }
  );

  return true;
}
