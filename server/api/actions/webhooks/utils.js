import appConfig from 'helpers/appConfig';
import apiStructure from 'helpers/common/apiStructure';

export const getWebhookEndpointReceiveUrl = webhook => {
  return `${appConfig.apiEndpoint}${apiStructure.createWebhookNotification.path.replace(':id', webhook.id)}`;
};
