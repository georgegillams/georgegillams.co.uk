import { dbLoad, dbRemove } from 'server-utils/common/database';
import authentication from 'server-utils/common/authentication';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default async function removeEndpoint(req) {
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_WRITE;
  }

  await dbRemove({ redisKey: 'webhooks' }, req);

  const webhookNotifications = await dbLoad({
    redisKey: 'webhook-notifications',
    sortKey: 'lastUpdatedTimestamp',
  });

  const notificationsToRemove = webhookNotifications.filter(w => w.webhookId === req.body.id);
  notificationsToRemove.forEach(async notification => {
    await dbRemove({ redisKey: 'webhook-notifications' }, { body: notification });
  });

  return true;
}
