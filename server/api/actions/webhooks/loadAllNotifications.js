import authentication from 'server-utils/common/authentication';
import { dbLoad } from 'server-utils/common/database';
import { RESOURCE_NOT_FOUND, UNAUTHORISED_READ } from 'server-utils/common/errorConstants';
import { find } from 'server-utils/common/find';

export default async function loadAllNotifications(req, params) {
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }

  let matchingWebhook;

  if (params.id !== '*') {
    const webhooks = await dbLoad({
      redisKey: 'webhooks',
      sortKey: 'lastUpdatedTimestamp',
    });

    matchingWebhook = find(webhooks, params.id).existingValue;

    if (!matchingWebhook) {
      throw RESOURCE_NOT_FOUND;
    }
  }

  const webhookNotifications = await dbLoad({
    redisKey: 'webhook-notifications',
    sortKey: 'lastUpdatedTimestamp',
  });

  const matchingWebhookNotifications = webhookNotifications.filter(w => params.id === '*' || w.webhookId === params.id);

  const sortedMatchingWebhookNotifications = matchingWebhook?.displayInReverse
    ? matchingWebhookNotifications.reverse()
    : matchingWebhookNotifications;

  return {
    webhookNotifications: sortedMatchingWebhookNotifications,
  };
}
