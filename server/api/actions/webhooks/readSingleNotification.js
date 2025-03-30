import safeCompare from 'safe-compare';
import { dbLoad, dbUpdate } from 'server-utils/common/database';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';
import { find } from 'server-utils/common/find';

export default async function readSingle(req, params) {
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

  const notifications = await dbLoad({
    redisKey: 'webhook-notifications',
    sortKey: 'lastUpdatedTimestamp',
  });

  const unreadMatchingNotifications = notifications.filter(n => n.webhookId === matchingWebhook.id && !n.read);

  if (unreadMatchingNotifications.length > 0) {
    const unreadNotification = unreadMatchingNotifications[0];
    dbUpdate(
      { redisKey: 'webhook-notifications' },
      {
        body: {
          ...unreadNotification,
          read: true,
        },
      }
    );
    return unreadNotification;
  }

  return null;
}
