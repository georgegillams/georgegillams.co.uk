import authentication from 'server-utils/common/authentication';
import { dbLoad } from 'server-utils/common/database';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

export default async function loadAllNotifications(req, params) {
  const user = await authentication(req);
  if (!user || !user.admin) {
    throw UNAUTHORISED_READ;
  }

  const webhookNotifications = await dbLoad({
    redisKey: 'webhook-notifications',
    sortKey: 'lastUpdatedTimestamp',
  });

  return {
    webhookNotifications: webhookNotifications.filter(w => params.id === '*' || w.webhookId === params.id),
  };
}
