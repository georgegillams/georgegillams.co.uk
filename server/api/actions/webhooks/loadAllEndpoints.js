import authentication from 'server-utils/common/authentication';
import { dbLoad } from 'server-utils/common/database';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import { getWebhookEndpointReadUrl, getWebhookEndpointReceiveUrl } from './utils';

export default async function loadAllEndpoints(req) {
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }

  const webhookEndpoints = await dbLoad({
    redisKey: 'webhooks',
    sortKey: 'lastUpdatedTimestamp',
    includeDeleted: true,
  });

  const annotatedWebhookEndpoints = webhookEndpoints.map(w => ({
    ...w,
    receiveUrl: getWebhookEndpointReceiveUrl(w),
    readUrl: getWebhookEndpointReadUrl(w),
  }));

  for (const webhookEndpoint of annotatedWebhookEndpoints) {
    const webhookNotifications = await dbLoad({
      redisKey: 'webhook-notifications',
      sortKey: 'lastUpdatedTimestamp',
      includeDeleted: true,
      filter: w => w.webhookId === webhookEndpoint.id,
    });

    webhookEndpoint.notificationCount = webhookNotifications.filter(w => !w.deleted).length;
    webhookEndpoint.deletedNotificationCount = webhookNotifications.filter(w => !!w.deleted).length;
  }

  return { webhookEndpoints: annotatedWebhookEndpoints };
}
