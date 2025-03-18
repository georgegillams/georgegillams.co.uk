import safeCompare from 'safe-compare';
import { dbCreate, dbLoad, dbRemove } from 'server-utils/common/database';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { find } from 'server-utils/common/find';

export default async function receive(req, params) {
  const webhooks = await dbLoad({
    redisKey: 'webhooks',
    sortKey: 'lastUpdatedTimestamp',
  });

  const matchingWebhook = find(webhooks, params.id).existingValue;
  const webhookAccessKey = matchingWebhook?.accessKey;
  const accessKeyUsed = req.headers['access-key'];
  if (!accessKeyUsed || !webhookAccessKey || !safeCompare(webhookAccessKey, accessKeyUsed)) {
    throw UNAUTHORISED_WRITE;
  }

  await dbCreate(
    { redisKey: 'webhook-notifications' },
    {
      body: {
        webhookId: params.id,
        payload: req.body,
      },
    }
  );

  if (matchingWebhook.retentionLimit) {
    const notifications = await dbLoad({
      redisKey: 'webhook-notifications',
      sortKey: 'lastUpdatedTimestamp',
    });

    const notificationsToRemove = notifications
      .filter(n => n.webhookId === params.id)
      .slice(matchingWebhook.retentionLimit);
    notificationsToRemove.forEach(async notification => {
      await dbRemove({ redisKey: 'webhook-notifications' }, { body: notification });
    });
  }

  return true;
}
